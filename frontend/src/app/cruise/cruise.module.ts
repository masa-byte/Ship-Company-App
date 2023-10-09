import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CruiseFormComponent } from './cruise-form/cruise-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BackgroundPictureModule } from '../background-picture/background-picture.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { CruiseDisplayComponent } from './cruise-display/cruise-display.component';
import { CruiseListComponent } from './cruise-list/cruise-list.component';
import { CruiseComponent } from './cruise.component';
import { MainPageModule } from '../main-page/main-page.module';
import { CruiseRoutingModule } from './cruise-routing.module';
import { CruiseSearchBarComponent } from './cruise-search-bar/cruise-search-bar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReservationModule } from '../reservation/reservation.module';

@NgModule({
  declarations: [
    CruiseFormComponent,
    CruiseDisplayComponent,
    CruiseListComponent,
    CruiseComponent,
    CruiseSearchBarComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    BackgroundPictureModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    MainPageModule,
    CruiseRoutingModule,
    MatMenuModule, 
    MatGridListModule,
    MatListModule,
    MatCheckboxModule,
    ReservationModule
  ]
})
export class CruiseModule { }
