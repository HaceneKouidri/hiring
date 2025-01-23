import { ParkVehicleCommand } from "../Commands/ParkVehicleCommand";
import { FleetRepository } from "../../Infra/InMemoryFleetRepository";
import { Vehicle } from "../../Domain/Vehicle";
import { Location } from "../../Domain/Location";

export class ParkVehicleHandler {
  constructor(private readonly fleetRepo: FleetRepository) {}

  public execute(command: ParkVehicleCommand): void {
    const fleet = this.fleetRepo.findById(command.fleetId);
    if (!fleet) {
      throw new Error(`Fleet with id=${command.fleetId} not found`);
    }

    const vehicle = new Vehicle(command.plateNumber);
    const location = new Location(
      command.latitude,
      command.longitude,
      command.altitude
    );

    fleet.parkVehicle(vehicle, location);

    this.fleetRepo.save(fleet);
  }
}
