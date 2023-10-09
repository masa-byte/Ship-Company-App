import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Cruise } from 'src/app/cruise/cruise.model';
import { Destination } from 'src/app/destination/destination.model';
import { selectSelectedCruise } from 'src/app/store/selectors/cruise.selector';
import { Suite } from 'src/app/suite/suite.model';
import { Reservation } from '../reservation.model';

interface DestinationIndexed extends Destination {
  number: number;
}

interface SuiteIndexed extends Suite {
  number: number;
  selected: boolean;
}

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),]

})
export class ReservationDialogComponent implements OnInit {
  cruise$: Observable<Cruise | undefined> = of();

  destinations: DestinationIndexed[] = [];
  suites: SuiteIndexed[] = [];

  calculatedPrice = 0;

  userDetails = {
    personalChef: false,
    bodyguard: false,
    tourGuide: false,
  }

  destColumnsToDisplay = ['number', 'city', 'country'];
  destColumnsToDisplayWithExpand = [...this.destColumnsToDisplay, 'expand'];
  expandedDestElement: DestinationIndexed | null = null;

  suiteColumnsToDisplay = ['number', 'type', 'pricePerNight', 'choose'];
  suiteColumnsToDisplayWithExpand = [...this.suiteColumnsToDisplay, 'expand'];
  expandedSuiteElement: SuiteIndexed | null = null;

  constructor(private store: Store<AppState>, private dialogRef: MatDialogRef<ReservationDialogComponent>) { }

  ngOnInit(): void {
    this.cruise$ = this.store.select(selectSelectedCruise);
    this.cruise$.subscribe(cruise => {
      if (cruise) {
        this.destinations = cruise.destinations.map((dest, index) => {
          return { ...dest, number: index + 1 };
        });
        this.suites = cruise.cruiseShip!.suites.map((suite, index) => {
          return { ...suite, number: index + 1, selected: false };
        });
        this.suites = this.suites.filter(suite => !suite.occupied);
      }
    });
  }

  handleCheckboxChange(event: any, element: any): void {
    this.suites.forEach(suite => {
      suite.selected = false;
    });
    element.selected = event.checked;
    this.calculatePrice();
  }

  calculatePrice() {
    let price = 0;
    this.suites.forEach(suite => {
      if (suite.selected) {
        price += suite.pricePerNight;
      }
    });
    if (this.userDetails.personalChef) {
      price += 100;
    }
    if (this.userDetails.bodyguard) {
      price += 50;
    }
    if (this.userDetails.tourGuide) {
      price += 30;
    }
    this.calculatedPrice = price;
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  book(): void {
    const reservation: Reservation = {
      id: 0,
      perosnalChef: this.userDetails.personalChef,
      bodyguard: this.userDetails.bodyguard,
      tourGuide: this.userDetails.tourGuide,
      cost: this.calculatedPrice,
      isRated: false,
      user: undefined,
      suite: this.suites.find(suite => suite.selected),
      cruise: undefined,
    };
    this.dialogRef.close(reservation);
  }
}
