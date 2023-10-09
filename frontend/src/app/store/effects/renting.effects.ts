import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import * as RentingActions from '../actions/renting.actions';
import { Renting } from 'src/app/renting/renting.model';
import { RentingService } from 'src/app/renting/renting.service';

@Injectable()
export class RentingEffects {
    constructor(
        private actions$: Actions,
        private rentingService: RentingService
    ) { }

    addRenting$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RentingActions.addRenting),
            switchMap(({ renting }) =>
                this.rentingService.createRenting(renting).pipe(
                    map((response) => {
                        let body = response.body;
                        let renting: Renting = {
                            id: body.id,
                            startDate: body.startDate,
                            endDate: body.endDate,
                            cost: body.cost,
                            isRated: body.isRated,
                            user: body.user,
                            jetSki: body.jetSki,
                            boat: body.boatId
                        };

                        return RentingActions.addRentingSuccess({ renting: renting });
                    }),
                    catchError((error) => {
                        return of(RentingActions.addRentingFailure({ error: 'Failed to add renting' }));
                    })
                )
            )
        )
    );

    loadRentinges$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RentingActions.loadRentings),
            switchMap(({ id }) =>
                this.rentingService.getUserRentings(id).pipe(
                    map((response) => {
                        let body = response.body;
                        let allRentings: Renting[] = body.map((renting: Renting) => {
                            return {
                                id: renting.id,
                                startDate: renting.startDate,
                                endDate: renting.endDate,
                                cost: renting.cost,
                                isRated: renting.isRated,
                                user: renting.user,
                                jetSki: renting.jetSki,
                                boat: renting.boat
                            };
                        });

                        return RentingActions.loadRentingsSuccess({ renting: allRentings });
                    }),
                    catchError((error) => {
                        return of(RentingActions.loadRentingsFailure({ error: 'Failed to load rentings' }));
                    })
                )
            )
        )
    );

    deleteRenting$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RentingActions.deleteRenting),
            switchMap(({ id }) =>
                this.rentingService.deleteRenting(id).pipe(
                    map((response) => {
                        return RentingActions.deleteRentingSuccess({ id: id });
                    }),
                    catchError((error) => {
                        return of(RentingActions.deleteRentingFailure({ error: 'Failed to delete renting' }));
                    })
                )
            )
        )
    );

    rateRenting$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RentingActions.rateRenting),
            switchMap(({ id }) =>
                this.rentingService.rateRenting(id).pipe(
                    map((response) => {
                        return RentingActions.rateRentingSuccess({ id: id });
                    }),
                    catchError((error) => {
                        return of(RentingActions.rateRentingFailure({ error: 'Failed to rate renting' }));
                    })
                )
            )
        )
    );
}