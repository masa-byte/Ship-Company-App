import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { NavMainPageComponent } from './nav-main-page/nav-main-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatIconModule} from '@angular/material/icon';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { BackgroundPictureModule } from '../background-picture/background-picture.module';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MainPageRoutingModule } from './main-page-routing.module';
import { ProfileComponent } from '../user/profile/profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogModule } from '../delete-dialog/delete-profile.module';
import { EditProfileModule } from '../user/edit-profile/edit-profile.module';
import { ListItemsComponent } from './list-items/list-items.component';
import { BoatModule } from '../boat/boat.module';
import { JetSkiModule } from '../jet-ski/jet-ski.module';
import { CruiseShipModule } from '../cruise-ship/cruise-ship.module';
import { SearchBarModule } from '../search-bar/search-bar.module';


@NgModule({
  declarations: [
    MainPageComponent,
    NavMainPageComponent,
    ProfileComponent,
    ListItemsComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MainPageRoutingModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    FormsModule,
    BackgroundPictureModule,
    MatDialogModule,
    DeleteDialogModule,
    EditProfileModule,
    BoatModule,
    JetSkiModule,
    CruiseShipModule,
    SearchBarModule
  ],
  exports: [ NavMainPageComponent ]
})
export class MainPageModule { }

