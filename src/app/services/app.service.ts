import { Injectable } from '@angular/core';
import {
  AppStoreInterface,
  AttachmentInterface,
  ProfileEditInterface
} from "../interfaces/app.interface";
import {UserInfoInterface} from "../interfaces/user.interface";
import {Observable} from "rxjs";
import {ConfigService} from "./config.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {APP_SET_LOADER} from "../store/app";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  appData:AppStoreInterface;
  appUserData:UserInfoInterface;
  constructor(
    private store: Store<any>,
    private  http: HttpClient,
    private configService:ConfigService
  ) { }
  getStartUrl(url){ return url.split('/')[1]; }
  setAppStoreData(data:AppStoreInterface){
    this.appData = data;
  }
  setUserStoreData(data:UserInfoInterface){
    this.appUserData = data;
  }
  getToken(){ return this.appData.token }
  getXID(){ return this.appData.xId }
  getDefaultPersonId(){ return this.appUserData.default_person_id }
  getAttachImages(cVal){
    if(cVal){
      let cResult = cVal.filter((item:AttachmentInterface) => item.content_type === 'image/png' || item.content_type === 'image/jpeg');
      if(cResult.length) {
        return cResult;
      }
    }
    return null;
  }
  getAttachImage(cVal:AttachmentInterface){
    if(cVal){
      if(cVal.content_type === 'image/png' || cVal.content_type === 'image/jpeg'){
        return cVal
      }
    }
    return null;
  }
  getAppData(){
    return this.appData;
  }
  saveNewFile(cFile):Observable<any>{
    const newFormDataFile = new FormData();
    newFormDataFile.append('file', cFile);

    let cRoute = this.configService.getUrl('FILE');
    return this.http.post(cRoute, newFormDataFile);
  }
  updateProfile(cForm:ProfileEditInterface){
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    let cRoute:string = this.configService.getUrl('EDIT_PROFILE');
    let cOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.put(cRoute, cForm, cOptions);
  }
}
