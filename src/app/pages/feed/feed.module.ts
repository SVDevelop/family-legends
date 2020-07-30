import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppMaterialModule } from '../../app-material/app-material.module';
import { FeedRoutingModule } from './feed-routing.module';

import { FeedComponent } from './feed.component';
import { InsideMenuComponent } from '../../components/inside-menu/inside-menu.component';
import { InfoWidgetComponent } from '../../components/info-widget/info-widget.component';
import {FeedItemComponent} from '../../components/feed-item/feed-item.component';
import { FeedItemPersonComponent } from '../../components/feed-item-person/feed-item-person.component';
import { FeedItemEventComponent } from '../../components/feed-item-event/feed-item-event.component';
import { FeedItemPlaceComponent } from '../../components/feed-item-place/feed-item-place.component';
import { RelationCounterComponent } from '../../components/relation-counter/relation-counter.component';
import { ListItemPlaceEventComponent } from '../../components/list-item-place-event/list-item-place-event.component';
import { ViewMoreListFeedComponent } from '../../components/view-more-list-feed/view-more-list-feed.component';


import { ItemHeadlineComponent } from '../../components/item-headline/item-headline.component';
import { ItemHeadlinePlaceComponent } from '../../components/item-headline-place/item-headline-place.component';
import { ItemHeadlineEventComponent } from '../../components/item-headline-event/item-headline-event.component';
import { ItemDetailPlaceComponent } from '../../components/item-detail-place/item-detail-place.component';
import { ItemDetailEventComponent } from '../../components/item-detail-event/item-detail-event.component';
import { ItemDetailNoteComponent } from '../../components/item-detail-note/item-detail-note.component';
import { NewNoteComponent } from '../../components/new-note/new-note.component';
import { NewNoteFormComponent } from '../../components/new-note-form/new-note-form.component';
import { AttachImagesPipe } from '../../pipes/attach-images.pipe';
import { AttachImagePipe } from '../../pipes/attach-image.pipe';
import { UpdateNoteFormComponent } from '../../components/update-note-form/update-note-form.component';
import { ItemEditNoteComponent } from '../../components/item-edit-note/item-edit-note.component';


@NgModule({
  declarations: [
    FeedComponent,
    InsideMenuComponent, InfoWidgetComponent,
    FeedItemComponent, FeedItemPersonComponent, FeedItemEventComponent, FeedItemPlaceComponent, RelationCounterComponent, ListItemPlaceEventComponent, ViewMoreListFeedComponent, ItemHeadlineComponent, ItemHeadlinePlaceComponent, ItemHeadlineEventComponent, ItemDetailPlaceComponent, ItemDetailEventComponent, ItemDetailNoteComponent, NewNoteComponent, NewNoteFormComponent, AttachImagesPipe, AttachImagePipe, UpdateNoteFormComponent, ItemEditNoteComponent],
  imports: [
    CommonModule,
    FeedRoutingModule, AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    InfoWidgetComponent, InsideMenuComponent,
    FeedItemComponent, FeedItemPersonComponent, FeedItemEventComponent, FeedItemPlaceComponent, RelationCounterComponent, ListItemPlaceEventComponent, ViewMoreListFeedComponent, ItemHeadlineComponent, ItemHeadlinePlaceComponent, ItemHeadlineEventComponent, ItemDetailPlaceComponent, ItemDetailEventComponent, ItemDetailNoteComponent, NewNoteComponent, NewNoteFormComponent, AttachImagesPipe, AttachImagePipe, UpdateNoteFormComponent, ItemEditNoteComponent]
})
export class FeedModule { }
