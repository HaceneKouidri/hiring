"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryFleetRepository = void 0;
class InMemoryFleetRepository {
    constructor() {
        this.store = new Map();
    }
    async findById(fleetId) {
        return this.store.get(fleetId);
    }
    async save(fleet) {
        this.store.set(fleet.fleetId, fleet);
    }
}
exports.InMemoryFleetRepository = InMemoryFleetRepository;
