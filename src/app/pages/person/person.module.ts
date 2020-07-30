import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../app-material/app-material.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FeedModule} from "../feed/feed.module";

import { PersonRoutingModule } from './person-routing.module';
import { PersonComponent } from './person.component';
import { ItemDetailComponent } from '../../components/item-detail/item-detail.component';
import { ItemEditComponent } from '../../components/item-edit/item-edit.component';
import { NewPersonComponent } from '../../components/new-person/new-person.component';
import { NewPersonFormComponent } from '../../components/new-person-form/new-person-form.component';
import { UpdatePersonFormComponent } from '../../components/update-person-form/update-person-form.component';
import {ViewMoreListFeedComponent} from "../../components/view-more-list-feed/view-more-list-feed.component";

@NgModule({
  declarations: [PersonComponent, NewPersonComponent, NewPersonFormComponent, ItemEditComponent, ItemDetailComponent, UpdatePersonFormComponent],
  imports: [
    CommonModule,
    PersonRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    FeedModule,
    AppMaterialModule
  ],
  exports: [NewPersonComponent, NewPersonFormComponent, ItemEditComponent, ItemDetailComponent, UpdatePersonFormComponent]
})
export class PersonModule { }
