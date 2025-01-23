import { Fleet } from "../Domain/Fleet";

export interface FleetRepository {
  findById(fleetId: string): Fleet | undefined;
  save(fleet: Fleet): void;
}

export class InMemoryFleetRepository implements FleetRepository {
  private store: Map<string, Fleet> = new Map();

  findById(fleetId: string): Fleet | undefined {
    return this.store.get(fleetId);
  }

  save(fleet: Fleet): void {
    this.store.set(fleet.fleetId, fleet);
  }
}
