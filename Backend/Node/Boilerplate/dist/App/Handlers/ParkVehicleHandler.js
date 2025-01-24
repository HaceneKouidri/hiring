"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkVehicleHandler = void 0;
const Vehicle_1 = require("../../Domain/Vehicle");
const Location_1 = require("../../Domain/Location");
class ParkVehicleHandler {
    constructor(fleetRepo) {
        this.fleetRepo = fleetRepo;
    }
    async execute(command) {
        const fleet = await this.fleetRepo.findById(command.fleetId);
        if (!fleet) {
            throw new Error(`Fleet with id=${command.fleetId} not found`);
        }
        const vehicle = new Vehicle_1.Vehicle(command.plateNumber);
        const location = new Location_1.Location(command.latitude, command.longitude, command.altitude);
        fleet.parkVehicle(vehicle, location);
        await this.fleetRepo.save(fleet);
    }
}
exports.ParkVehicleHandler = ParkVehicleHandler;
