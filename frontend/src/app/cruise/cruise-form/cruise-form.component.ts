import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cruise } from '../cruise.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { map, Observable, of, Subscription } from 'rxjs';
import * as CruiseActions from 'src/app/store/actions/cruise.actions';
import { selectCruiseError } from 'src/app/store/selectors/cruise.selector';
import { dateRangeValidator } from 'src/app/renting/dateValidator';
import * as DestinationActions from 'src/app/store/actions/destination.actions';
import { selectDestinationEntities } from 'src/app/store/selectors/destination.selector';
import { Destination } from 'src/app/destination/destination.model';
import { CruiseShip } from 'src/app/cruise-ship/cruise-ship.model';
import { selectCruiseShipEntities } from 'src/app/store/selectors/cruise-ship.selectors';
import { Staff } from 'src/app/staff/staff.model';
import * as StaffActions from 'src/app/store/actions/staff.actions';
import { selectStaffEntities } from 'src/app/store/selectors/staff.selectors';

import * as EmailActions from 'src/app/store/actions/email.actions';

@Component({
  selector: 'app-cruise-form',
  templateUrl: './cruise-form.component.html',
  styleUrls: ['./cruise-form.component.scss']
})
export class CruiseFormComponent implements OnInit, OnDestroy {
  cruise: Cruise = {
    id: 0,
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    type: '',
    cruiseShip: undefined,
    destinations: [],
    staff: []
  };
  destinationsArr: Destination[] = [];
  cruiseShipsArr: CruiseShip[] = [];
  staffArr: Staff[] = [];
  captainsArr: Staff[] = [];

  cruiseFormGroup: FormGroup;
  destinationFormGroup: FormGroup;
  cruiseShipFormGroup: FormGroup;
  staffFormGroup: FormGroup;

  error$: Observable<string | null> = of();
  errorSubscription: Subscription = new Subscription();
  destinationsSubscription: Subscription = new Subscription();
  cruiseShipsSubscription: Subscription = new Subscription();
  staffSubscription: Subscription = new Subscription();

  constructor(
    private snackBar: MatSnackBar,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router,

  ) {
    this.cruiseFormGroup = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      type: ['', Validators.required]
    }, { validators: dateRangeValidator });

    this.destinationFormGroup = this.fb.group({
      destinations: this.fb.array([])
    });
    this.addDestination();

    this.cruiseShipFormGroup = this.fb.group({
      name: ['', Validators.required]
    });

    this.staffFormGroup = this.fb.group({
      captain: ['', Validators.required],
      staff: this.fb.array([])
    });
    this.addStaff();
  }

  ngOnInit(): void {
    this.store.dispatch(DestinationActions.loadDestinations());
    this.store.dispatch(StaffActions.loadStaff());

    this.error$ = this.store.select(selectCruiseError);

    this.destinationsSubscription = this.store.select(selectDestinationEntities)
      .pipe(
        map((destinationEntities) => Object.entries(destinationEntities))
      )
      .subscribe((destinations) => {
        for (let destination of destinations) {
          this.destinationsArr.push(destination[1]!);
        }
      });

    this.cruiseShipsSubscription = this.store.select(selectCruiseShipEntities)
      .pipe(
        map((cruiseShipEntities) => Object.entries(cruiseShipEntities))
      )
      .subscribe((cruiseShips) => {
        for (let cruiseShip of cruiseShips) {
          this.cruiseShipsArr.push(cruiseShip[1]!);
        }
      });

    this.staffSubscription = this.store.select(selectStaffEntities)
      .pipe(
        map((staffEntities) => Object.entries(staffEntities))
      )
      .subscribe((staff) => {
        for (let s of staff) {
          if (s[1]!.jobTitle === 'captain')
            this.captainsArr.push(s[1]!);
          else
            this.staffArr.push(s[1]!);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.errorSubscription)
      this.errorSubscription.unsubscribe();
    if (this.destinationsSubscription)
      this.destinationsSubscription.unsubscribe();
    if (this.cruiseShipsSubscription)
      this.cruiseShipsSubscription.unsubscribe();
    if (this.staffSubscription)
      this.staffSubscription.unsubscribe();
  }

  get destinations(): FormArray {
    return this.destinationFormGroup.get('destinations') as FormArray;
  }

  get staff(): FormArray {
    return this.staffFormGroup.get('staff') as FormArray;
  }

  addDestination() {
    this.destinations.push(this.fb.group({
      city: ['', Validators.required]
    }));
  }

  addStaff() {
    this.staff.push(this.fb.group({
      staffId: ['', Validators.required]
    }));
  }

  removeStaff(index: number) {
    this.staff.removeAt(index);
  }

  removeDestination(index: number) {
    this.destinations.removeAt(index);
  }

  action() {
    this.createCruise();
    this.getDestinations();
    this.getCruiseShip();
    this.getStaff();

    this.store.dispatch(CruiseActions.clearCruiseError());
    this.store.dispatch(CruiseActions.addCruise({ cruise: this.cruise }));

    this.errorSubscription = this.error$.subscribe((error) => {
      if (error)
        this.openSnackBar(error);
      else {
        this.openSnackBar("Cruise successfully added!");
        this.cruise.staff.forEach((staff) => {
          this.store.dispatch(EmailActions.sendStaffCruiseEmail({ email: staff.email, cruise: this.cruise }));
        });
        this.router.navigate(['mainPage', 'listItems']);
      }
    });
  }

  createCruise() {
    this.cruise.name = this.cruiseFormGroup.get('name')!.value;
    this.cruise.startDate = this.cruiseFormGroup.get('startDate')!.value;
    this.cruise.endDate = this.cruiseFormGroup.get('endDate')!.value;
    this.cruise.type = this.cruiseFormGroup.get('type')!.value;
  }

  getDestinations() {
    for (let i = 0; i < this.destinations.length; i++) {
      const city = this.destinations.at(i).get('city')!.value;
      const destination = this.destinationsArr.find((destination) => destination.city === city);
      this.cruise.destinations.push(destination!);
    }
  }

  getCruiseShip() {
    const name = this.cruiseShipFormGroup.get('name')!.value;
    const cruiseShip = this.cruiseShipsArr.find((cruiseShip) => cruiseShip.name === name);
    this.cruise.cruiseShip = cruiseShip!;
  }

  getStaff() {
    const captainId = this.staffFormGroup.get('captain')!.value;
    const captain = this.captainsArr.find((captain) => captain.id === captainId);
    this.cruise.staff.push(captain!);

    for (let i = 0; i < this.staff.length; i++) {
      const staffId = this.staff.at(i).get('staffId')!.value;
      const staff = this.staffArr.find((staff) => staff.id === staffId);
      this.cruise.staff.push(staff!);
    }
  }

  back() {
    window.history.back();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
