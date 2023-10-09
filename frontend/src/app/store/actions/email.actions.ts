import { createAction, props } from "@ngrx/store";
import { Cruise } from "src/app/cruise/cruise.model";
import { Renting } from "src/app/renting/renting.model";
import { Reservation } from "src/app/reservation/reservation.model";

export const sendRentingEmail = createAction('[Email] Send Renting Email', props<{ email: string, renting: Renting }>());

export const sendReservationEmail = createAction('[Email] Send Reservation Email', props<{ email: string, reservation: Reservation }>());

export const sendStaffCruiseEmail = createAction('[Email] Send Staff Cruise Email', props<{ email: string, cruise: Cruise }>());

export const sendCancellationEmail = createAction('[Email] Send Cancellation Email', props<{ email: string }>());

export const sendWelcomeEmail = createAction('[Email] Send Welcome Email', props<{ userName: string, email: string }>());

export const sendEmailSuccess = createAction('[Email] Send Email Success');

export const sendEmailFailure = createAction('[Email] Send Email Failure', props<{ error: string }>());