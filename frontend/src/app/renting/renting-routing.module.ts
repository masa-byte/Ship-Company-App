import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentingComponent } from './renting.component';
import { RentingListComponent } from './renting-list/renting-list.component';

const routes: Routes = [
    {
        path: '',
        component: RentingComponent,
        children: [
            {
                path: 'rentingList',
                component: RentingListComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RentingRoutingModule { }