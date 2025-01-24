import { FleetRepository } from "../Domain/FleetRepository";
import { Fleet } from "../Domain/Fleet";

export class InMemoryFleetRepository implements FleetRepository {
  private store: Map<string, Fleet> = new Map();

  async findById(fleetId: string): Promise<Fleet | undefined> {
    return this.store.get(fleetId);
  }

  async save(fleet: Fleet): Promise<void> {
    this.store.set(fleet.fleetId, fleet);
  }
}