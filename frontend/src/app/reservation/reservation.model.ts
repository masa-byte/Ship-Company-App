import { Cruise } from "../cruise/cruise.model";
import { Suite } from "../suite/suite.model";
import { User } from "../user/user.model";

export interface Reservation {
    id: number;
    perosnalChef: boolean;
    bodyguard: boolean;
    tourGuide: boolean;
    cost: number;
    isRated: boolean;
    user: User | undefined;
    suite: Suite | undefined;
    cruise: Cruise | undefined;
}