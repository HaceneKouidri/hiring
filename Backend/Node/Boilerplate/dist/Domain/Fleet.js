"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fleet = void 0;
class Fleet {
    constructor(fleetId) {
        this.fleetId = fleetId;
        this.vehicles = new Map();
    }
    registerVehicle(vehicle) {
        if (this.vehicles.has(vehicle.plateNumber)) {
            throw new Error(`Vehicle ${vehicle.plateNumber} already registered in fleet ${this.fleetId}`);
        }
        // Initially not parked anywhere => use null
        this.vehicles.set(vehicle.plateNumber, null);
    }
    hasVehicle(vehicle) {
        return this.vehicles.has(vehicle.plateNumber);
    }
    parkVehicle(vehicle, location) {
        if (!this.vehicles.has(vehicle.plateNumber)) {
            throw new Error(`Vehicle ${vehicle.plateNumber} is not in fleet ${this.fleetId}`);
        }
        const currentLocation = this.vehicles.get(vehicle.plateNumber);
        if (currentLocation &&
            currentLocation.latitude === location.latitude &&
            currentLocation.longitude === location.longitude &&
            currentLocation.altitude === location.altitude) {
            throw new Error(`Vehicle ${vehicle.plateNumber} is already parked at this location`);
        }
        this.vehicles.set(vehicle.plateNumber, location);
    }
    getVehicleLocation(vehicle) {
        return this.vehicles.get(vehicle.plateNumber) || null;
    }
}
exports.Fleet = Fleet;
