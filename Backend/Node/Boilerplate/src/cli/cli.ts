import { Command } from "commander";
import { initDatabase } from "../Infra/database";
import { PostgresFleetRepository } from "../Infra/PostgresFleetRepository";
import { RegisterVehicleHandler } from "../App/Handlers/RegisterVehicleHandler";
import { ParkVehicleHandler } from "../App/Handlers/ParkVehicleHandler";
import { RegisterVehicleCommand } from "../App/Commands/RegisterVehicleCommand";
import { ParkVehicleCommand } from "../App/Commands/ParkVehicleCommand";

const program = new Command();

const bootstrap = async () => {
  // Étape 1 : Initialisation de la base de données
  await initDatabase();

  // Étape 2 : Instanciation du repository
  const fleetRepo = new PostgresFleetRepository();

  // Commande pour enregistrer un véhicule
  program
    .command("register-vehicle <fleetId> <plateNumber>")
    .description("Enregistre un véhicule dans une flotte")
    .action(async (fleetId, plateNumber) => {
      const handler = new RegisterVehicleHandler(fleetRepo);
      const command = new RegisterVehicleCommand(fleetId, plateNumber);
      try {
        await handler.execute(command);
        console.log(
          `Véhicule ${plateNumber} enregistré dans la flotte ${fleetId}`
        );
      } catch (error) {
        console.error("Erreur lors de l'enregistrement du véhicule :", error);
      }
    });

  // Commande pour localiser un véhicule
  
  program
    .command(
      "park-vehicle <fleetId> <plateNumber> <latitude> <longitude> [altitude]"
    )
    .description("Localise un véhicule dans une flotte")
    .action(async (fleetId, plateNumber, latitude, longitude, altitude) => {
      const handler = new ParkVehicleHandler(fleetRepo);
      const command = new ParkVehicleCommand(
        fleetId,
        plateNumber,
        parseFloat(latitude),
        parseFloat(longitude),
        parseFloat(altitude || "0")
      );
      try {
        await handler.execute(command);
        console.log(
          `Véhicule ${plateNumber} localisé à (${latitude}, ${longitude}, ${
            altitude || "0"
          }) dans la flotte ${fleetId}`
        );
      } catch (error) {
        console.error("Erreur lors de la localisation du véhicule :", error);
      }
    });

  program.parse(process.argv);
};

bootstrap();
