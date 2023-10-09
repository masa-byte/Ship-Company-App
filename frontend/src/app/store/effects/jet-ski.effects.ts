import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { JetSkiService } from 'src/app/jet-ski/jet-ski.service';
import * as JetSkiActions from '../actions/jet-ski.actions';
import { JetSki } from 'src/app/jet-ski/jet-ski.model';

@Injectable()
export class JetSkiEffects {
    constructor(
        private actions$: Actions,
        private jetSkiService: JetSkiService
    ) { }

    addJetSki$ = createEffect(() =>
        this.actions$.pipe(
            ofType(JetSkiActions.addJetSki),
            switchMap(({ jetSki }) =>
                this.jetSkiService.createJetSki(jetSki).pipe(
                    map((response) => {
                        let body = response.body;
                        let jetSki: JetSki = {
                            id: body.id,
                            model: body.model,
                            color: body.color,
                            rating: body.rating,
                            maxSpeed: body.maxSpeed,
                            pricePerDay: body.pricePerDay
                        };

                        return JetSkiActions.addJetSkiSuccess({ jetSki: jetSki });
                    }),
                    catchError((error) => {
                        return of(JetSkiActions.addJetSkiFailure({ error: 'Failed to add jet ski' }));
                    })
                )
            )
        )
    );

    loadJetSkies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(JetSkiActions.loadJetSkies),
            switchMap(() =>
                this.jetSkiService.getJetSkies().pipe(
                    map((response) => {
                        let body = response.body;
                        let allJetSkies: JetSki[] = body.map((jetSki: JetSki) => {
                            return {
                                id: jetSki.id,
                                model: jetSki.model,
                                color: jetSki.color,
                                maxSpeed: jetSki.maxSpeed,
                                rating: jetSki.rating,
                                pricePerDay: jetSki.pricePerDay
                            };
                        });

                        return JetSkiActions.loadJetSkiesSuccess({ jetSki: allJetSkies });
                    }),
                    catchError((error) => {
                        return of(JetSkiActions.loadJetSkiesFailure({ error: 'Failed to load jet skies' }));
                    })
                )
            )
        )
    );

    updateJetSki$ = createEffect(() =>
        this.actions$.pipe(
            ofType(JetSkiActions.updateJetSki),
            switchMap(({ jetSki }) =>
                this.jetSkiService.updateJetSki(jetSki).pipe(
                    map((response) => {
                        let body = response.body;
                        let jetSki: JetSki = {
                            id: body.id,
                            model: body.model,
                            color: body.color,
                            maxSpeed: body.maxSpeed,
                            rating: body.rating,
                            pricePerDay: body.pricePerDay
                        };

                        return JetSkiActions.updateJetSkiSuccess({ jetSki: jetSki });
                    }),
                    catchError((error) => {
                        return of(JetSkiActions.updateJetSkiFailure({ error: 'Failed to update jet ski' }));
                    })
                )
            )
        )
    );

    deleteJetSki$ = createEffect(() =>
        this.actions$.pipe(
            ofType(JetSkiActions.deleteJetSki),
            switchMap(({ id }) =>
                this.jetSkiService.deleteJetSki(id).pipe(
                    map((response) => {
                        return JetSkiActions.deleteJetSkiSuccess({ id: id });
                    }),
                    catchError((error) => {
                        return of(JetSkiActions.deleteJetSkiFailure({ error: 'Failed to delete jet ski' }));
                    })
                )
            )
        )
    );

    rateJetSki$ = createEffect(() =>
        this.actions$.pipe(
            ofType(JetSkiActions.rateJetSki),
            switchMap(({ id, rating }) =>
                this.jetSkiService.rateJetSki(id, rating).pipe(
                    map((response) => {
                        let body = response.body;
                        let jetSki: JetSki = {
                            id: body.id,
                            model: body.model,
                            color: body.color,
                            maxSpeed: body.maxSpeed,
                            rating: body.rating,
                            pricePerDay: body.pricePerDay
                        };

                        return JetSkiActions.rateJetSkiSuccess({ jetSki: jetSki });
                    }),
                    catchError((error) => {
                        return of(JetSkiActions.rateJetSkiFailure({ error: 'Failed to rate jet ski' }));
                    })
                )
            )
        )
    );
}