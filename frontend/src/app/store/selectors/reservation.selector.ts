import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ReservationState } from "../states/reservation.state";
import { reservationAdapter } from "../reducers/reservation.reducer";

export const selectReservationState = createFeatureSelector<ReservationState>('reservations');

export const {
    selectAll: selectAllReservation,
    selectEntities: selectReservationEntities,
    selectIds: selectReservationIds,
} = reservationAdapter.getSelectors(selectReservationState);

export const selectSelectedReservationId = createSelector(
    selectReservationState,
    (state) => state.selectedReservationId
);

export const selectReservationLoading = createSelector(
    selectReservationState,
    (state) => state.loading
);

export const selectReservationError = createSelector(
    selectReservationState,
    (state) => state.error
);

export const selectSelectedReservation = createSelector(
    selectReservationEntities,
    selectSelectedReservationId,
    (reservationEntities, selectedReservationId) => reservationEntities[selectedReservationId!]
);