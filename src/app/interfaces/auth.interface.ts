import {PersonBaseInterface} from "./app.interface";
import {GroupsInterface} from "./groups.interface";

export interface AuthBaseInterface {
  login: string;
}

export interface AuthInterfaceUrl {
  urlSendCode: string;
  urlLogin: string;
  urlRegistration:string;
}
export interface DisableControl {
  control: string,
  isDisable:boolean
}
export interface AuthInterface extends AuthBaseInterface, AuthInterfaceUrl{
  isSuccess: boolean;
  stage: number; // 1 - enter-login, 2 - send-code
  isLoader: boolean;
  disabledControl: DisableControl;
}

export interface AuthQueryInterface extends AuthBaseInterface{
  code: number;
}

export interface AuthQueryRegistrationInterface extends AuthBaseInterface{
  code?: number;
  birthday?:string;
  sex?:number
  name?:string;
  surname?:string;
}


