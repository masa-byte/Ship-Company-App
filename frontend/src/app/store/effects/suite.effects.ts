import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import * as SuiteActions from '../actions/suite.actions';
import { Suite } from 'src/app/suite/suite.model';
import { SuiteService } from 'src/app/suite/suite.service';

@Injectable()
export class SuiteEffects {
    constructor(
        private actions$: Actions,
        private suiteService: SuiteService
    ) { }

    addSuites$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SuiteActions.addSuites),
            switchMap(({ suites }) =>
                this.suiteService.createSuites(suites).pipe(
                    map((response) => {
                        let body = response.body;
                        let suites: Suite[] = body.map((suite: Suite) => {
                            return {
                                id: suite.id,
                                type: suite.type,
                                pricePerNight: suite.pricePerNight,
                                singleBeds: suite.singleBeds,
                                doubleBeds: suite.doubleBeds,
                                bathrooms: suite.bathrooms,
                                occupied: suite.occupied,
                                cruiseShip: suite.cruiseShip
                            };
                        });

                        return SuiteActions.addSuitesSuccess({ suites: suites });
                    }),
                    catchError((error) => {
                        return of(SuiteActions.addSuitesFailure({ error: 'Failed to add suites' }));
                    })
                )
            )
        )
    );

    loadSuites$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SuiteActions.loadSuites),
            switchMap(({ id }) =>
                this.suiteService.getCruiseShipSuites(id).pipe(
                    map((response) => {
                        let body = response.body;
                        let allSuites: Suite[] = body.map((suite: Suite) => {
                            return {
                                id: suite.id,
                                type: suite.type,
                                pricePerNight: suite.pricePerNight,
                                singleBeds: suite.singleBeds,
                                doubleBeds: suite.doubleBeds,
                                bathrooms: suite.bathrooms,
                                occupied: suite.occupied,
                                cruiseShip: suite.cruiseShip
                            };
                        });

                        return SuiteActions.loadSuitesSuccess({ suites: allSuites });
                    }),
                    catchError((error) => {
                        return of(SuiteActions.loadSuitesFailure({ error: 'Failed to load suites' }));
                    })
                )
            )
        )
    );

    updateSuites$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SuiteActions.updateSuites),
            switchMap(({ suites }) =>
                this.suiteService.updateSuites(suites).pipe(
                    map((response) => {
                        let body = response.body;
                        let allSuites: Suite[] = body.map((suite: Suite) => {
                            return {
                                id: suite.id,
                                type: suite.type,
                                pricePerNight: suite.pricePerNight,
                                singleBeds: suite.singleBeds,
                                doubleBeds: suite.doubleBeds,
                                bathrooms: suite.bathrooms,
                                occupied: suite.occupied,
                                cruiseShip: suite.cruiseShip
                            };
                        });

                        return SuiteActions.updateSuitesSuccess({ suites: allSuites });
                    }),
                    catchError((error) => {
                        return of(SuiteActions.updateSuitesFailure({ error: 'Failed to update suites' }));
                    })
                )
            )
        )
    );

    deleteSuites$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SuiteActions.deleteSuites),
            switchMap(({ ids }) =>
                this.suiteService.deleteSuites(ids).pipe(
                    map((response) => {
                        return SuiteActions.deleteSuitesSuccess({ ids: ids });
                    }),
                    catchError((error) => {
                        return of(SuiteActions.deleteSuitesFailure({ error: 'Failed to delete suites' }));
                    })
                )
            )
        )
    );
}