import { ParkVehicleCommand } from "../Commands/ParkVehicleCommand";
import { FleetRepository } from "../../Domain/FleetRepository";
import { Vehicle } from "../../Domain/Vehicle";
import { Location } from "../../Domain/Location";

export class ParkVehicleHandler {
  constructor(private readonly fleetRepo: FleetRepository) {}

  public async execute(command: ParkVehicleCommand): Promise<void> {
    const fleet = await this.fleetRepo.findById(command.fleetId);
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

    await this.fleetRepo.save(fleet);
  }
}
