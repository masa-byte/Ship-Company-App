import { EntityState } from "@ngrx/entity";
import { Suite } from "src/app/suite/suite.model";

export interface SuiteState extends EntityState<Suite> {
    selectedSuiteId: number | null;
    loading: boolean;
    error: string;
}