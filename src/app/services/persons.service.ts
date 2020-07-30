import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {APP_SET_LOADER} from "../store/app";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {ConfigService} from "./config.service";
import {AppService} from "./app.service";
import {
  AttachmentInterface,
  EditFormPersonInterface,
  NewPersonInterface,
  PersonEditStoreInterface
} from "../interfaces/app.interface";

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  personData:PersonEditStoreInterface;
  constructor(
    private store: Store<any>,
    private  http: HttpClient,
    private configService:ConfigService,
    private appService:AppService
  ) { }


  getAllPerson():Observable<any>{ // получаем персоны - "PERSON"
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    let userIDDefault = this.appService.getDefaultPersonId();
    let cRoute:string = this.configService.getUrl('GET_PERSONS');
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

  getPerson(cId):Observable<any>{
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    let cRoute:string = this.configService.getUrl('GET_PERSON_BASE') + `/${cId}` ;

    let cOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'id': cId
      })
    };

    return this.http.get(cRoute, cOptions);
  }
  // TODO ВЫНЕСТИ В СЕРВИС ПРИЛОЖЕНИЯ - общий компонент
  saveNewPersonFile(cFile):Observable<any>{
    const newFormDataFile = new FormData();
    newFormDataFile.append('file', cFile);

    let cRoute = this.configService.getUrl('FILE');
    return this.http.post(cRoute, newFormDataFile);
  }
  // TODO --- END
  saveNewPerson(cForm:NewPersonInterface){
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    let userIDDefault = this.appService.getDefaultPersonId();
    let cRoute:string = this.configService.getUrl('GET_PERSON_BASE');
    let cOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post(cRoute, cForm, cOptions);
  }
  updatePerson(cForm:EditFormPersonInterface){
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    let userIDDefault = this.appService.getDefaultPersonId();
    let cRoute:string = `${this.configService.getUrl('GET_PERSON_BASE')}/${cForm.id}`;
    let cOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.put(cRoute, cForm, cOptions);
  }
}
