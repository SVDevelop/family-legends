import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {APP_SET_LOADER} from "../store/app";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {ConfigService} from "./config.service";
import {AppService} from "./app.service";
import {
  EventEditInterface,
  EventEditStoreInterface,
  NewEventInterface
} from "../interfaces/app.interface";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  eventData:EventEditStoreInterface;
  constructor(
    private store: Store<any>,
    private  http: HttpClient,
    private configService:ConfigService,
    private appService:AppService
  ) { }
  getEvent(cId):Observable<any>{
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    let cRoute:string = this.configService.getUrl('GET_PLACES_EVENTS') + `/${cId}` ;

    let cOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'id': cId
      })
    };

    return this.http.get(cRoute, cOptions);
  }
  getAllEvents(nOffSet:number):Observable<any>{ // получаем события - "EVENTS"
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    let userIDDefault = this.appService.getDefaultPersonId();
    let cRoute:string = this.configService.getUrl('GET_EVENTS');
    let cOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    let cBody = {
      // 'filter': [
      //   {
      //     'field': 'service',
      //     'operator': 'eq',
      //     'value': ['place', 'event', 'note', 'person']
      //   }
      //   ,
      //   {
      //     'field': 'id',
      //     'operator': 'eq',
      //     'value': userIDDefault
      //   }
      // ],
      'limit': 20,
      'offset': nOffSet
      ,"sort": {
        "direction": "asc",
        "field": "created_at"
      }
    };
    return this.http.post(cRoute, cBody, cOptions);
  }
  // TODO - в общий сервис
  saveNewEventFile(cFile):Observable<any>{
    const newFormDataFile = new FormData();
    newFormDataFile.append('file', cFile);

    let cRoute = this.configService.getUrl('FILE');
    return this.http.post(cRoute, newFormDataFile);
  }
  //TODO - END

  saveNewEvent(cForm:NewEventInterface){
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    let userIDDefault = this.appService.getDefaultPersonId();
    let cRoute:string = this.configService.getUrl('GET_EVENTS_BASE');
    let cOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post(cRoute, cForm, cOptions);
  }
  updateEvent(cForm:EventEditInterface){
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    let userIDDefault = this.appService.getDefaultPersonId();
    let cRoute:string = `${this.configService.getUrl('GET_EVENTS_BASE')}/${cForm.id}`;
    let cOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.put(cRoute, cForm, cOptions);
  }
}
