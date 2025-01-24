"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDatabase = exports.pool = void 0;
const pg_1 = require("pg");
// Charger les variables d'environnement
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Configurer la connexion PostgreSQL
exports.pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Full_db',
    password: 'admin',
    port: 5432, // Port PostgreSQL (par défaut 5432)
});
// Fonction pour initialiser la base de données
async function initDatabase() {
    const client = await exports.pool.connect();
    try {
        await client.query("BEGIN");
        // Création de la table "fleets" (pour les flottes)
        await client.query(`
      CREATE TABLE IF NOT EXISTS fleets (
        fleet_id UUID PRIMARY KEY
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
    }
    catch (error) {
        await client.query("ROLLBACK");
        console.error("Error during database initialization:", error);
        throw error;
    }
    finally {
        client.release();
    }
}
exports.initDatabase = initDatabase;
