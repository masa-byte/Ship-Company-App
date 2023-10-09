import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import * as DestinationActions from '../actions/destination.actions';
import { Destination } from 'src/app/destination/destination.model';
import { DestinationService } from 'src/app/destination/destination.service';

@Injectable()
export class DestinationEffects {
    constructor(
        private actions$: Actions,
        private destinationService: DestinationService
    ) { }

    loadDestinations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DestinationActions.loadDestinations),
            switchMap(() =>
                this.destinationService.getDestinations().pipe(
                    map((response) => {
                        let body = response.body;
                        let allDestinations: Destination[] = body.map((destination: Destination) => {
                            return {
                                id: destination.id,
                                city: destination.city,
                                country: destination.country,
                                description: destination.description
                            };
                        });

                        return DestinationActions.loadDestinationsSuccess({ destinations: allDestinations });
                    }),
                    catchError((error) => {
                        return of(DestinationActions.loadDestinationsFailure({ error: 'Failed to load destinations' }));
                    })
                )
            )
        )
    );
}