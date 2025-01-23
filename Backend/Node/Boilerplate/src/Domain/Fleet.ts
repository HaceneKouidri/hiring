import { Vehicle } from "./Vehicle";
import { Location } from "./Location";

export class Fleet {
  private vehicles: Map<string, Location | null> = new Map();

  constructor(public readonly fleetId: string) {}

  public registerVehicle(vehicle: Vehicle): void {
    if (this.vehicles.has(vehicle.plateNumber)) {
      throw new Error(
        `Vehicle ${vehicle.plateNumber} already registered in fleet ${this.fleetId}`
      );
    }
    // Initially not parked anywhere => use null
    this.vehicles.set(vehicle.plateNumber, null);
  }

  public hasVehicle(vehicle: Vehicle): boolean {
    return this.vehicles.has(vehicle.plateNumber);
  }

  public parkVehicle(vehicle: Vehicle, location: Location): void {
    if (!this.vehicles.has(vehicle.plateNumber)) {
      throw new Error(
        `Vehicle ${vehicle.plateNumber} is not in fleet ${this.fleetId}`
      );
    }

    const currentLocation = this.vehicles.get(vehicle.plateNumber);
    if (
      currentLocation &&
      currentLocation.latitude === location.latitude &&
      currentLocation.longitude === location.longitude &&
      currentLocation.altitude === location.altitude
    ) {
      throw new Error(
        `Vehicle ${vehicle.plateNumber} is already parked at this location`
      );
    }

    this.vehicles.set(vehicle.plateNumber, location);
  }

  public getVehicleLocation(vehicle: Vehicle): Location | null {
    return this.vehicles.get(vehicle.plateNumber) || null;
  }
}
