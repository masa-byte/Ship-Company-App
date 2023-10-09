import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationDialogComponent } from './reservation-dialog/reservation-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReservationDisplayComponent } from './reservation-display/reservation-display.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    ReservationDialogComponent,
    ReservationDisplayComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule
  ],
  exports: [
    ReservationDisplayComponent
  ]
})
export class ReservationModule { }
