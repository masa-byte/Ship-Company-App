import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SignInComponent } from './home-page/sign-in/sign-in.component';
import { SignUpComponent } from './home-page/sign-up/sign-up.component';
import { StaffFormComponent } from './staff/staff-form/staff-form.component';
import { JetSkiFormComponent } from './jet-ski/jet-ski-form/jet-ski-form.component';
import { BoatFormComponent } from './boat/boat-form/boat-form.component';
import { CruiseShipFormComponent } from './cruise-ship/cruise-ship-form/cruise-ship-form.component';
import { CruiseFormComponent } from './cruise/cruise-form/cruise-form.component';
import { CompanyFormComponent } from './company/company-form/company-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'homePage',
    pathMatch: 'full',
  },
  {
    path: 'homePage',
    component: HomePageComponent,
    pathMatch: 'full',
  },
  {
    path: 'signInUser',
    component: SignInComponent,
    pathMatch: 'full',
  },
  {
    path: 'signUpUser',
    component: SignUpComponent,
    pathMatch: 'full',
  },
  {
    path: 'staffForm/:editing',
    component: StaffFormComponent,
    pathMatch: 'full',
  },
  {
    path: 'jetSkiForm/:editing',
    component: JetSkiFormComponent,
    pathMatch: 'full',
  },
  {
    path: 'boatForm/:editing',
    component: BoatFormComponent,
    pathMatch: 'full',
  },
  {
    path: 'cruiseShipForm/:editing',
    component: CruiseShipFormComponent,
    pathMatch: 'full',
  },
  {
    path: 'cruiseForm',
    component: CruiseFormComponent,
    pathMatch: 'full',
  },
  {
    path: 'companyForm',
    component: CompanyFormComponent,
    pathMatch: 'full',
  },
  {
    path: 'cruise',
    loadChildren: () =>
      import('./cruise/cruise.module').then((m) => m.CruiseModule),
  },
  {
    path: 'mainPage',
    loadChildren: () =>
      import('./main-page/main-page.module').then((m) => m.MainPageModule),
  },
  {
    path: 'staff',
    loadChildren: () =>
      import('./staff/staff.module').then((m) => m.StaffModule),
  },
  {
    path: 'rentings',
    loadChildren: () =>
      import('./renting/renting.module').then((m) => m.RentingModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
