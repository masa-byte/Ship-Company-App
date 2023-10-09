import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CruiseComponent } from './cruise.component';
import { CruiseListComponent } from './cruise-list/cruise-list.component';

const routes: Routes = [
    {
        path: '',
        component: CruiseComponent,
        children: [
            {
                path: 'cruiseList/:cruiseShipName',
                component: CruiseListComponent,
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CruiseRoutingModule { }