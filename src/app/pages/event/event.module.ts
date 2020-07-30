import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { AppMaterialModule } from '../../app-material/app-material.module';

import {FeedModule} from "../feed/feed.module";
import { NewEventComponent } from '../../components/new-event/new-event.component';
import { NewEventFormComponent } from '../../components/new-event-form/new-event-form.component';
import { ItemEditEventComponent } from '../../components/item-edit-event/item-edit-event.component';
import { UpdateEventFormComponent } from '../../components/update-event-form/update-event-form.component';

@NgModule({
  declarations: [EventComponent, NewEventComponent, NewEventFormComponent, ItemEditEventComponent, UpdateEventFormComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FeedModule
  ],
  exports: [NewEventComponent, NewEventFormComponent, ItemEditEventComponent, UpdateEventFormComponent]
})
export class EventModule { }
