import { CruiseShip } from "../cruise-ship/cruise-ship.model";
import { Destination } from "../destination/destination.model";
import { Staff } from "../staff/staff.model";

export interface Cruise {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    type: string;
    cruiseShip: CruiseShip | undefined;
    destinations: Destination[];
    staff: Staff[];
}