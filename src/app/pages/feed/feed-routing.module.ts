import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedComponent } from './feed.component';
import {CanActivateService} from "../../services/can-activate.service";
import { ItemEditNoteComponent } from "../../components/item-edit-note/item-edit-note.component";
import {ItemDetailNoteComponent} from "../../components/item-detail-note/item-detail-note.component";
import {NewNoteComponent} from "../../components/new-note/new-note.component";

// определение дочерних маршрутов
const itemRoutes: Routes = [
  { path: 'edit', canActivateChild: [CanActivateService], component: ItemEditNoteComponent}
];
const routes: Routes = [
  { path: 'new', component: NewNoteComponent },
  { path: ':id', component: ItemDetailNoteComponent, children: itemRoutes},
  { path: '', component: FeedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule { }
