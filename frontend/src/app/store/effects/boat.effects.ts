import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { BoatService } from 'src/app/boat/boat.service';
import * as BoatActions from '../actions/boat.actions';
import { Boat } from 'src/app/boat/boat.model';

@Injectable()
export class BoatEffects {
    constructor(
        private actions$: Actions,
        private boatService: BoatService
    ) { }

    addBoat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BoatActions.addBoat),
            switchMap(({ boat }) =>
                this.boatService.createBoat(boat).pipe(
                    map((response) => {
                        let body = response.body;
                        let boat: Boat = {
                            id: body.id,
                            name: body.name,
                            type: body.type,
                            yearBuilt: body.yearBuilt,
                            capacity: body.capacity,
                            rating: body.rating,
                            pricePerDay: body.pricePerDay
                        };

                        return BoatActions.addBoatSuccess({ boat: boat });
                    }),
                    catchError((error) => {
                        return of(BoatActions.addBoatFailure({ error: 'Failed to add boat' }));
                    })
                )
            )
        )
    );

    loadBoates$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BoatActions.loadBoats),
            switchMap(() =>
                this.boatService.getBoates().pipe(
                    map((response) => {
                        let body = response.body;
                        let allBoates: Boat[] = body.map((boat: Boat) => {
                            return {
                                id: boat.id,
                                name: boat.name,
                                type: boat.type,
                                yearBuilt: boat.yearBuilt,
                                capacity: boat.capacity,
                                rating: boat.rating,
                                pricePerDay: boat.pricePerDay
                            };
                        });

                        return BoatActions.loadBoatsSuccess({ boat: allBoates });
                    }),
                    catchError((error) => {
                        return of(BoatActions.loadBoatsFailure({ error: 'Failed to load boats' }));
                    })
                )
            )
        )
    );

    updateBoat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BoatActions.updateBoat),
            switchMap(({ boat }) =>
                this.boatService.updateBoat(boat).pipe(
                    map((response) => {
                        let body = response.body;
                        let boat: Boat = {
                            id: body.id,
                            name: body.name,
                            type: body.type,
                            yearBuilt: body.yearBuilt,
                            capacity: body.capacity,
                            rating: body.rating,
                            pricePerDay: body.pricePerDay
                        };

                        return BoatActions.updateBoatSuccess({ boat: boat });
                    }),
                    catchError((error) => {
                        return of(BoatActions.updateBoatFailure({ error: 'Failed to update boat' }));
                    })
                )
            )
        )
    );

    deleteBoat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BoatActions.deleteBoat),
            switchMap(({ id }) =>
                this.boatService.deleteBoat(id).pipe(
                    map((response) => {
                        return BoatActions.deleteBoatSuccess({ id: id });
                    }),
                    catchError((error) => {
                        return of(BoatActions.deleteBoatFailure({ error: 'Failed to delete boat' }));
                    })
                )
            )
        )
    );

    rateBoat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BoatActions.rateBoat),
            switchMap(({ id, rating }) =>
                this.boatService.rateBoat(id, rating).pipe(
                    map((response) => {
                        let body = response.body;
                        let boat: Boat = {
                            id: body.id,
                            name: body.name,
                            type: body.type,
                            yearBuilt: body.yearBuilt,
                            capacity: body.capacity,
                            rating: body.rating,
                            pricePerDay: body.pricePerDay
                        };

                        return BoatActions.rateBoatSuccess({ boat: boat });
                    }),
                    catchError((error) => {
                        return of(BoatActions.rateBoatFailure({ error: 'Failed to rate boat' }));
                    })
                )
            )
        )
    );
}