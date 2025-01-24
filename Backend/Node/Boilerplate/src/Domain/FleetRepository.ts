import { Fleet } from "./Fleet";

export interface FleetRepository {
    findById(fleetId: string): Promise<Fleet | undefined>;
    save(fleet: Fleet): void;
}
