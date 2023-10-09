import { createAction, props } from "@ngrx/store";
import { JetSki } from "src/app/jet-ski/jet-ski.model";

export const getJetSki = createAction('[JetSki] Get JetSki', props<{ id: number }>());

export const addJetSki = createAction('[JetSki] Add JetSki', props<{ jetSki: JetSki }>());

export const addJetSkiSuccess = createAction('[JetSki] Add JetSki Success', props<{ jetSki: JetSki }>());

export const addJetSkiFailure = createAction('[JetSki] Add JetSki Failure', props<{ error: string }>());

export const updateJetSki = createAction('[JetSki] Update JetSki', props<{ jetSki: JetSki }>());

export const updateJetSkiSuccess = createAction('[JetSki] Update JetSki Success', props<{ jetSki: JetSki }>());

export const updateJetSkiFailure = createAction('[JetSki] Update JetSki Failure', props<{ error: string }>());

export const deleteJetSki = createAction('[JetSki] Delete JetSki', props<{ id: number }>());

export const deleteJetSkiSuccess = createAction('[JetSki] Delete JetSki Success', props<{ id: number }>());

export const deleteJetSkiFailure = createAction('[JetSki] Delete JetSki Failure', props<{ error: string }>());

export const loadJetSkies = createAction('[JetSki] Load JetSkies');

export const loadJetSkiesSuccess = createAction('[JetSki] Load JetSki Success', props<{ jetSki: JetSki[] }>());

export const loadJetSkiesFailure = createAction('[JetSki] Load JetSki Failure', props<{ error: string }>());

export const selectJetSki = createAction('[JetSki] Select JetSki', props<{ id: number }>());

export const clearJetSkiError = createAction('[JetSki] Clear Error');

export const sortJetSkies = createAction(
    '[JetSki] Sort JetSkies',
    props<{ sortingCriteria: string; sortAscending: boolean, searchText: string }>()
);

export const rateJetSki = createAction('[JetSki] Rate JetSki', props<{ id: number, rating: number }>());

export const rateJetSkiSuccess = createAction('[JetSki] Rate JetSki Success', props<{ jetSki: JetSki }>());

export const rateJetSkiFailure = createAction('[JetSki] Rate JetSki Failure', props<{ error: string }>());