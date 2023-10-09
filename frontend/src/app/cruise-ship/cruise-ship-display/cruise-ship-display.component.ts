import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectUser } from 'src/app/store/selectors/user.selectors';
import { CruiseShip } from '../cruise-ship.model';
import * as CruiseShipActions from 'src/app/store/actions/cruise-ship.actions';
import * as SuiteActions from 'src/app/store/actions/suite.actions';
import * as CruiseActions from 'src/app/store/actions/cruise.actions';

@Component({
  selector: 'app-cruise-ship-display',
  templateUrl: './cruise-ship-display.component.html',
  styleUrls: ['./cruise-ship-display.component.scss']
})
export class CruiseShipDisplayComponent {
  user$ = this.store.select(selectUser);

  @Input() cruiseShip!: CruiseShip | undefined;
  @Output() cruiseShipDeleteRequest = new EventEmitter<number>();

  constructor(private router: Router, private store: Store<AppState>) { }

  editCruiseShip() {
    this.store.dispatch(SuiteActions.clearSuiteEntities());
    this.store.dispatch(CruiseShipActions.selectCruiseShip({ id: this.cruiseShip!.id }));
    this.router.navigate(['cruiseShipForm', 'true']);
  }

  deleteCruiseShip() {
    this.cruiseShipDeleteRequest.emit(this.cruiseShip!.id);
  }

  checkAvailableCruises() {
    this.router.navigate(['cruise', 'cruiseList', this.cruiseShip!.name]);
  }
}
