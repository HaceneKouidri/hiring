import { Pool } from "pg";

// Charger les variables d'environnement

import dotenv from "dotenv";
dotenv.config();
// Configurer la connexion PostgreSQL
console.log("Connection string:", process.env.DATABASE_URL);

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Fonction pour initialiser la base de données
export async function initDatabase() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Création de la table "fleets" (pour les flottes)
    await client.query(`
      CREATE TABLE IF NOT EXISTS fleets (
        fleet_id UUID PRIMARY KEY,
        user_id VARCHAR(255)
      );
    `);

    // Création de la table "vehicles" (pour les véhicules et leurs localisations)
    await client.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
        plate_number VARCHAR(50),
        fleet_id UUID,
        latitude DOUBLE PRECISION,
        longitude DOUBLE PRECISION,
        altitude DOUBLE PRECISION,
        PRIMARY KEY (plate_number, fleet_id),
        FOREIGN KEY (fleet_id) REFERENCES fleets(fleet_id) ON DELETE CASCADE
      );
    `);

    await client.query("COMMIT");
    console.log("Database initialized successfully.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error during database initialization:", error);
    throw error;
  } finally {
    client.release();
  }
}
