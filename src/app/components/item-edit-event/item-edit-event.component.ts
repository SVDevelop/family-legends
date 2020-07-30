import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {EventEditStoreInterface} from "../../interfaces/app.interface";
import {ActionsSubject, select, Store} from "@ngrx/store";
import {EventService} from "../../services/event.service";
import {EVENT_EDIT_SET_INFO, EVENT_EDIT_SET_INFO__STATUS, EventAction} from "../../store/event";

@Component({
  selector: 'app-item-edit-event',
  templateUrl: './item-edit-event.component.html',
  styleUrls: ['./item-edit-event.component.scss']
})
export class ItemEditEventComponent implements OnInit,OnDestroy {
  eventEditStore$: Observable<EventEditStoreInterface>;
  eventEditData:EventEditStoreInterface;
  actionSubjEvent$;
  constructor(
    private store: Store<any>,
    private actionsSubject: ActionsSubject,
    private eventsService:EventService) { }

  ngOnInit(): void {
    this.eventEditStore$ = this.store.pipe(select('eventEdit'));
    this.eventEditData = JSON.parse(JSON.stringify(this.eventsService.eventData));
    this.actionSubjEvent$ = this.actionsSubject.subscribe((action: EventAction) => {
      if (action.type === EVENT_EDIT_SET_INFO) {
        this.store.dispatch({type: EVENT_EDIT_SET_INFO__STATUS, payload: 2});
      }
    });
  }
  ngOnDestroy(): void {
    this.actionSubjEvent$.unsubscribe();
  }
}
