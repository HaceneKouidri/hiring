import { setWorldConstructor, World } from "@cucumber/cucumber";
import { InMemoryFleetRepository } from "../../Infra/InMemoryFleetRepository";
import { RegisterVehicleHandler } from "../../App/Handlers/RegisterVehicleHandler";
import { ParkVehicleHandler } from "../../App/Handlers/ParkVehicleHandler";
import { Vehicle } from "../../Domain/Vehicle";
import { Fleet } from "../../Domain/Fleet";
import { Location } from "../../Domain/Location";

export interface CustomWorldData {
  // application
  fleetRepository: InMemoryFleetRepository;
  registerVehicleHandler: RegisterVehicleHandler;
  parkVehicleHandler: ParkVehicleHandler;

  // test data
  myFleet?: Fleet;
  otherFleet?: Fleet;
  vehicle?: Vehicle;
  lastError?: Error;   // track the last thrown error
  lastLocation?: Location;
}

export class CustomWorld extends World implements CustomWorldData {
  fleetRepository = new InMemoryFleetRepository();
  registerVehicleHandler = new RegisterVehicleHandler(this.fleetRepository);
  parkVehicleHandler = new ParkVehicleHandler(this.fleetRepository);

  myFleet?: Fleet;
  otherFleet?: Fleet;
  vehicle?: Vehicle;
  lastError?: Error;
  lastLocation?: Location;

  constructor(options: any) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
