"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterVehicleHandler = void 0;
const Fleet_1 = require("../../Domain/Fleet");
const Vehicle_1 = require("../../Domain/Vehicle");
class RegisterVehicleHandler {
    constructor(fleetRepo) {
        this.fleetRepo = fleetRepo;
    }
    async execute(command) {
        let fleet = await this.fleetRepo.findById(command.fleetId);
        if (!fleet) {
            // Si la flotte n'existe pas encore, on la crée automatiquement
            fleet = new Fleet_1.Fleet(command.fleetId);
        }
        const vehicle = new Vehicle_1.Vehicle(command.plateNumber);
        fleet.registerVehicle(vehicle);
        await this.fleetRepo.save(fleet);
    }
}
exports.RegisterVehicleHandler = RegisterVehicleHandler;
