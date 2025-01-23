import { RegisterVehicleCommand } from "../Commands/RegisterVehicleCommand";
import { FleetRepository } from "../../Infra/InMemoryFleetRepository";
import { Fleet } from "../../Domain/Fleet";
import { Vehicle } from "../../Domain/Vehicle";

export class RegisterVehicleHandler {
  constructor(private readonly fleetRepo: FleetRepository) {}

  public execute(command: RegisterVehicleCommand): void {
    let fleet = this.fleetRepo.findById(command.fleetId);
    if (!fleet) {
      // If the fleet does not exist yet, we can create it or throw.
      // For simplicity: create it automatically
      fleet = new Fleet(command.fleetId);
    }

    const vehicle = new Vehicle(command.plateNumber);
    fleet.registerVehicle(vehicle);

    this.fleetRepo.save(fleet);
  }
}
