import { Boat } from "src/app/boat/boat.model";
import { JetSki } from "src/app/jet-ski/jet-ski.model";
import { User } from "src/app/user/user.model";

export interface Renting {
    id: number;
    startDate: Date;
    endDate: Date;
    cost: number;
    isRated: boolean;
    user: User;
    jetSki: JetSki | null;
    boat: Boat | null;
}