import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonComponent } from './person.component';
import { ItemDetailComponent } from '../../components/item-detail/item-detail.component';
import {CanActivateService} from "../../services/can-activate.service";
import {NewPersonComponent} from "../../components/new-person/new-person.component";
import {ItemEditComponent} from "../../components/item-edit/item-edit.component";

// определение дочерних маршрутов
const itemRoutes: Routes = [
  { path: 'edit', canActivateChild: [CanActivateService], component: ItemEditComponent}
];

const routes: Routes = [
  { path: 'new', component: NewPersonComponent
    // , children: itemRoutes, data: {pType: 'person'}
  },
  { path: ':id', component: ItemDetailComponent, children: itemRoutes},
  { path: '', component: PersonComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
