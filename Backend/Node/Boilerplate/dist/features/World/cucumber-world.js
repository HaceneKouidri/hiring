"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomWorld = void 0;
const cucumber_1 = require("@cucumber/cucumber");
const InMemoryFleetRepository_1 = require("../../Infra/InMemoryFleetRepository");
const RegisterVehicleHandler_1 = require("../../App/Handlers/RegisterVehicleHandler");
const ParkVehicleHandler_1 = require("../../App/Handlers/ParkVehicleHandler");
class CustomWorld extends cucumber_1.World {
    constructor(options) {
        super(options);
        this.fleetRepository = new InMemoryFleetRepository_1.InMemoryFleetRepository();
        this.registerVehicleHandler = new RegisterVehicleHandler_1.RegisterVehicleHandler(this.fleetRepository);
        this.parkVehicleHandler = new ParkVehicleHandler_1.ParkVehicleHandler(this.fleetRepository);
    }
}
exports.CustomWorld = CustomWorld;
(0, cucumber_1.setWorldConstructor)(CustomWorld);
