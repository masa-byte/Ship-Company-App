import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription, map } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Boat } from 'src/app/boat/boat.model';
import { JetSki } from 'src/app/jet-ski/jet-ski.model';
import { selectBoatError, selectFilteredBoats } from 'src/app/store/selectors/boat.selector';
import { selectFilteredJetSkies, selectJetSkiError } from 'src/app/store/selectors/jet-ski.selectors';
import { CruiseShip } from 'src/app/cruise-ship/cruise-ship.model';
import { selectCruiseShipError, selectFilteredCruiseShips } from 'src/app/store/selectors/cruise-ship.selectors';
import * as BoatActions from '../../store/actions/boat.actions'
import * as JetSkiActions from '../../store/actions/jet-ski.actions'
import * as CruiseShipActions from '../../store/actions/cruise-ship.actions'
import * as RentingActions from '../../store/actions/renting.actions'
import { Renting } from 'src/app/renting/renting.model';
import { selectRentingError } from 'src/app/store/selectors/renting.selector';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';

import { selectUser } from 'src/app/store/selectors/user.selectors';
import * as EmailActions from 'src/app/store/actions/email.actions';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit, OnDestroy {
  boats$: Observable<[string, Boat | undefined][]> = of();
  jetSkies$: Observable<[string, JetSki | undefined][]> = of();
  cruiseShips$: Observable<[string, CruiseShip | undefined][]> = of();
  user$ = this.store.select(selectUser);
  userEmail: string = '';

  boatError$: Observable<string | null> = of();
  jetSkiError$: Observable<string | null> = of();
  cruiseShipError$: Observable<string | null> = of();
  rentingError$: Observable<string | null> = of();

  errorSubscriptions: Subscription[] = [];

  @HostBinding('style.overflow')
  overflow = 'auto';

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.boatError$ = this.store.select(selectBoatError);
    this.jetSkiError$ = this.store.select(selectJetSkiError);
    this.cruiseShipError$ = this.store.select(selectCruiseShipError);
    this.rentingError$ = this.store.select(selectRentingError);

    this.boats$ = this.store.select(selectFilteredBoats).pipe(
      map((boatEntities) => Object.entries(boatEntities))
    );
    this.jetSkies$ = this.store.select(selectFilteredJetSkies).pipe(
      map((jetSkiEntities) => Object.entries(jetSkiEntities))
    );
    this.cruiseShips$ = this.store.select(selectFilteredCruiseShips).pipe(
      map((cruiseShipEntities) => Object.entries(cruiseShipEntities))
    );
    this.user$.subscribe((user) => {
      if (user)
        this.userEmail = user.email;
    });

    this.store.dispatch(BoatActions.loadBoats());
    this.store.dispatch(JetSkiActions.loadJetSkies());
    this.store.dispatch(CruiseShipActions.loadCruiseShips());
  }

  ngOnDestroy(): void {
    this.errorSubscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  deleteBoat(event: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(BoatActions.clearBoatError());
        this.store.dispatch(BoatActions.deleteBoat({ id: event }));
        this.errorSubscriptions.push(this.boatError$.subscribe((error) => {
          if (error)
            this.openSnackBar(error);
          else
            this.openSnackBar('Boat deleted successfully!');
        }));
      }
    });
  }

  deleteJetSki(event: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(JetSkiActions.clearJetSkiError());
        this.store.dispatch(JetSkiActions.deleteJetSki({ id: event }));
        this.errorSubscriptions.push(this.jetSkiError$.subscribe((error) => {
          if (error)
            this.openSnackBar(error);
          else
            this.openSnackBar('Jet Ski deleted successfully!');
        }));
      }
    });
  }

  deleteCruiseShip(event: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(CruiseShipActions.clearCruiseShipError());
        this.store.dispatch(CruiseShipActions.deleteCruiseShip({ id: event }));
        this.errorSubscriptions.push(this.cruiseShipError$.subscribe((error) => {
          if (error)
            this.openSnackBar(error);
          else
            this.openSnackBar('Cruise Ship deleted successfully!');
        }
        ));
      }
    });
  }

  rent(event: Renting) {
    this.store.dispatch(RentingActions.clearRentingError());
    this.store.dispatch(RentingActions.addRenting({ renting: event }));
    this.errorSubscriptions.push(this.rentingError$.subscribe((error) => {
      if (error)
        this.openSnackBar(error);
      else {
        this.openSnackBar('Renting created successfully!');
        this.store.dispatch(EmailActions.sendRentingEmail({ renting: event, email: this.userEmail }));
      }
    }));
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
