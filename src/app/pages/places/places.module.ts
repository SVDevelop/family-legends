import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../app-material/app-material.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PlacesRoutingModule } from './places-routing.module';

import {FeedModule} from "../feed/feed.module";
import { PlacesComponent } from './places.component';
import { NewPlaceComponent } from '../../components/new-place/new-place.component';
import { NewPlaceFormComponent } from '../../components/new-place-form/new-place-form.component';
import { UpdatePlaceFormComponent } from '../../components/update-place-form/update-place-form.component';
import { ItemEditPlaceComponent } from '../../components/item-edit-place/item-edit-place.component';



@NgModule({
  declarations: [PlacesComponent, NewPlaceComponent, NewPlaceFormComponent, UpdatePlaceFormComponent, ItemEditPlaceComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    PlacesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FeedModule
  ],
  exports: [NewPlaceComponent, NewPlaceFormComponent, UpdatePlaceFormComponent, ItemEditPlaceComponent]
})
export class PlacesModule { }
