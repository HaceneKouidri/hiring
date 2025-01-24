"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresFleetRepository = void 0;
const Fleet_1 = require("../Domain/Fleet");
const Vehicle_1 = require("../Domain/Vehicle");
const Location_1 = require("../Domain/Location");
const database_1 = require("./database");
class PostgresFleetRepository {
    constructor() {
        console.log('PostgresFleetRepository instancié');
    }
    async findById(fleetId) {
        const client = await database_1.pool.connect();
        try {
            // Vérifie si la flotte existe
            const fleetRes = await client.query(`SELECT fleet_id FROM fleets WHERE fleet_id = $1`, [fleetId]);
            if (fleetRes.rows.length === 0) {
                return undefined; // Flotte introuvable
            }
            // Récupère les véhicules associés à la flotte
            const vehiclesRes = await client.query(`SELECT plate_number, latitude, longitude, altitude
         FROM vehicles WHERE fleet_id = $1`, [fleetId]);
            // Reconstruit la flotte avec ses véhicules et leurs localisations
            const fleet = new Fleet_1.Fleet(fleetId);
            vehiclesRes.rows.forEach((row) => {
                const vehicle = new Vehicle_1.Vehicle(row.plate_number);
                if (row.latitude !== null && row.longitude !== null) {
                    const location = new Location_1.Location(row.latitude, row.longitude, row.altitude);
                    fleet.parkVehicle(vehicle, location);
                }
                else {
                    fleet.registerVehicle(vehicle);
                }
            });
            return fleet;
        }
        catch (error) {
            console.error("Error fetching fleet:", error);
            throw error;
        }
        finally {
            client.release();
        }
    }
    async save(fleet) {
        const client = await database_1.pool.connect();
        try {
            await client.query("BEGIN");
            // Sauvegarde la flotte dans la table `fleets`
            await client.query(`INSERT INTO fleets (fleet_id) VALUES ($1)
         ON CONFLICT (fleet_id) DO NOTHING`, [fleet.fleetId]);
            // Sauvegarde les véhicules associés à la flotte
            const vehicles = fleet["vehicles"];
            for (const [plateNumber, location] of vehicles.entries()) {
                await client.query(`INSERT INTO vehicles (plate_number, fleet_id, latitude, longitude, altitude)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (plate_number, fleet_id)
           DO UPDATE SET latitude = EXCLUDED.latitude,
                         longitude = EXCLUDED.longitude,
                         altitude = EXCLUDED.altitude`, [
                    plateNumber,
                    fleet.fleetId,
                    location?.latitude ?? null,
                    location?.longitude ?? null,
                    location?.altitude ?? null,
                ]);
            }
            await client.query("COMMIT");
        }
        catch (error) {
            await client.query("ROLLBACK");
            console.error("Error saving fleet:", error);
            throw error;
        }
        finally {
            client.release();
        }
    }
}
exports.PostgresFleetRepository = PostgresFleetRepository;
