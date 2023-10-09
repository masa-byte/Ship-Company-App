import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import * as ReservationActions from '../actions/reservation.actions';
import { Reservation } from 'src/app/reservation/reservation.model';
import { ReservationService } from 'src/app/reservation/reservation.service';

@Injectable()
export class ReservationEffects {
    constructor(
        private actions$: Actions,
        private reservationService: ReservationService
    ) { }

    addReservation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReservationActions.addReservation),
            switchMap(({ reservation }) =>
                this.reservationService.createReservation(reservation).pipe(
                    map((response) => {
                        let body = response.body;
                        let reservation: Reservation = {
                            id: body.id,
                            perosnalChef: body.perosnalChef,
                            bodyguard: body.bodyguard,
                            tourGuide: body.tourGuide,
                            cost: body.cost,
                            isRated: body.isRated,
                            user: body.user,
                            suite: body.suite,
                            cruise: body.cruise
                        };

                        return ReservationActions.addReservationSuccess({ reservation: reservation });
                    }),
                    catchError((error) => {
                        return of(ReservationActions.addReservationFailure({ error: 'Failed to add reservation' }));
                    })
                )
            )
        )
    );

    loadReservations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReservationActions.loadReservations),
            switchMap(({ id }) =>
                this.reservationService.getUserReservations(id).pipe(
                    map((response) => {
                        let body = response.body;
                        let allReservations: Reservation[] = body.map((reservation: Reservation) => {
                            return {
                                id: reservation.id,
                                perosnalChef: reservation.perosnalChef,
                                bodyguard: reservation.bodyguard,
                                tourGuide: reservation.tourGuide,
                                cost: reservation.cost,
                                isRated: reservation.isRated,
                                user: reservation.user,
                                suite: reservation.suite,
                                cruise: reservation.cruise
                            };
                        });

                        return ReservationActions.loadReservationsSuccess({ reservation: allReservations });
                    }),
                    catchError((error) => {
                        return of(ReservationActions.loadReservationsFailure({ error: 'Failed to load reservations' }));
                    })
                )
            )
        )
    );

    deleteReservation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReservationActions.deleteReservation),
            switchMap(({ id }) =>
                this.reservationService.deleteReservation(id).pipe(
                    map((response) => {
                        return ReservationActions.deleteReservationSuccess({ id: id });
                    }),
                    catchError((error) => {
                        return of(ReservationActions.deleteReservationFailure({ error: 'Failed to delete reservation' }));
                    })
                )
            )
        )
    );

    rateReservation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReservationActions.rateReservation),
            switchMap(({ id }) =>
                this.reservationService.rateReservation(id).pipe(
                    map((response) => {
                        return ReservationActions.rateReservationSuccess({ id: id });
                    }),
                    catchError((error) => {
                        return of(ReservationActions.rateReservationFailure({ error: 'Failed to rate reservation' }));
                    })
                )
            )
        )
    );
}