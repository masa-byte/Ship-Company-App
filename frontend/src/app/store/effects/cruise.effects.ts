import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import * as CruiseActions from '../actions/cruise.actions';
import { Cruise } from 'src/app/cruise/cruise.model';
import { CruiseService } from 'src/app/cruise/cruise.service';

@Injectable()
export class CruiseEffects {
    constructor(
        private actions$: Actions,
        private cruiseService: CruiseService
    ) { }

    addCruise$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CruiseActions.addCruise),
            switchMap(({ cruise }) =>
                this.cruiseService.createCruise(cruise).pipe(
                    map((response) => {
                        let body = response.body;
                        let cruise: Cruise = {
                            id: body.id,
                            name: body.name,
                            type: body.type,
                            startDate: body.startDate,
                            endDate: body.endDate,
                            cruiseShip: body.cruiseShip,
                            destinations: body.destinations,
                            staff: body.staff
                        };

                        return CruiseActions.addCruiseSuccess({ cruise: cruise });
                    }),
                    catchError((error) => {
                        return of(CruiseActions.addCruiseFailure({ error: 'Failed to add cruise' }));
                    })
                )
            )
        )
    );

    loadCruises$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CruiseActions.loadCruises),
            switchMap(() =>
                this.cruiseService.getCruisees().pipe(
                    map((response) => {
                        let body = response.body;
                        let allCruisees: Cruise[] = body.map((cruise: Cruise) => {
                            return {
                                id: cruise.id,
                                name: cruise.name,
                                type: cruise.type,
                                startDate: cruise.startDate,
                                endDate: cruise.endDate,
                                cruiseShip: cruise.cruiseShip,
                                destinations: cruise.destinations,
                                staff: cruise.staff
                            };
                        });

                        return CruiseActions.loadCruisesSuccess({ cruise: allCruisees });
                    }),
                    catchError((error) => {
                        return of(CruiseActions.loadCruisesFailure({ error: 'Failed to load cruises' }));
                    })
                )
            )
        )
    );

    deleteCruise$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CruiseActions.deleteCruise),
            switchMap(({ id }) =>
                this.cruiseService.deleteCruise(id).pipe(
                    map((response) => {
                        return CruiseActions.deleteCruiseSuccess({ id: id });
                    }),
                    catchError((error) => {
                        return of(CruiseActions.deleteCruiseFailure({ error: 'Failed to delete cruise' }));
                    })
                )
            )
        )
    );
}