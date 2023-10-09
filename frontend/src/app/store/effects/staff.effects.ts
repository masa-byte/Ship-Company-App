import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { StaffService } from 'src/app/staff/staff.service';
import * as StaffActions from '../actions/staff.actions';
import { Staff } from 'src/app/staff/staff.model';

@Injectable()
export class StaffEffects {
    constructor(
        private actions$: Actions,
        private staffService: StaffService
    ) { }

    addStaff$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StaffActions.addStaff),
            switchMap(({ staff }) =>
                this.staffService.createStaff(staff).pipe(
                    map((response) => {
                        let body = response.body;
                        let staff: Staff = {
                            id: body.id,
                            name: body.name,
                            surname: body.surname,
                            email: body.email,
                            address: body.address,
                            birthDate: body.birthDate,
                            jobTitle: body.jobTitle,
                            salary: body.salary,
                            yearsOfExperience: body.yearsOfExperience
                        };

                        return StaffActions.addStaffSuccess({ staff: staff});
                    }),
                    catchError((error) => {
                        return of(StaffActions.addStaffFailure({ error: 'Failed to add staff' }));
                    })
                )
            )
        )
    );

    loadStaff$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StaffActions.loadStaff),
            switchMap(() =>
                this.staffService.getAllStaff().pipe(
                    map((response) => {
                        let body = response.body;
                        let allStaff: Staff[] = body.map((staff: Staff) => {
                            return {
                                id: staff.id,
                                name: staff.name,
                                surname: staff.surname,
                                email: staff.email,
                                address: staff.address,
                                birthDate: staff.birthDate,
                                jobTitle: staff.jobTitle,
                                salary: staff.salary,
                                yearsOfExperience: staff.yearsOfExperience
                            };
                        });

                        return StaffActions.loadStaffSuccess({ staff: allStaff });
                    }),
                    catchError((error) => {
                        return of(StaffActions.loadStaffFailure({ error: 'Failed to load staff' }));
                    })
                )
            )
        )
    );

    updateStaff$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StaffActions.updateStaff),
            switchMap(({ staff }) =>
                this.staffService.updateStaff(staff).pipe(
                    map((response) => {
                        let body = response.body;
                        let staff: Staff = {
                            id: body.id,
                            name: body.name,
                            surname: body.surname,
                            email: body.email,
                            address: body.address,
                            birthDate: body.birthDate,
                            jobTitle: body.jobTitle,
                            salary: body.salary,
                            yearsOfExperience: body.yearsOfExperience
                        };

                        return StaffActions.updateStaffSuccess({ staff: staff });
                    }),
                    catchError((error) => {
                        return of(StaffActions.updateStaffFailure({ error: 'Failed to update staff' }));
                    })
                )
            )
        )
    );

    deleteStaff$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StaffActions.deleteStaff),
            switchMap(({ id }) =>
                this.staffService.deleteStaff(id).pipe(
                    map((response) => {
                        return StaffActions.deleteStaffSuccess({ id: id });
                    }),
                    catchError((error) => {
                        return of(StaffActions.deleteStaffFailure({ error: 'Failed to delete staff' }));
                    })
                )
            )
        )
    );
}