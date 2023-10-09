import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { CruiseShipService } from 'src/app/cruise-ship/cruise-ship.service';
import * as CruiseShipActions from '../actions/cruise-ship.actions';
import { CruiseShip } from 'src/app/cruise-ship/cruise-ship.model';

@Injectable()
export class CruiseShipEffects {
    constructor(
        private actions$: Actions,
        private cruiseShipService: CruiseShipService
    ) { }

    addCruiseShip$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CruiseShipActions.addCruiseShip),
            switchMap(({ cruiseShip }) =>
                this.cruiseShipService.createCruiseShip(cruiseShip).pipe(
                    map((response) => {
                        let body = response.body;
                        let cruiseShip: CruiseShip = {
                            id: body.id,
                            name: body.name,
                            yearBuilt: body.yearBuilt,
                            restaurants: body.restaurants,
                            bars: body.bars,
                            pools: body.pools,
                            theaters: body.theaters,
                            gyms: body.gyms,
                            suites: body.suites,
                            rating: body.rating
                        };

                        return CruiseShipActions.addCruiseShipSuccess({ cruiseShip: cruiseShip });
                    }),
                    catchError((error) => {
                        return of(CruiseShipActions.addCruiseShipFailure({ error: 'Failed to add cruise ship' }));
                    })
                )
            )
        )
    );

    loadCruiseShipes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CruiseShipActions.loadCruiseShips),
            switchMap(() =>
                this.cruiseShipService.getCruiseShips().pipe(
                    map((response) => {
                        let body = response.body;
                        let allCruiseShips: CruiseShip[] = body.map((cruiseShip: CruiseShip) => {
                            return {
                                id: cruiseShip.id,
                                name: cruiseShip.name,
                                yearBuilt: cruiseShip.yearBuilt,
                                restaurants: cruiseShip.restaurants,
                                bars: cruiseShip.bars,
                                pools: cruiseShip.pools,
                                theaters: cruiseShip.theaters,
                                gyms: cruiseShip.gyms,
                                suites: cruiseShip.suites,
                                rating: cruiseShip.rating
                            };
                        });

                        return CruiseShipActions.loadCruiseShipsSuccess({ cruiseShip: allCruiseShips });
                    }),
                    catchError((error) => {
                        return of(CruiseShipActions.loadCruiseShipsFailure({ error: 'Failed to load cruise ahips' }));
                    })
                )
            )
        )
    );

    updateCruiseShip$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CruiseShipActions.updateCruiseShip),
            switchMap(({ cruiseShip }) =>
                this.cruiseShipService.updateCruiseShip(cruiseShip).pipe(
                    map((response) => {
                        let body = response.body;
                        let cruiseShip: CruiseShip = {
                            id: body.id,
                            name: body.name,
                            yearBuilt: body.yearBuilt,
                            restaurants: body.restaurants,
                            bars: body.bars,
                            pools: body.pools,
                            theaters: body.theaters,
                            gyms: body.gyms,
                            suites: body.suites,
                            rating: body.rating
                        };

                        return CruiseShipActions.updateCruiseShipSuccess({ cruiseShip: cruiseShip });
                    }),
                    catchError((error) => {
                        return of(CruiseShipActions.updateCruiseShipFailure({ error: 'Failed to update cruise ship' }));
                    })
                )
            )
        )
    );

    deleteCruiseShip$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CruiseShipActions.deleteCruiseShip),
            switchMap(({ id }) =>
                this.cruiseShipService.deleteCruiseShip(id).pipe(
                    map((response) => {
                        return CruiseShipActions.deleteCruiseShipSuccess({ id: id });
                    }),
                    catchError((error) => {
                        return of(CruiseShipActions.deleteCruiseShipFailure({ error: 'Failed to delete cruise ship' }));
                    })
                )
            )
        )
    );

    rateCruiseShip$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CruiseShipActions.rateCruiseShip),
            switchMap(({ id, rating }) =>
                this.cruiseShipService.rateCruiseShip(id, rating).pipe(
                    map((response) => {
                        let body = response.body;
                        let cruiseShip: CruiseShip = {
                            id: body.id,
                            name: body.name,
                            yearBuilt: body.yearBuilt,
                            restaurants: body.restaurants,
                            bars: body.bars,
                            pools: body.pools,
                            theaters: body.theaters,
                            gyms: body.gyms,
                            rating: body.rating,
                            suites: body.suites
                        };

                        return CruiseShipActions.rateCruiseShipSuccess({ cruiseShip: cruiseShip });
                    }),
                    catchError((error) => {
                        return of(CruiseShipActions.rateCruiseShipFailure({ error: 'Failed to rate cruise ship' }));
                    })
                )
            )
        )
    );
}