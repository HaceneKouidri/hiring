import { Fleet } from "../Domain/Fleet";
import { FleetRepository } from "../Domain/FleetRepository";
import { Vehicle } from "../Domain/Vehicle";
import { Location } from "../Domain/Location";
import { pool } from "./database";
import { v4 as uuidv4 } from "uuid";


export class PostgresFleetRepository implements FleetRepository {
  constructor() {
    console.log('PostgresFleetRepository instancié');
  }
  async createFleet(userId: string): Promise<string> {
    const client = await pool.connect();
    const fleetId = uuidv4(); 
    try {
      await client.query(
        `INSERT INTO fleets (fleet_id, user_id) VALUES ($1, $2)
         ON CONFLICT (fleet_id) DO NOTHING`,
        [fleetId, userId]
      );
      return fleetId; 

    } catch (error) {
      console.error("Erreur lors de la création de la flotte :", error);
      throw error;
    } finally {
      client.release();
    }
  }
  async findById(fleetId: string): Promise<Fleet | undefined> {
    const client = await pool.connect();
    try {
      // Vérifie si la flotte existe
      const fleetRes = await client.query(
        `SELECT fleet_id FROM fleets WHERE fleet_id = $1`,
        [fleetId]
      );

      if (fleetRes.rows.length === 0) {
        return undefined; // Flotte introuvable
      }

      // Récupère les véhicules associés à la flotte
      const vehiclesRes = await client.query(
        `SELECT plate_number, latitude, longitude, altitude
         FROM vehicles WHERE fleet_id = $1`,
        [fleetId]
      );

      // Reconstruit la flotte avec ses véhicules et leurs localisations
      const fleet = new Fleet(fleetId);
      vehiclesRes.rows.forEach((row) => {
        const vehicle = new Vehicle(row.plate_number);
        if (row.latitude !== null && row.longitude !== null) {
          const location = new Location(row.latitude, row.longitude, row.altitude);
          fleet.parkVehicle(vehicle, location);
        } else {
          fleet.registerVehicle(vehicle);
        }
      });

      return fleet;
    } catch (error) {
      console.error("Error fetching fleet:", error);
      throw error;
    } finally {
      client.release();
    }
  }

  async save(fleet: Fleet): Promise<void> {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Sauvegarde la flotte dans la table `fleets`
      await client.query(
        `INSERT INTO fleets (fleet_id) VALUES ($1)
         ON CONFLICT (fleet_id) DO NOTHING`,
        [fleet.fleetId]
      );

      // Sauvegarde les véhicules associés à la flotte
      const vehicles = fleet["vehicles"];
      for (const [plateNumber, location] of vehicles.entries()) {
        await client.query(
          `INSERT INTO vehicles (plate_number, fleet_id, latitude, longitude, altitude)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (plate_number, fleet_id)
           DO UPDATE SET latitude = EXCLUDED.latitude,
                         longitude = EXCLUDED.longitude,
                         altitude = EXCLUDED.altitude`,
          [
            plateNumber,
            fleet.fleetId,
            location?.latitude ?? null,
            location?.longitude ?? null,
            location?.altitude ?? null,
          ]
        );
      }

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error saving fleet:", error);
      throw error;
    } finally {
      client.release();
    }
  }
}
