import { StaffState } from "./store/states/staff.state";
import { UserState } from "./store/states/user.state";

export interface AppState {
    userInfo: UserState;
    staff: StaffState;
}