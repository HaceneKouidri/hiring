"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkVehicleCommand = void 0;
class ParkVehicleCommand {
    constructor(fleetId, plateNumber, latitude, longitude, altitude) {
        this.fleetId = fleetId;
        this.plateNumber = plateNumber;
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
    }
}
exports.ParkVehicleCommand = ParkVehicleCommand;
