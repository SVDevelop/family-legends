import { Component, OnInit } from '@angular/core';
import {EventResponseInterface, EVENTSResponseInterface, PLACEResponseInterface} from "../../interfaces/feed.interface";
import {Store} from "@ngrx/store";
import {EventService} from "../../services/event.service";
import {APP_SET_LOADER} from "../../store/app";
import {ErrorBase} from "../../interfaces/errors.interface";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  eventsAll:EventResponseInterface[] = [];
  isViewMore:boolean = false;
  counterOffsetView:number = 0;
  constructor(
    private store: Store<any>,
    private eventService:EventService
  ) { }

  ngOnInit(): void {
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    this.counterOffsetView = 0;
    this.getEvents(0);
  }
  getMore(){
    this.getEvents(this.counterOffsetView);
  }
  getEvents(nCounterOffset:number){ // nCounterOffset - смещение по счётчику событий
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    this.eventService.getAllEvents(nCounterOffset).subscribe((resp: EVENTSResponseInterface)=>{
        if(resp.count > 0){
          let newCurrentArray = JSON.parse(JSON.stringify(this.eventsAll));
          this.eventsAll = newCurrentArray.concat(resp.results);
          this.counterOffsetView+=resp.count;
        }
        if(resp.count >= 20){ this.isViewMore = false;}
        this.store.dispatch({type: APP_SET_LOADER, payload: false});
      },
      (err: ErrorBase) => {
        // this.debugDATA = 'Ошибка загрузки данных ...';
        console.info('#err: ', 'Ошибка загрузки данных ...');
      });
  }
  trackByEvents(index: number, item: EventResponseInterface): string { return item.id; }
}
