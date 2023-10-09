import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { ProfileComponent } from '../user/profile/profile.component';
import { ListItemsComponent } from './list-items/list-items.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { 
        path: 'profile', 
        component: ProfileComponent
      },
      {
        path: 'listItems',
        component: ListItemsComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }
