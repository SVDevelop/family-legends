import { Injectable } from '@angular/core';
import {
  AUTH_LOGIN,
  AUTH_REGISTRATION_LOGIN,
  AUTH_REGISTRATION_SEND_CODE,
  AUTH_SEND_CODE,
  AUTH_SET_DISABLED_CONTROL
} from "../store/auth";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private store: Store<any>
  ) { }

  sendCode(cValForm){ // получить СМС-код
    this.store.dispatch({type: AUTH_SET_DISABLED_CONTROL, payload: { disabledControl: {
          control: 'lphone',
          isDisable: true
        }
      }});
    this.store.dispatch({type: AUTH_SEND_CODE, payload: { login: cValForm.lphone }});
  }
  sendLogin(cValForm){ // авторизация
    this.store.dispatch({type: AUTH_LOGIN, payload: { login: cValForm.lphone, code: cValForm.lcode }});
  }

  sendRegistrationCode(cValForm){ // получить СМС-код при регистрации
    this.store.dispatch({type: AUTH_SET_DISABLED_CONTROL, payload: { disabledControl: {
          control: 'uphone',
          isDisable: true
        }
      }});
    this.store.dispatch({type: AUTH_REGISTRATION_SEND_CODE, payload: { login: cValForm.login }});
  }
  sendRegistrationEmpty(cValForm){ // авторизация
    console.log('#sendRegistrationEmpty', cValForm);
    this.store.dispatch({type: AUTH_REGISTRATION_LOGIN, payload: { login: cValForm.login, code: cValForm.code }});
  }
  sendRegistration(cValForm){ // авторизация
   console.log('#sendRegistration', cValForm);
    // this.store.dispatch({type: AUTH_LOGIN, payload: { login: cValForm.lphone, code: cValForm.lcode }});
  }
  getErrorMessage(controlName: string, errorName?: string){ // словарь ошибок
    let cErrorMsg:string = "Неизвестная ошибка";
    switch (errorName) {
    case 'required':
      if(controlName === 'gender'){
        cErrorMsg = 'Необходимо выбрать';
      } else{
        cErrorMsg = 'Необходимо заполнить';
      }
      break;
    case 'invalid':
      cErrorMsg = 'Некорректная запись';
      break;
    case 'back':
      if(controlName === 'lcode'){
        cErrorMsg = 'Неверно введен код';
      } else{
        if(controlName === 'uphone' || controlName === 'regCode'){
          cErrorMsg = 'Не может быть отправлено';
        } else{
          cErrorMsg = 'Не может быть повторно отправлено';
        }
      }

      break;
    }
    return cErrorMsg;
  };
}
