import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventComponent } from './event.component';
import {CanActivateService} from "../../services/can-activate.service";
import {ItemEditEventComponent} from "../../components/item-edit-event/item-edit-event.component";
import { ItemDetailEventComponent } from "../../components/item-detail-event/item-detail-event.component";
import {NewEventComponent} from "../../components/new-event/new-event.component";

// определение дочерних маршрутов
const itemRoutes: Routes = [
  { path: 'edit', canActivateChild: [CanActivateService], component: ItemEditEventComponent}
];
const routes: Routes = [
  { path: 'new', component: NewEventComponent},
  { path: ':id', component: ItemDetailEventComponent, children: itemRoutes },
  { path: '', component: EventComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
