import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, } from '@ngrx/effects';
import { EmailService } from 'src/app/email/email.service';
import * as EmailActions from '../actions/email.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class EmailEffects {
    constructor(
        private actions$: Actions,
        private emailService: EmailService
    ) { }

    sendRentingEmail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmailActions.sendRentingEmail),
            switchMap(({ email, renting }) =>
                this.emailService.sendRentingEmail(email, renting).pipe(
                    map((response) => {
                        return EmailActions.sendEmailSuccess();
                    }),
                    catchError((error) => {
                        return of(EmailActions.sendEmailFailure({ error: 'Failed to send renting email' }));
                    })
                )
            )
        )
    );

    sendReservationEmail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmailActions.sendReservationEmail),
            switchMap(({ email, reservation }) =>
                this.emailService.sendReservationEmail(email, reservation).pipe(
                    map((response) => {
                        return EmailActions.sendEmailSuccess();
                    }),
                    catchError((error) => {
                        return of(EmailActions.sendEmailFailure({ error: 'Failed to send reservation email' }));
                    })
                )
            )
        ), { dispatch: false }
    );

    sendStaffCruiseEmail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmailActions.sendStaffCruiseEmail),
            switchMap(({ email, cruise }) =>
                this.emailService.sendStaffCruiseEmail(email, cruise).pipe(
                    map((response) => {
                        return EmailActions.sendEmailSuccess();
                    }),
                    catchError((error) => {
                        return of(EmailActions.sendEmailFailure({ error: 'Failed to send staff cruise email' }));
                    })
                )
            )
        ), { dispatch: false }
    );

    sendCancellationEmail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmailActions.sendCancellationEmail),
            switchMap(({ email }) =>
                this.emailService.sendCancellationEmail(email).pipe(
                    map((response) => {
                        return EmailActions.sendEmailSuccess();
                    }),
                    catchError((error) => {
                        return of(EmailActions.sendEmailFailure({ error: 'Failed to send cancellation email' }));
                    })
                )
            )
        ), { dispatch: false }
    );

    sendWelcomeEmail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmailActions.sendWelcomeEmail),
            switchMap(({ userName, email }) =>
                this.emailService.sendWelcomeEmail(userName, email).pipe(
                    map((response) => {
                        return EmailActions.sendEmailSuccess();
                    }),
                    catchError((error) => {
                        return of(EmailActions.sendEmailFailure({ error: 'Failed to send welcome email' }));
                    })
                )
            )
        ), { dispatch: false }
    );
}