import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JetSkiFormComponent } from './jet-ski-form/jet-ski-form.component';
import { MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { BackgroundPictureModule } from '../background-picture/background-picture.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { JetSkiDisplayComponent } from './jet-ski-display/jet-ski-display.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RentingDialogModule } from '../renting/renting-dialog/renting-dialog.module';

@NgModule({
  declarations: [ 
    JetSkiFormComponent, JetSkiDisplayComponent
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
    RentingDialogModule
  ],
  exports: [
    JetSkiDisplayComponent
  ]
})
export class JetSkiModule { }
