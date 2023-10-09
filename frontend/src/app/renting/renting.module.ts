import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentingComponent } from './renting.component';
import { MainPageModule } from '../main-page/main-page.module';
import { RentingRoutingModule } from './renting-routing.module';
import { RentingDisplayComponent } from './renting-display/renting-display.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RentingListComponent } from './renting-list/renting-list.component';
import { BackgroundPictureModule } from '../background-picture/background-picture.module';
import { MatButtonModule } from '@angular/material/button';
import { RatingDialogModule } from './rating-dialog/rating-dialog.module';
import { ReservationModule } from '../reservation/reservation.module';

@NgModule({
  declarations: [
    RentingComponent,
    RentingDisplayComponent,
    RentingListComponent
  ],
  imports: [
    CommonModule,
    MainPageModule,
    RentingRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    BackgroundPictureModule,
    MatButtonModule, 
    RatingDialogModule,
    ReservationModule
  ]
})
export class RentingModule { }
