import { EntityState } from "@ngrx/entity";
import { JetSki } from "src/app/jet-ski/jet-ski.model";

export interface JetSkiState extends EntityState<JetSki> {
    selectedJetSkiId: number | null;
    loading: boolean;
    error: string;
    sortAscending: boolean;
    sortingCriteria: string;
    searchText: string;
}