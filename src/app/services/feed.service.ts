import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {forkJoin, from, Observable, of, throwError} from "rxjs";

import {FeedResponseInterface} from "../interfaces/feed.interface";
import { ConfigService } from "../services/config.service";
import { AppService } from "../services/app.service";
import {Store} from "@ngrx/store";
import {APP_SET_LOADER} from "../store/app";
import {
  EditFormPersonInterface,
  EventEditStoreInterface,
  NewNoteInterface,
  NoteEditStoreInterface
} from "../interfaces/app.interface";
import {Error} from "tslint/lib/error";
import {
  concatAll,
  concatMap,
  delay,
  filter,
  flatMap,
  map,
  mapTo,
  mergeAll,
  mergeMap,
  pluck,
  switchMap,
  tap
} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  noteData:NoteEditStoreInterface;
  constructor(
    private store: Store<any>,
    private  http: HttpClient,
    private configService:ConfigService,
    private appService:AppService
  ) { }

  getNote(cId):Observable<any>{
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    let cRoute:string = this.configService.getUrl('GET_NOTE_BASE') + `/${cId}` ;
    let cOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'id': cId
      })
    };

    return this.http.get(cRoute, cOptions);
  }

  getAllFeed():Observable<any>{ // получаем ленту - "FEED
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    let userIDDefault = this.appService.getDefaultPersonId();
    let cRoute:string = this.configService.getUrl('GET_FEED');
    let cOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    let cBody = {
      'filter': [
        {
          'field': 'service',
          'operator': 'eq',
          'value': ['place', 'event', 'note', 'person']
        }
        ,
        {
          'field': 'id',
          'operator': 'eq',
          'value': userIDDefault
        }
      ],
      'limit': 20,
      'offset': 0
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
  saveNewImages(cFile):Observable<any>{
    const newFormDataFile = new FormData();
    newFormDataFile.append('file', cFile.file);

    let cRoute = this.configService.getUrl('FILE');
    return this.http.post(cRoute, newFormDataFile);
  }
  uploadImages(cFiles):Observable<any>{
    return forkJoin(
      cFiles.map((iFile)=> this.saveNewImages(iFile))
    );
  }

  makeAnotherRequest(cFile):Observable<any> {
    // симуляция http запроса
    return of({id: cFile.id}).pipe(
      delay(1000)
    );
  }
  makeAnotherRequest2(resp):Observable<any> {
    // симуляция http запроса
    return of({data: 'GOOD', response: resp}).pipe(
      delay(1000)
    );
  }
  makeAnotherRequestBase(cFile):Observable<any> {
    // симуляция http запроса
    return this.makeAnotherRequest(cFile);
  }
  cIds:string[] =[];

  saveNewEvent(cForm:NewNoteInterface){
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    let userIDDefault = this.appService.getDefaultPersonId();
    let cRoute:string = this.configService.getUrl('GET_NOTE_BASE');
    let cOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post(cRoute, cForm, cOptions);
  }
  updateNote(cForm:EditFormPersonInterface){
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    let userIDDefault = this.appService.getDefaultPersonId();
    let cRoute:string = `${this.configService.getUrl('GET_NOTE_BASE')}/${cForm.id}`;
    let cOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.put(cRoute, cForm, cOptions);
  }
}
