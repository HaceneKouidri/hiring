import { Given, When, Then } from "@cucumber/cucumber";
import assert from "assert";
import { CustomWorld } from "../World/cucumber-world";
import { Vehicle } from "../../Domain/Vehicle";
import { RegisterVehicleCommand } from "../../App/Commands/RegisterVehicleCommand";
import { ParkVehicleCommand } from "../../App/Commands/ParkVehicleCommand";
import { Location } from "../../Domain/Location";
import { Fleet } from "../../Domain/Fleet";

/**
 * REGISTER VEHICLE STEPS
 */

Given("my fleet", function (this: CustomWorld) {
  this.myFleet = new Fleet("FLEET-1");
  this.fleetRepository.save(this.myFleet);
});

Given("the fleet of another user", function (this: CustomWorld) {
  this.otherFleet = new Fleet("FLEET-2");
  this.fleetRepository.save(this.otherFleet);
});

Given("a vehicle", function (this: CustomWorld) {
  this.vehicle = new Vehicle("ABC-123");
});

When("I register this vehicle into my fleet", function (this: CustomWorld) {
  if (!this.myFleet || !this.vehicle) throw new Error("Missing data");
  try {
    const cmd = new RegisterVehicleCommand(this.myFleet.fleetId, this.vehicle.plateNumber);
    this.registerVehicleHandler.execute(cmd);
  } catch (err: any) {
    this.lastError = err;
  }
});

Then("this vehicle should be part of my vehicle fleet", function (this: CustomWorld) {
  if (!this.myFleet || !this.vehicle) throw new Error("Missing data");
  assert.ok(this.myFleet.hasVehicle(this.vehicle));
});

Given("I have registered this vehicle into my fleet", function (this: CustomWorld) {
  if (!this.myFleet || !this.vehicle) throw new Error("Missing data");
  const cmd = new RegisterVehicleCommand(this.myFleet.fleetId, this.vehicle.plateNumber);
  this.registerVehicleHandler.execute(cmd);
});

When("I try to register this vehicle into my fleet", function (this: CustomWorld) {
  if (!this.myFleet || !this.vehicle) throw new Error("Missing data");
  try {
    const cmd = new RegisterVehicleCommand(this.myFleet.fleetId, this.vehicle.plateNumber);
    this.registerVehicleHandler.execute(cmd);
  } catch (err: any) {
    this.lastError = err;
  }
});

Then("I should be informed this this vehicle has already been registered into my fleet", function (this: CustomWorld) {
  assert.ok(this.lastError, "Expected an error but got none");
  assert.match(
    this.lastError!.message,
    /already registered/i,
    "Error message should mention that the vehicle is already registered"
  );
});

Given("this vehicle has been registered into the other user's fleet", function (this: CustomWorld) {
  if (!this.otherFleet || !this.vehicle) throw new Error("Missing data");
  const cmd = new RegisterVehicleCommand(this.otherFleet.fleetId, this.vehicle.plateNumber);
  this.registerVehicleHandler.execute(cmd);
});

/**
 * PARK VEHICLE STEPS
 */
Given("a location", function (this: CustomWorld) {
  this.lastLocation = new Location(48.8566, 2.3522); // e.g. Paris
});

Given("my vehicle has been parked into this location", function (this: CustomWorld) {
  if (!this.myFleet || !this.vehicle || !this.lastLocation) throw new Error("Missing data");
  const cmd = new ParkVehicleCommand(
    this.myFleet.fleetId,
    this.vehicle.plateNumber,
    this.lastLocation.latitude,
    this.lastLocation.longitude,
    this.lastLocation.altitude
  );
  this.parkVehicleHandler.execute(cmd);
});

When("I park my vehicle at this location", function (this: CustomWorld) {
  if (!this.myFleet || !this.vehicle || !this.lastLocation) throw new Error("Missing data");
  try {
    const cmd = new ParkVehicleCommand(
      this.myFleet.fleetId,
      this.vehicle.plateNumber,
      this.lastLocation.latitude,
      this.lastLocation.longitude,
      this.lastLocation.altitude
    );
    this.parkVehicleHandler.execute(cmd);
  } catch (err: any) {
    this.lastError = err;
  }
});

Then("the known location of my vehicle should verify this location", function (this: CustomWorld) {
  if (!this.myFleet || !this.vehicle || !this.lastLocation) throw new Error("Missing data");
  const location = this.myFleet.getVehicleLocation(this.vehicle);
  assert.ok(location, "Expected the vehicle to have a location");
  assert.equal(location!.latitude, this.lastLocation.latitude);
  assert.equal(location!.longitude, this.lastLocation.longitude);
  assert.equal(location!.altitude, this.lastLocation.altitude);
});

When("I try to park my vehicle at this location", function (this: CustomWorld) {
  // same as "I park my vehicle at this location" but we expect an error
  if (!this.myFleet || !this.vehicle || !this.lastLocation) throw new Error("Missing data");
  try {
    const cmd = new ParkVehicleCommand(
      this.myFleet.fleetId,
      this.vehicle.plateNumber,
      this.lastLocation.latitude,
      this.lastLocation.longitude,
      this.lastLocation.altitude
    );
    this.parkVehicleHandler.execute(cmd);
  } catch (err: any) {
    this.lastError = err;
  }
});

Then("I should be informed that my vehicle is already parked at this location", function (this: CustomWorld) {
  assert.ok(this.lastError, "Expected an error but got none");
  assert.match(
    this.lastError!.message,
    /already parked/i,
    "Error message should mention that the vehicle is already parked at this location"
  );

});
Then('I should be informed this vehicle has already been registered into my fleet', function () {
  // Write code here that turns the phrase above into concrete actions
  assert.ok(this.lastError, "On attendait une erreur mais il n'y en a pas eu");

  // Vérifier que le message d'erreur indique bien que le véhicule est déjà enregistré
  assert.match(
    this.lastError.message,
    /already registered/i,
    "Le message devrait mentionner que le véhicule est déjà enregistré"
  );
});
