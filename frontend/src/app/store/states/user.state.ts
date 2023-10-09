import { User } from "src/app/user/user.model";

export interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    error: string;
}