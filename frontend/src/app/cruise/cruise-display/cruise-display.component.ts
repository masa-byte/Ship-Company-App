import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectUser } from 'src/app/store/selectors/user.selectors';
import { Cruise } from '../cruise.model';
import { MatDialog } from '@angular/material/dialog';
import { ReservationDialogComponent } from 'src/app/reservation/reservation-dialog/reservation-dialog.component';
import * as CruiseActions from '../../store/actions/cruise.actions';
import { Reservation } from 'src/app/reservation/reservation.model';
import { User } from 'src/app/user/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cruise-display',
  templateUrl: './cruise-display.component.html',
  styleUrls: ['./cruise-display.component.scss']
})
export class CruiseDisplayComponent implements OnInit, OnDestroy {
  user$ = this.store.select(selectUser);
  user: User | null = null;
  userSubscription: Subscription = new Subscription();

  @Input() cruise!: Cruise | undefined;
  @Output() cruiseDeleteRequest = new EventEmitter<number>();
  @Output() cruiseReservationRequest = new EventEmitter<Reservation>();

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.user$.subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    if (this.userSubscription)
      this.userSubscription.unsubscribe();
  }

  deleteCruise() {
    this.cruiseDeleteRequest.emit(this.cruise!.id);
  }

  makeReservation() {
    this.store.dispatch(CruiseActions.selectCruise({ id: this.cruise!.id }));
    const dialogRef = this.dialog.open(ReservationDialogComponent, {
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const reservation = result as Reservation;
        reservation.user = this.user as User;
        reservation.cruise = this.cruise as Cruise;
        this.cruiseReservationRequest.emit(reservation);
      }
    });
  }
}
