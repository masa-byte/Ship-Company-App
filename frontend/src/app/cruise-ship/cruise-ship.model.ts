import { Suite } from "../suite/suite.model";

export interface CruiseShip {
    id: number;
    name: string;
    yearBuilt: number;
    restaurants: number;
    bars: number;
    pools: number;
    theaters: number;
    gyms: number;
    rating: number;
    suites: Suite[];
}