"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const database_1 = require("../Infra/database");
const PostgresFleetRepository_1 = require("../Infra/PostgresFleetRepository");
const RegisterVehicleHandler_1 = require("../App/Handlers/RegisterVehicleHandler");
const ParkVehicleHandler_1 = require("../App/Handlers/ParkVehicleHandler");
const RegisterVehicleCommand_1 = require("../App/Commands/RegisterVehicleCommand");
const ParkVehicleCommand_1 = require("../App/Commands/ParkVehicleCommand");
const program = new commander_1.Command();
const bootstrap = async () => {
    // Étape 1 : Initialisation de la base de données
    await (0, database_1.initDatabase)();
    // Étape 2 : Instanciation du repository
    const fleetRepo = new PostgresFleetRepository_1.PostgresFleetRepository();
    // Commande pour enregistrer un véhicule
    program
        .command("register-vehicle <fleetId> <plateNumber>")
        .description("Enregistre un véhicule dans une flotte")
        .action(async (fleetId, plateNumber) => {
        const handler = new RegisterVehicleHandler_1.RegisterVehicleHandler(fleetRepo);
        const command = new RegisterVehicleCommand_1.RegisterVehicleCommand(fleetId, plateNumber);
        try {
            await handler.execute(command);
            console.log(`Véhicule ${plateNumber} enregistré dans la flotte ${fleetId}`);
        }
        catch (error) {
            console.error("Erreur lors de l'enregistrement du véhicule :", error);
        }
    });
    // Commande pour localiser un véhicule
    program
        .command("park-vehicle <fleetId> <plateNumber> <latitude> <longitude> [altitude]")
        .description("Localise un véhicule dans une flotte")
        .action(async (fleetId, plateNumber, latitude, longitude, altitude) => {
        const handler = new ParkVehicleHandler_1.ParkVehicleHandler(fleetRepo);
        const command = new ParkVehicleCommand_1.ParkVehicleCommand(fleetId, plateNumber, parseFloat(latitude), parseFloat(longitude), parseFloat(altitude || "0"));
        try {
            await handler.execute(command);
            console.log(`Véhicule ${plateNumber} localisé à (${latitude}, ${longitude}, ${altitude || "0"}) dans la flotte ${fleetId}`);
        }
        catch (error) {
            console.error("Erreur lors de la localisation du véhicule :", error);
        }
    });
    program.parse(process.argv);
};
bootstrap();
