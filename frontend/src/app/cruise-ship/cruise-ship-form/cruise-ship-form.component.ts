import { Component, OnDestroy, OnInit } from '@angular/core';
import { CruiseShip } from '../cruise-ship.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription, switchMap, take, EMPTY, map } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { selectCruiseShipError, selectLastCruiseShip, selectSelectedCruiseShip } from 'src/app/store/selectors/cruise-ship.selectors';
import * as CruiseShipActions from 'src/app/store/actions/cruise-ship.actions';
import * as SuiteActions from 'src/app/store/actions/suite.actions';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Suite } from 'src/app/suite/suite.model';
import { selectSuiteEntities } from 'src/app/store/selectors/suite.selector';

@Component({
  selector: 'app-cruise-ship-form',
  templateUrl: './cruise-ship-form.component.html',
  styleUrls: ['./cruise-ship-form.component.scss']
})
export class CruiseShipFormComponent implements OnInit, OnDestroy{
  cruiseShip: CruiseShip = {
    id: 0,
    name: '',
    yearBuilt: 0,
    restaurants: 0,
    bars: 0,
    pools: 0,
    theaters: 0,
    gyms: 0,
    rating: 0,
    suites: []
  };
  suitesArr: Suite[] = [];

  restsNum: number[] = [1, 2, 3, 4];
  barsNum: number[] = [1, 2, 3];
  poolsNum: number[] = [1, 2, 3, 4, 5];
  theatersNum: number[] = [1, 2];
  gymsNum: number[] = [1, 2, 3];
  suiteTypes: string[] = ['Ocean View Suite', 'Balcony Suite', 'Penthouse suite', 'Royal Suite', 'Presidential Suite',
    'King Suite', 'Deluxe Suite', 'Regular Suite'];
  bathroomsNum: number[] = [1, 2, 3];
  singleBedsNum: number[] = [0, 1, 2, 3, 4];
  doubleBedsNum: number[] = [0, 1, 2, 3];

  isEditing!: boolean;

  cruiseShipFormGroup: FormGroup;
  suitesFormGroup: FormGroup;

  error$: Observable<string | null> = of();
  errorSubscription: Subscription = new Subscription();
  lastCruiseShipSubscription: Subscription = new Subscription();

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.cruiseShipFormGroup = this.fb.group({
      name: ['', Validators.required],
      yearBuilt: ['', Validators.required],
      restaurants: ['', Validators.required],
      bars: ['', Validators.required],
      pools: ['', Validators.required],
      theaters: ['', Validators.required],
      gyms: ['', Validators.required]
    });
    this.suitesFormGroup = this.fb.group({
      suites: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.suitesArr = [];

    this.error$ = this.store.select(selectCruiseShipError);

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const editingParam = params.get('editing');
          this.isEditing = editingParam === 'true';

          if (this.isEditing) {
            return this.store.select(selectSelectedCruiseShip).pipe(
              take(1)
            );
          } else {
            this.addSuite();
            return EMPTY;
          }
        })
      )
      .subscribe((cruiseShip) => {
        if (cruiseShip) {
          this.cruiseShip = { ...cruiseShip };
          this.store.dispatch(SuiteActions.loadSuites({ id: this.cruiseShip.id }));
          this.setCruiseShip();
          this.setSuites();
        }
      });
  }

  ngOnDestroy(): void {
    if (this.errorSubscription)
      this.errorSubscription.unsubscribe();
    if (this.lastCruiseShipSubscription)
      this.lastCruiseShipSubscription.unsubscribe();
  }

  get suites(): FormArray {
    return this.suitesFormGroup.get('suites') as FormArray;
  }

  addSuite() {
    const suite = this.fb.group({
      id: new FormControl({ value: -1, disabled: true }),
      type: ['', Validators.required],
      pricePerNight: ['', Validators.required],
      singleBeds: ['', Validators.required],
      doubleBeds: ['', Validators.required],
      bathrooms: ['', Validators.required],
    });
    this.suites.push(suite);
  }

  removeSuite(index: number) {
    this.suites.removeAt(index);
  }

  action() {
    this.createCruiseShip();

    this.store.dispatch(CruiseShipActions.clearCruiseShipError());
    if (this.isEditing)
      this.store.dispatch(CruiseShipActions.updateCruiseShip({ cruiseShip: this.cruiseShip }));
    else
      this.store.dispatch(CruiseShipActions.addCruiseShip({ cruiseShip: this.cruiseShip }));

    this.errorSubscription = this.error$.subscribe((error) => {
      if (error)
        this.openSnackBar(error);
      else {
        if (this.isEditing) {
          this.openSnackBar("Cruise Ship successfully updated!");
          this.updateSuites();
          this.router.navigate(['mainPage', 'listItems']);
        }
        else {
          this.createSuites();
          this.openSnackBar("Cruise Ship successfully added!");
        }
      }
    });
  }

  createCruiseShip() {
    this.cruiseShip.name = this.cruiseShipFormGroup.get('name')!.value;
    this.cruiseShip.yearBuilt = this.cruiseShipFormGroup.get('yearBuilt')!.value;
    this.cruiseShip.restaurants = this.cruiseShipFormGroup.get('restaurants')!.value;
    this.cruiseShip.bars = this.cruiseShipFormGroup.get('bars')!.value;
    this.cruiseShip.pools = this.cruiseShipFormGroup.get('pools')!.value;
    this.cruiseShip.theaters = this.cruiseShipFormGroup.get('theaters')!.value;
    this.cruiseShip.gyms = this.cruiseShipFormGroup.get('gyms')!.value;
  }

  setCruiseShip() {
    this.cruiseShipFormGroup.get('name')!.setValue(this.cruiseShip.name);
    this.cruiseShipFormGroup.get('yearBuilt')!.setValue(this.cruiseShip.yearBuilt);
    this.cruiseShipFormGroup.get('restaurants')!.setValue(this.cruiseShip.restaurants);
    this.cruiseShipFormGroup.get('bars')!.setValue(this.cruiseShip.bars);
    this.cruiseShipFormGroup.get('pools')!.setValue(this.cruiseShip.pools);
    this.cruiseShipFormGroup.get('theaters')!.setValue(this.cruiseShip.theaters);
    this.cruiseShipFormGroup.get('gyms')!.setValue(this.cruiseShip.gyms);
  }

  createSuites() {
    this.lastCruiseShipSubscription = this.store.select(selectLastCruiseShip).subscribe((cruiseShip) => {
      if (cruiseShip) {
        this.cruiseShip = { ...cruiseShip };
        for (let i = 0; i < this.suites.length; i++) {
          const suite: Suite = {
            id: 0,
            type: this.suites.at(i).get('type')!.value,
            pricePerNight: this.suites.at(i).get('pricePerNight')!.value,
            singleBeds: this.suites.at(i).get('singleBeds')!.value,
            doubleBeds: this.suites.at(i).get('doubleBeds')!.value,
            bathrooms: this.suites.at(i).get('bathrooms')!.value,
            occupied: false,
            cruiseShip: this.cruiseShip
          };
          this.suitesArr.push(suite);
        }

        this.store.dispatch(SuiteActions.addSuites({ suites: this.suitesArr }));
      }
    });
  }

  updateSuites() {
    const suitesToUpdate: Suite[] = [];
    const suitesToAdd: Suite[] = [];
    const idsToDelete: number[] = [];

    for (let i = 0; i < this.suites.length; i++) {
      const suiteToCheck: Suite = {
        id: this.suites.at(i).get('id')!.value,
        type: this.suites.at(i).get('type')!.value,
        pricePerNight: this.suites.at(i).get('pricePerNight')!.value,
        singleBeds: this.suites.at(i).get('singleBeds')!.value,
        doubleBeds: this.suites.at(i).get('doubleBeds')!.value,
        bathrooms: this.suites.at(i).get('bathrooms')!.value,
        occupied: false,
        cruiseShip: this.cruiseShip
      };

      if (suiteToCheck.id === -1)
        suitesToAdd.push(suiteToCheck);
      else
        suitesToUpdate.push(suiteToCheck);
    }

    this.suitesArr.forEach((suite) => {
      let found = false;
      for (let i = 0; i < this.suites.length; i++) {
        const suiteToCheck: Suite = {
          id: this.suites.at(i).get('id')!.value,
          type: this.suites.at(i).get('type')!.value,
          pricePerNight: this.suites.at(i).get('pricePerNight')!.value,
          singleBeds: this.suites.at(i).get('singleBeds')!.value,
          doubleBeds: this.suites.at(i).get('doubleBeds')!.value,
          bathrooms: this.suites.at(i).get('bathrooms')!.value,
          occupied: false,
          cruiseShip: this.cruiseShip
        };

        if (suite.id === suiteToCheck.id) {
          found = true;
          break;
        }
      }

      if (!found)
        idsToDelete.push(suite.id);
    });

    if (suitesToUpdate.length > 0)
      this.store.dispatch(SuiteActions.updateSuites({ suites: suitesToUpdate }));
    if (suitesToAdd.length > 0)
      this.store.dispatch(SuiteActions.addSuites({ suites: suitesToAdd }));
    if (idsToDelete.length > 0)
      this.store.dispatch(SuiteActions.deleteSuites({ ids: idsToDelete }));
  }

  setSuites() {
    this.store.select(selectSuiteEntities).pipe(
      map((suiteEntities) => Object.entries(suiteEntities))
    ).subscribe((suites) => {
      suites.forEach((suite) => {
        const suiteGroup = this.fb.group({
          id: new FormControl({ value: suite[1]!.id, disabled: true }),
          type: [suite[1]!.type, Validators.required],
          pricePerNight: [suite[1]!.pricePerNight, Validators.required],
          singleBeds: [suite[1]!.singleBeds, Validators.required],
          doubleBeds: [suite[1]!.doubleBeds, Validators.required],
          bathrooms: [suite[1]!.bathrooms, Validators.required],
        });
        this.suites.push(suiteGroup);
        this.suitesArr.push(suite[1]!);
      });
    });
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
