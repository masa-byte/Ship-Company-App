import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cruise } from '../cruise.model';
import { Observable, Subscription, map, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectCruiseError, selectFilteredCruises } from 'src/app/store/selectors/cruise.selector';
import * as CruiseActions from '../../store/actions/cruise.actions'
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/reservation/reservation.model';
import * as ReservationActions from '../../store/actions/reservation.actions';

import { selectUser } from 'src/app/store/selectors/user.selectors';
import * as EmailActions from 'src/app/store/actions/email.actions';

@Component({
  selector: 'app-cruise-list',
  templateUrl: './cruise-list.component.html',
  styleUrls: ['./cruise-list.component.scss']
})
export class CruiseListComponent implements OnInit, OnDestroy {
  cruises$: Observable<[string, Cruise | undefined][]> = of();
  error$: Observable<string | null> = of();
  reservationsError$: Observable<string | null> = of();
  user$ = this.store.select(selectUser);
  userEmail: string = '';

  cruiseShipName: string = '';

  errorSubscription: Subscription = new Subscription();
  reservationErrorSubscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.error$ = this.store.select(selectCruiseError);
    this.cruises$ = this.store.select(selectFilteredCruises).pipe(
      map((cruiseEntities) => Object.entries(cruiseEntities))
    );

    this.store.dispatch(CruiseActions.loadCruises());

    this.route.params.subscribe((params) => {
      if (params['cruiseShipName'] !== "null") {
        this.cruiseShipName = params['cruiseShipName'];
      }
    });
  }

  ngOnDestroy(): void {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
    if (this.reservationErrorSubscription) {
      this.reservationErrorSubscription.unsubscribe();
    }
  }

  makeReservation(event: Reservation) {
    this.store.dispatch(ReservationActions.clearReservationError());
    this.store.dispatch(ReservationActions.addReservation({ reservation: event }));
    this.reservationErrorSubscription = this.reservationsError$.subscribe((error) => {
      if (error)
        this.openSnackBar(error);
      else {
        this.openSnackBar('Reservation created successfully!');
        this.store.dispatch(EmailActions.sendReservationEmail({ reservation: event, email: this.userEmail }));
      }
    });
  }

  deleteCruise(event: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(CruiseActions.clearCruiseError());
        this.store.dispatch(CruiseActions.deleteCruise({ id: event }));
        this.errorSubscription = this.error$.subscribe((error) => {
          if (error)
            this.openSnackBar(error);
          else
            this.openSnackBar('Cruise deleted successfully!');
        });
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
