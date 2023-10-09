import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { BackgroundPictureModule } from '../background-picture/background-picture.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CruiseShipDisplayComponent } from './cruise-ship-display/cruise-ship-display.component';
import { CruiseShipFormComponent } from './cruise-ship-form/cruise-ship-form.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [
    CruiseShipDisplayComponent,
    CruiseShipFormComponent
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
    ReactiveFormsModule
  ],
  exports: [
    CruiseShipDisplayComponent
  ]
})
export class CruiseShipModule { }
