import { RegisterVehicleCommand } from "../Commands/RegisterVehicleCommand";
import { FleetRepository } from "../../Domain/FleetRepository";
import { Fleet } from "../../Domain/Fleet";
import { Vehicle } from "../../Domain/Vehicle";

export class RegisterVehicleHandler {
  constructor(private readonly fleetRepo: FleetRepository) {}

  public async execute(command: RegisterVehicleCommand): Promise<void> {
    let fleet = await this.fleetRepo.findById(command.fleetId);
    if (!fleet) {
      // Si la flotte n'existe pas encore, on la crée automatiquement
      fleet = new Fleet(command.fleetId);
    }

    const vehicle = new Vehicle(command.plateNumber);
    fleet.registerVehicle(vehicle);

    await this.fleetRepo.save(fleet);
  }
}