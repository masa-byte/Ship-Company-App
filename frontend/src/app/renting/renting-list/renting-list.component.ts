import { Component, HostBinding } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription, map, take } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Renting } from '../renting.model';
import { selectRentingEntities, selectRentingError } from 'src/app/store/selectors/renting.selector';
import { User } from 'src/app/user/user.model';
import { selectUser } from 'src/app/store/selectors/user.selectors';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { RatingDialogComponent } from '../rating-dialog/rating-dialog.component';
import { Reservation } from 'src/app/reservation/reservation.model';
import * as BoatActions from 'src/app/store/actions/boat.actions';
import * as JetSkiActions from 'src/app/store/actions/jet-ski.actions';
import * as RentingsActions from 'src/app/store/actions/renting.actions';
import * as ReservationsActions from 'src/app/store/actions/reservation.actions';
import * as CruiseShipAction from 'src/app/store/actions/cruise-ship.actions';
import { selectReservationEntities, selectReservationError } from 'src/app/store/selectors/reservation.selector';
import * as EmailActions from 'src/app/store/actions/email.actions';
import { EmailService } from 'src/app/email/email.service';

@Component({
  selector: 'app-renting-list',
  templateUrl: './renting-list.component.html',
  styleUrls: ['./renting-list.component.scss']
})
export class RentingListComponent {
  user$: Observable<User | null> = of();
  rentings$: Observable<[string, Renting | undefined][]> = of();
  reservations$: Observable<[string, Reservation | undefined][]> = of();

  userId: number = 0;
  userEmail: string = '';

  rentError$: Observable<string | null> = of();
  reservationError$: Observable<string | null> = of();

  rentErrorSubscription: Subscription = new Subscription();
  reservationErrorSubscription: Subscription = new Subscription();

  @HostBinding('style.overflow')
  overflow = 'auto';

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
    this.user$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.userId = user.id;
        this.userEmail = user.email;
        this.store.dispatch(RentingsActions.loadRentings({ id: this.userId }));
        this.store.dispatch(ReservationsActions.loadReservations({ id: this.userId }));
      }
    });

    this.rentError$ = this.store.select(selectRentingError);
    this.rentings$ = this.store.select(selectRentingEntities).pipe(
      map((rentingsEntities) => Object.entries(rentingsEntities))
    );

    this.reservationError$ = this.store.select(selectReservationError);
    this.reservations$ = this.store.select(selectReservationEntities).pipe(
      map((reservationEntities) => Object.entries(reservationEntities))
    );
  }

  ngOnDestroy(): void {
    if (this.rentErrorSubscription)
      this.rentErrorSubscription.unsubscribe();
  }

  deleteRenting(event: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(RentingsActions.clearRentingError());
        this.store.dispatch(RentingsActions.deleteRenting({ id: event }));
        this.rentErrorSubscription = this.rentError$.subscribe((rentError) => {
          if (rentError)
            this.openSnackBar(rentError);
          else {
            this.store.dispatch(EmailActions.sendCancellationEmail({ email: this.userEmail }));
            this.openSnackBar('Renting deleted successfully!');
          }
        });
      }
    });
  }

  deleteReservation(event: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(ReservationsActions.clearReservationError());
        this.store.dispatch(ReservationsActions.deleteReservation({ id: event }));
        this.reservationErrorSubscription = this.reservationError$.subscribe((reservationError) => {
          if (reservationError)
            this.openSnackBar(reservationError);
          else {
            this.store.dispatch(EmailActions.sendCancellationEmail({ email: this.userEmail }));
            this.openSnackBar('Reservation deleted successfully!');
          }
        });
      }
    });
  }

  rateReservation(event: number[]) {
    if (event[0] == -1)
      this.openSnackBar('Reservation already rated!');
    else if (event[0] == -2)
      this.openSnackBar('Reservation not finished yet!');
    else {
      const dialogRef = this.dialog.open(RatingDialogComponent, {
        width: '400px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.store.dispatch(ReservationsActions.clearReservationError());
          this.store.dispatch(ReservationsActions.rateReservation({ id: event[0] }));
          this.reservationErrorSubscription = this.reservationError$.subscribe((reservationError) => {
            if (reservationError)
              this.openSnackBar(reservationError);
            else {
              this.openSnackBar('Reservation rated successfully!');
              this.store.dispatch(CruiseShipAction.rateCruiseShip({ id: event[1], rating: result }));
            }
          });
        }
      });
    }
  }

  rateRenting(event: number[]) {
    if (event[0] == -1)
      this.openSnackBar('Renting already rated!');
    else if (event[0] == -2)
      this.openSnackBar('Renting not finished yet!');
    else if (event) {
      const dialogRef = this.dialog.open(RatingDialogComponent, {
        width: '400px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.store.dispatch(RentingsActions.clearRentingError());
          this.store.dispatch(RentingsActions.rateRenting({ id: event[0] }));
          this.rentErrorSubscription = this.rentError$.subscribe((rentError) => {
            if (rentError)
              this.openSnackBar(rentError);
            else {
              this.openSnackBar('Renting rated successfully!');
              if (event[1] != -1)
                this.store.dispatch(BoatActions.rateBoat({ id: event[1], rating: result }));
              else
                this.store.dispatch(JetSkiActions.rateJetSki({ id: event[2], rating: result }));
            }
          });
        }
      });
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
