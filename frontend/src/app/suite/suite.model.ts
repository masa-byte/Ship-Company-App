import { CruiseShip } from "../cruise-ship/cruise-ship.model";

export interface Suite {
    id: number;
    type: string;
    pricePerNight: number;
    singleBeds: number;
    doubleBeds: number;
    bathrooms: number;
    occupied: boolean;
    cruiseShip: CruiseShip;
}