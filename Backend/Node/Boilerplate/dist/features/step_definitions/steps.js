"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const assert_1 = __importDefault(require("assert"));
const Vehicle_1 = require("../../Domain/Vehicle");
const RegisterVehicleCommand_1 = require("../../App/Commands/RegisterVehicleCommand");
const ParkVehicleCommand_1 = require("../../App/Commands/ParkVehicleCommand");
const Location_1 = require("../../Domain/Location");
const Fleet_1 = require("../../Domain/Fleet");
/**
 * REGISTER VEHICLE STEPS
 */
(0, cucumber_1.Given)("my fleet", function () {
    this.myFleet = new Fleet_1.Fleet("FLEET-1");
    this.fleetRepository.save(this.myFleet);
});
(0, cucumber_1.Given)("the fleet of another user", function () {
    this.otherFleet = new Fleet_1.Fleet("FLEET-2");
    this.fleetRepository.save(this.otherFleet);
});
(0, cucumber_1.Given)("a vehicle", function () {
    this.vehicle = new Vehicle_1.Vehicle("ABC-123");
});
(0, cucumber_1.When)("I register this vehicle into my fleet", function () {
    if (!this.myFleet || !this.vehicle)
        throw new Error("Missing data");
    try {
        const cmd = new RegisterVehicleCommand_1.RegisterVehicleCommand(this.myFleet.fleetId, this.vehicle.plateNumber);
        this.registerVehicleHandler.execute(cmd);
    }
    catch (err) {
        this.lastError = err;
    }
});
(0, cucumber_1.Then)("this vehicle should be part of my vehicle fleet", function () {
    if (!this.myFleet || !this.vehicle)
        throw new Error("Missing data");
    assert_1.default.ok(this.myFleet.hasVehicle(this.vehicle));
});
(0, cucumber_1.Given)("I have registered this vehicle into my fleet", function () {
    if (!this.myFleet || !this.vehicle)
        throw new Error("Missing data");
    const cmd = new RegisterVehicleCommand_1.RegisterVehicleCommand(this.myFleet.fleetId, this.vehicle.plateNumber);
    this.registerVehicleHandler.execute(cmd);
});
(0, cucumber_1.When)("I try to register this vehicle into my fleet", async function () {
    if (!this.myFleet || !this.vehicle)
        throw new Error("Missing data");
    try {
        const cmd = new RegisterVehicleCommand_1.RegisterVehicleCommand(this.myFleet.fleetId, this.vehicle.plateNumber);
        await this.registerVehicleHandler.execute(cmd);
    }
    catch (err) {
        this.lastError = err;
    }
});
(0, cucumber_1.Then)("I should be informed this this vehicle has already been registered into my fleet", function () {
    assert_1.default.ok(this.lastError, "Expected an error but got none");
    assert_1.default.match(this.lastError.message, /already registered/i, "Error message should mention that the vehicle is already registered");
});
(0, cucumber_1.Given)("this vehicle has been registered into the other user's fleet", function () {
    if (!this.otherFleet || !this.vehicle)
        throw new Error("Missing data");
    const cmd = new RegisterVehicleCommand_1.RegisterVehicleCommand(this.otherFleet.fleetId, this.vehicle.plateNumber);
    this.registerVehicleHandler.execute(cmd);
});
/**
 * PARK VEHICLE STEPS
 */
(0, cucumber_1.Given)("a location", function () {
    this.lastLocation = new Location_1.Location(48.8566, 2.3522); // e.g. Paris
});
(0, cucumber_1.Given)("my vehicle has been parked into this location", function () {
    if (!this.myFleet || !this.vehicle || !this.lastLocation)
        throw new Error("Missing data");
    const cmd = new ParkVehicleCommand_1.ParkVehicleCommand(this.myFleet.fleetId, this.vehicle.plateNumber, this.lastLocation.latitude, this.lastLocation.longitude, this.lastLocation.altitude);
    this.parkVehicleHandler.execute(cmd);
});
(0, cucumber_1.When)("I park my vehicle at this location", function () {
    if (!this.myFleet || !this.vehicle || !this.lastLocation)
        throw new Error("Missing data");
    try {
        const cmd = new ParkVehicleCommand_1.ParkVehicleCommand(this.myFleet.fleetId, this.vehicle.plateNumber, this.lastLocation.latitude, this.lastLocation.longitude, this.lastLocation.altitude);
        this.parkVehicleHandler.execute(cmd);
    }
    catch (err) {
        this.lastError = err;
    }
});
(0, cucumber_1.Then)("the known location of my vehicle should verify this location", function () {
    if (!this.myFleet || !this.vehicle || !this.lastLocation)
        throw new Error("Missing data");
    const location = this.myFleet.getVehicleLocation(this.vehicle);
    assert_1.default.ok(location, "Expected the vehicle to have a location");
    assert_1.default.equal(location.latitude, this.lastLocation.latitude);
    assert_1.default.equal(location.longitude, this.lastLocation.longitude);
    assert_1.default.equal(location.altitude, this.lastLocation.altitude);
});
(0, cucumber_1.When)("I try to park my vehicle at this location", async function () {
    if (!this.myFleet || !this.vehicle || !this.lastLocation)
        throw new Error("Missing data");
    try {
        const cmd = new ParkVehicleCommand_1.ParkVehicleCommand(this.myFleet.fleetId, this.vehicle.plateNumber, this.lastLocation.latitude, this.lastLocation.longitude, this.lastLocation.altitude);
        await this.parkVehicleHandler.execute(cmd);
    }
    catch (err) {
        this.lastError = err; // Stocke l'erreur pour la vérifier dans l'étape suivante
    }
});
(0, cucumber_1.Then)("I should be informed that my vehicle is already parked at this location", function () {
    assert_1.default.ok(this.lastError, "Expected an error but got none");
    assert_1.default.match(this.lastError.message, /already parked/i, "Error message should mention that the vehicle is already parked at this location");
});
(0, cucumber_1.Then)('I should be informed this vehicle has already been registered into my fleet', function () {
    // Write code here that turns the phrase above into concrete actions
    assert_1.default.ok(this.lastError, "On attendait une erreur mais il n'y en a pas eu");
    // Vérifier que le message d'erreur indique bien que le véhicule est déjà enregistré
    assert_1.default.match(this.lastError.message, /already registered/i, "Le message devrait mentionner que le véhicule est déjà enregistré");
});
