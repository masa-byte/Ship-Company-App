import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Boat } from '../boat.model';
import * as BoatActions from '../../store/actions/boat.actions'
import { selectUser } from 'src/app/store/selectors/user.selectors';
import { Renting } from 'src/app/renting/renting.model';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from 'src/app/user/user.model';
import { RentingDialogComponent } from 'src/app/renting/renting-dialog/renting-dialog.component';

@Component({
  selector: 'app-boat-display',
  templateUrl: './boat-display.component.html',
  styleUrls: ['./boat-display.component.scss']
})
export class BoatDisplayComponent implements OnInit, OnDestroy {
  user$ = this.store.select(selectUser);
  user: User | null = null;

  userSubscription: Subscription = new Subscription();

  @Input() boat!: Boat | undefined;
  @Output() boatDeleteRequest = new EventEmitter<number>();
  @Output() boatRentRequest = new EventEmitter<Renting>();

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

  editBoat() {
    this.store.dispatch(BoatActions.selectBoat({ id: this.boat!.id }));
    this.router.navigate(['boatForm', 'true']);
  }

  deleteBoat() {
    this.boatDeleteRequest.emit(this.boat!.id);
  }

  rentBoat() {
    const dialogRef = this.dialog.open(RentingDialogComponent, {
      width: '500px',
      data: { pricePerDay: this.boat!.pricePerDay }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let renting: Renting = {
          id: 0,
          startDate: result[0],
          endDate: result[1],
          cost: result[2],
          isRated: false,
          jetSki: null,
          user: this.user!,
          boat: this.boat!
        }
        this.boatRentRequest.emit(renting);
      }
    });
  }
}
