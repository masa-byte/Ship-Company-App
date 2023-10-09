import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectUser } from 'src/app/store/selectors/user.selectors';
import { JetSki } from '../jet-ski.model';
import * as JetSkiActions from '../../store/actions/jet-ski.actions'
import { MatDialog } from '@angular/material/dialog';
import { Renting } from 'src/app/renting/renting.model';
import { Subscription } from 'rxjs';
import { User } from 'src/app/user/user.model';
import { RentingDialogComponent } from 'src/app/renting/renting-dialog/renting-dialog.component';

@Component({
  selector: 'app-jet-ski-display',
  templateUrl: './jet-ski-display.component.html',
  styleUrls: ['./jet-ski-display.component.scss']
})
export class JetSkiDisplayComponent implements OnInit, OnDestroy {
  user$ = this.store.select(selectUser);
  user: User | null = null;

  userSubscription: Subscription = new Subscription();

  @Input() jetSki!: JetSki | undefined;
  @Output() jetSkiDeleteRequest = new EventEmitter<number>();
  @Output() jetSkiRentRequest = new EventEmitter<Renting>();

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

  editJetSki() {
    this.store.dispatch(JetSkiActions.selectJetSki({ id: this.jetSki!.id }));
    this.router.navigate(['jetSkiForm', 'true']);
  }

  deleteJetSki() {
    this.jetSkiDeleteRequest.emit(this.jetSki!.id);
  }

  rentJetSki() {
    const dialogRef = this.dialog.open(RentingDialogComponent, {
      width: '500px',
      data: { pricePerDay: this.jetSki!.pricePerDay }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let renting: Renting = {
          id: 0,
          startDate: result[0],
          endDate: result[1],
          cost: result[2],
          isRated: false,
          jetSki: this.jetSki!,
          user: this.user!,
          boat: null
        }
        this.jetSkiRentRequest.emit(renting);
      }
    });
  }
}
