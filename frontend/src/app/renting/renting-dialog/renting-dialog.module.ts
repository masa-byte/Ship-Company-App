import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RentingDialogComponent } from './renting-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [RentingDialogComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatDialogModule,
        MatIconModule,
    ],
    exports: [
        RentingDialogComponent
    ]
})
export class RentingDialogModule { }
