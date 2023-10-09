import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffFormComponent } from './staff-form/staff-form.component';
import { BackgroundPictureModule } from '../background-picture/background-picture.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatSelectModule} from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StaffDisplayComponent } from './staff-display/staff-display.component';
import { StaffRoutingModule } from './staff-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule} from '@angular/material/icon';
import { StaffListComponent } from './staff-list/staff-list.component';
import { MainPageModule } from '../main-page/main-page.module';
import { StaffComponent } from './staff.component';
import { StaffSearchBarComponent } from './staff-search-bar/staff-search-bar.component';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [ StaffFormComponent, StaffDisplayComponent, StaffListComponent, StaffComponent, StaffSearchBarComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    BackgroundPictureModule,
    MatSnackBarModule,
    StaffRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MainPageModule,
    MatListModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
})
export class StaffModule { }
