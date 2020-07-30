import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacesComponent } from './places.component';
import {CanActivateService} from "../../services/can-activate.service";
import {ItemEditPlaceComponent} from "../../components/item-edit-place/item-edit-place.component";
import {ItemDetailPlaceComponent} from "../../components/item-detail-place/item-detail-place.component";
import {NewPlaceComponent} from "../../components/new-place/new-place.component";

// определение дочерних маршрутов
const itemRoutes: Routes = [
  { path: 'edit', canActivateChild: [CanActivateService], component: ItemEditPlaceComponent}
];

const routes: Routes = [
  { path: 'new', component: NewPlaceComponent },
  { path: ':id', component: ItemDetailPlaceComponent, children: itemRoutes },
  { path: '', component: PlacesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlacesRoutingModule { }
