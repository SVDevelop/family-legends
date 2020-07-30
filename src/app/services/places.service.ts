import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {APP_SET_LOADER} from "../store/app";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {ConfigService} from "./config.service";
import {AppService} from "./app.service";
import {EditFormPersonInterface, NewPlaceInterface, PlaceEditStoreInterface} from "../interfaces/app.interface";

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  placeData:PlaceEditStoreInterface;
  constructor(
    private store: Store<any>,
    private  http: HttpClient,
    private configService:ConfigService,
    private appService:AppService
  ) { }

  getPlaces(cId):Observable<any>{
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    let cRoute:string = this.configService.getUrl('GET_PLACES_BASE') + `/${cId}` ;

    let cOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'id': cId
      })
    };

    return this.http.get(cRoute, cOptions);
  }

  getAllPlaces():Observable<any>{ // получаем места - "PLACE"
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    let userIDDefault = this.appService.getDefaultPersonId();
    let cRoute:string = this.configService.getUrl('GET_PLACES');
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
      'offset': 0
      ,"sort": {
        "direction": "asc",
        "field": "created_at"
      }
    };
    return this.http.post(cRoute, cBody, cOptions);
  }
  // TODO - в общий сервис
  saveNewPlaceFile(cFile):Observable<any>{
    const newFormDataFile = new FormData();
    newFormDataFile.append('file', cFile);

    let cRoute = this.configService.getUrl('FILE');
    return this.http.post(cRoute, newFormDataFile);
  }
  //TODO - END

  saveNewPlace(cForm:NewPlaceInterface){
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    let userIDDefault = this.appService.getDefaultPersonId();
    let cRoute:string = this.configService.getUrl('GET_PLACES_BASE');
    let cOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post(cRoute, cForm, cOptions);
  }
  updatePlace(cForm:EditFormPersonInterface){
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    let userIDDefault = this.appService.getDefaultPersonId();
    let cRoute:string = `${this.configService.getUrl('GET_PLACES_BASE')}/${cForm.id}`;
    let cOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.put(cRoute, cForm, cOptions);
  }
}
