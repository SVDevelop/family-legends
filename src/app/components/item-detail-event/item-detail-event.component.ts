import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {EventService} from "../../services/event.service";
import { EventResponseInterface } from "../../interfaces/feed.interface";
import {APP_SET_LOADER} from "../../store/app";
import {ErrorBase} from "../../interfaces/errors.interface";
import {Observable} from "rxjs";
import {EventEditStoreInterface} from "../../interfaces/app.interface";
import {EVENT_EDIT_INITIAL, EVENT_EDIT_SET_INFO, EVENT_EDIT_SET_INFO__STATUS} from "../../store/event";

@Component({
  selector: 'app-item-detail-event',
  templateUrl: './item-detail-event.component.html',
  styleUrls: ['./item-detail-event.component.scss']
})
export class ItemDetailEventComponent implements OnInit, OnDestroy {
  idItem:string="";
  itemDetail: EventResponseInterface;
  eventEditStore$: Observable<EventEditStoreInterface>;
  timerIsGoEditEvent;

  subsRouterEvent$;
  subsRouterEventParam$;
  constructor(
    private router: Router,
    private store: Store<any>,
    private activateRoute: ActivatedRoute,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.eventEditStore$ = this.store.pipe(select('eventEdit'));
    this.eventEditStore$.subscribe((resp: EventEditStoreInterface) => {
      this.eventService.eventData = resp;
    });
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    this.subsRouterEventParam$ = this.activateRoute.params.subscribe(params=>{
      this.idItem=params['id'];
      this.getItemEventInfo(this.idItem);
    });

    this.subsRouterEvent$ = this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.store.dispatch({type: EVENT_EDIT_SET_INFO__STATUS, payload: 1});
        if(this.eventService.eventData.isNeedUpdateDetail){
          this.getItemEventInfo(this.idItem);
        }
      }
    });

  }
  ngOnDestroy(): void {
    this.subsRouterEventParam$.unsubscribe();
    this.subsRouterEvent$.unsubscribe();
  }
  getItemEventInfo(cId){
    this.eventService.getEvent(cId).subscribe((resp:EventResponseInterface)=>{
        this.store.dispatch({type: APP_SET_LOADER, payload: false});
        if(resp.person_creater){
          this.itemDetail = resp;
          this.store.dispatch({type: EVENT_EDIT_INITIAL});
          this.store.dispatch({type: EVENT_EDIT_SET_INFO__STATUS, payload: 1 });
          this.store.dispatch({type: EVENT_EDIT_SET_INFO, payload: resp });
        } else {
          this.router.navigate(['event']);
        }
      },
      (err: ErrorBase) => {
        // this.debugDATA = 'Ошибка загрузки данных ...';
        console.info('#err: ', 'Ошибка загрузки данных ...');
        setTimeout(()=>{ this.router.navigate(['event']); },1000);
      });
  }
  onGoEdit(id){
    clearTimeout(this.timerIsGoEditEvent);
    this.timerIsGoEditEvent = setTimeout(()=>{
      this.router.navigate(['event', id, 'edit']);
    }, 100);
  }
}
