import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})

export class ConfigService {
  eApiUrl:string;
  eApiLOgin:string;

  constructor() {
    this.eApiLOgin = environment.apiUrlLogin;
    this.eApiUrl = environment.apiUrl;
  }
  getInfoApp():string{ return vInfo; }
  getUrl(sKey):string{
    let cResult:string = '';
    let baseApiUrl = this.eApiLOgin;
    let baseApiUrlCrud = this.eApiUrl;
    switch (sKey) {
      case 'LOGIN':
        cResult = baseApiUrl + '/login';
              break;
            case 'SEND-CODE':
              cResult = baseApiUrl + '/send-code';
        break;
            case 'REGISTRATION':
        cResult = baseApiUrl + '/init';
        break;
            case 'INFO':
        cResult = baseApiUrl + '/info';
        break;
            case 'INIT':
        cResult = baseApiUrl + '/init';
        break;
            case 'GET_FEED':
        cResult = baseApiUrlCrud + '/feed';
        break;
            case 'GET_PERSON_BASE':
        cResult = baseApiUrlCrud + '/persons';
        break;
            case 'GET_PERSONS':
        cResult = baseApiUrlCrud + '/persons/list';
        break;
            case 'GET_PLACES_BASE':
        cResult = baseApiUrlCrud + '/places';
        break;
            case 'GET_PLACES':
        cResult = baseApiUrlCrud + '/places/list';
        break;
            case 'GET_PLACES_EVENTS':
        cResult = baseApiUrlCrud + '/events';
        break;
            case 'GET_EVENTS_BASE':
        cResult = baseApiUrlCrud + '/events';
        break;
          case 'GET_EVENTS':
        cResult = baseApiUrlCrud + '/events/list';
        break;
        case 'GET_NOTE_BASE':
          cResult = baseApiUrlCrud + '/notes';
          break;
        case 'FILE':
          cResult = baseApiUrlCrud + '/files/upload';
          break;
        case 'EDIT_PROFILE':
          cResult = baseApiUrl + '/profile';
          break;
        }
    return cResult;
  }

}

const vWeb:string = '1.3.4';
const vDate:string = '20.07.2020';
const vInfo:string = `[v.${vWeb} ${(vDate)? '| ' + vDate: ''}]`;
