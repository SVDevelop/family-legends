import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition
  // ...
} from '@angular/animations';
import { select, Store } from '@ngrx/store';
import {Router} from '@angular/router';
import {
  AUTH_SEND_CODE,
  AUTH_LOGIN,
  AUTH_SET_AUTH_URL,
  AUTH_LOADER,
  AUTH_SET_DISABLED_CONTROL, AUTH_SET_STAGE, AUTH_REGISTRATION_SEND_CODE
} from "../store/auth";
import {Observable} from "rxjs";

import { AuthSliderInterface } from '../interfaces/auth-slider.interface'
import {AuthInterface, AuthInterfaceUrl, AuthQueryRegistrationInterface} from "../interfaces/auth.interface";
import { ConfigService } from "../services/config.service";
import {APP_LOGOUT} from "../store/app";
import {ValidatorsService} from "../services/validators.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    trigger('showHideOpacity', [
      state('show', style({
        display: 'flex',
        position: 'relative',
        transform: 'translateX(0vw) scale(1,1)',
        opacity: 1
      })),
      state('hide', style({
        transform: 'translateX(-100vw) scale(0.5) rotate(-25deg)',
        opacity: 0,
        position: 'absolute',
      })),
      transition('hide <=> show', [
        animate('0.75s')
      ])
    ])
  ]
})

export class AuthComponent implements OnInit, OnDestroy {
  prfixNumber = "+7";
  slider: AuthSliderInterface; // slider content
  tabForm: number = 1; // acvtive auth-tab
  loginForm: FormGroup; // login form
  registerForm: FormGroup; //registration form
  timerCount:number = 60; //count TIMER
  isTimerCount:boolean; //visible TIMER
  timerSendCode:any; // timer SEND-CODE
  isTimerCountReg:boolean = false; //visible TIMER_registration
  timerSendCodeReg:any; // timer SEND-CODE_registration

  authStore$: Observable<AuthInterface>;
  authData: AuthInterface;
  constructor(
    private store: Store<any>,
    private configService:ConfigService,
    private router: Router,
    private validatorsService:ValidatorsService,
    private authService:AuthService
  ){}

  ngOnInit(): void {
    // проставляем линки авторизации
    this.store.dispatch({type: APP_LOGOUT});
    // this.store.dispatch({type: AUTH_INITIAL});



    this.store.dispatch({type: AUTH_SET_AUTH_URL,
      payload:<AuthInterfaceUrl> {
        urlSendCode: this.configService.getUrl('SEND-CODE'),
        urlLogin: this.configService.getUrl('LOGIN'),
        urlRegistration: this.configService.getUrl('REGISTRATION')
      }
    });

    this.slider  = {
      activeSlide: 1,
      countItems: 3
    };
    //fileds FORM
    this.loginForm = new FormGroup({
      lphone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      lcode: new FormControl('', [Validators.minLength(6), Validators.minLength(6)])
    });
    this.registerForm = new FormGroup({
      uphone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      regCode: new FormControl('', [Validators.minLength(6), Validators.minLength(6)]),
      name: new FormControl('', [Validators.minLength(1), Validators.maxLength(50)]),
      surname: new FormControl('', [Validators.minLength(1), Validators.maxLength(50)]),
      birthday: new FormControl('', [Validators.minLength(10), Validators.maxLength(10)]),
      sex: new FormControl('', [])
    });

    this.loginForm.reset();
    this.registerForm.reset();

    this.authStore$ = this.store.pipe(select('auth'));
    this.authStore$.subscribe((resp: AuthInterface) => {
      this.authData = resp;

      //check STAGEs
      if(resp.stage === 2){
        this.loginForm.controls.lcode.reset();
        this.loginForm.controls.lcode.setErrors(null);
      }
      if(resp.stage === 4){
        this.loginForm.controls.lcode.reset();
        this.loginForm.controls.lcode.setErrors(null);
        this.loginForm.controls.lphone.setErrors(null);
      }
      if(resp.stage === 99){
        this.timerCount = 60;
        this.resetTimer();
        this.loginForm.reset();
        this.registerForm.reset();
        // return this.router.navigate(['feed']);
      }

      if(resp.stage === 22){
        this.registerForm.controls.regCode.reset();
        this.registerForm.controls.regCode.setErrors(null);
      }

      // DISABLED - controll
      if(resp.disabledControl){
        if(resp.disabledControl.control){
          if(resp.stage < 10){
            if(resp.disabledControl.isDisable){
              this.loginForm.controls[this.authData.disabledControl.control].disable();
            } else {
              this.loginForm.controls[this.authData.disabledControl.control].enable();
            }
          } else{
            if(resp.disabledControl.isDisable){
              this.registerForm.controls[this.authData.disabledControl.control].disable();
            } else {
              this.registerForm.controls[this.authData.disabledControl.control].enable();
            }
          }
        }
      }
    });

    //TODO - для теста
    this.tabForm = 2;
    this.store.dispatch({type: AUTH_SET_STAGE, payload: {stage: 11 }});
    //TODO - END ::: для теста
  }
  ngOnDestroy(): void {}

  ngSubmit():void{
    this.loginForm.get('lcode').updateValueAndValidity();
    this.loginForm.get('lphone').updateValueAndValidity();

    let cForm = {
      lphone: `${this.prfixNumber}${this.loginForm.get('lphone').value}`,
      lcode: this.loginForm.get('lcode').value
    };
    this.store.dispatch({type: AUTH_LOADER, payload: {isLoader: true}});
    switch (this.authData.stage) {
      case 1:
        this.authService.sendCode(cForm);
        this.runTimer(60);
        break;
      case 2:
        this.authService.sendLogin(cForm);
        break;
      case 5:
        this.authService.sendLogin(cForm);
        break;
    }
  }

  resetTimer(){
    this.isTimerCount = false;
    this.timerCount = 60;
    clearInterval(this.timerSendCode);
  }

  runTimer(timeSTart:number){
    this.isTimerCount = true;
    this.timerCount = timeSTart;
    this.loginForm.controls.lcode.enable();

    clearInterval(this.timerSendCode);
    this.timerSendCode = setInterval(()=>{
      this.timerCount--;
      if( this.timerCount < 1) {
        this.isTimerCount = false ;

        this.loginForm.controls.lcode.reset();
        this.loginForm.controls.lcode.setErrors(null);
        this.loginForm.controls.lphone.setErrors(null);

        if(this.authData.stage === 3){
          this.store.dispatch({type: AUTH_SET_DISABLED_CONTROL, payload: { disabledControl: {
                control: 'lphone',
                isDisable: false
              }
            }});
          this.store.dispatch({type: AUTH_SET_STAGE, payload: {stage: 1 }});
        }
        if(this.authData.stage === 4){
          this.store.dispatch({type: AUTH_SET_DISABLED_CONTROL, payload: { disabledControl: {
                control: 'lcode',
                isDisable: true
              }
            }});
          this.store.dispatch({type: AUTH_SET_STAGE, payload: {stage: 5 }});
        }

        this.timerCount = 0;
        this.resetTimer();
      }
    }, 1000);
  }
  getIsTimer():boolean{ // check visible TIMER
    return (this.authData.stage === 2
      || this.authData.stage === 3
      || this.authData.stage === 4
      || this.authData.stage === 5);
  }
  reSendCode(){
    this.authService.sendCode({
      lphone: `${this.prfixNumber}${this.loginForm.get('lphone').value}`,
      lcode: this.loginForm.get('lcode').value
    });
    this.runTimer(60);
  }


  hasError = (formName:string, controlName: string, errorName?: string) =>{ // Проверяем ошибки ввода
    if(formName === 'loginForm'){
      if(this.authData.stage === 3){
        this.loginForm.controls.lphone.setErrors({'back':true});
      }
      if(this.authData.stage === 4){
        this.loginForm.controls.lcode.setErrors({'back':true});
      }
      return this.loginForm.controls[controlName].hasError(errorName);
    }
    if(formName === 'registerForm'){
      if(this.authData.stage === 13){
        this.registerForm.controls.uphone.setErrors({'back':true});
      }
      if(this.authData.stage === 14 || this.authData.stage === 15){
        this.registerForm.controls.regCode.setErrors({'back':true});
        this.registerForm.controls.regCode.markAsUntouched();
      }
      return this.registerForm.controls[controlName].hasError(errorName);
    }
  };

  getErrorMessage = (controlName: string, errorName?: string) => { // словарь ошибок
    return this.authService.getErrorMessage(controlName, errorName);
  };

  onChangeNumberActiveSlide(sArrow:string){// смена экранов слайдера - клик по стрелочной навигации
    let cActiveSlide:number = this.slider.activeSlide;
    if(sArrow){
      if(sArrow === 'prev'){
        cActiveSlide--;
        if(cActiveSlide < 1){cActiveSlide = this.slider.countItems }
      } else {
        cActiveSlide++;
        if(cActiveSlide > this.slider.countItems){cActiveSlide = 1}
      }
    }
    this.changeNumberActiveSlide(cActiveSlide);
  }
  changeNumberActiveSlide(cNum){ this.slider.activeSlide = cNum; } //переключение экранов слайдера

  onChangeForm(iForm){ // переключение формы
    if(this.authData.stage !== 1 && this.authData.stage !== 11){ return; }
    this.tabForm = iForm;
    this.loginForm.reset();
    this.registerForm.reset();
    this.store.dispatch({type: AUTH_LOADER, payload: {isLoader: false}});
    if(iForm === 1){ this.store.dispatch({type: AUTH_SET_STAGE, payload: {stage: 1 }}); }
    if(iForm === 2){ this.store.dispatch({type: AUTH_SET_STAGE, payload: {stage: 11 }}); }
  }

  validatePhone(event){
    return this.validatorsService.checkPhone(event);
  }

  onCheckValidateButtonSubmit(isFullInfo?):boolean{
    // if(this.registerForm.touched){
      if(this.authData.stage === 11 || this.authData.stage === 13){
        if(this.registerForm.get('uphone').valid && this.registerForm.get('uphone').value){
          return  false;
        }
      } else{
        if(isFullInfo){
          if(
            (this.registerForm.get('regCode').valid && this.registerForm.get('regCode').value)
            && (this.registerForm.get('name').valid && this.registerForm.get('name').value)
            && (this.registerForm.get('surname').valid && this.registerForm.get('surname').value)
            && (this.registerForm.get('birthday').valid && this.registerForm.get('birthday').value)
            && (this.registerForm.get('sex').valid && this.registerForm.get('sex').value)
          ){
            return  false;
          }
        } else{
          if(this.registerForm.get('regCode').valid
            && this.registerForm.get('regCode').value
          ){
            return  false;
          }
        }
      }
    // }
    return true;
  }
  ngSubmitRegistrationEmpty(event):void{
    event.preventDefault();
    console.log('### ngSubmitRegistrationEmpty');
    // this.newPersonForm.get('sex').setValidators(Validators.required);
    this.registerForm.get('name').setValidators(null);
    this.registerForm.get('surname').setValidators(null);
    this.registerForm.get('birthday').setValidators(null);
    this.registerForm.get('sex').setValidators(null);
    this.registerForm.updateValueAndValidity();
    this.ngSubmitRegistration(true);
  }
  ngSubmitRegistration(isEmpty?:boolean):void{
    console.log('### ngSubmitRegistration', isEmpty, this.authData.stage);
    this.store.dispatch({type: AUTH_LOADER, payload: {isLoader: true}});
    this.registerForm.get('uphone').updateValueAndValidity();
    this.registerForm.get('regCode').updateValueAndValidity();

    let cForm:AuthQueryRegistrationInterface = {
      login: `${this.prfixNumber}${this.registerForm.get('uphone').value}`
    };

    switch (this.authData.stage) {
      case 11:
        this.authService.sendRegistrationCode(cForm);
        this.runTimerReg(60);
        return;
      case 12:
        cForm.code = this.registerForm.get('regCode').value;
        if(isEmpty){
          this.authService.sendRegistrationEmpty(cForm)
        } else{
          this.registerForm.get('name').setValidators(Validators.required);
          this.registerForm.get('surname').setValidators(Validators.required);
          this.registerForm.get('birthday').setValidators(Validators.required);
          this.registerForm.get('sex').setValidators(Validators.required);
          this.registerForm.get('name').updateValueAndValidity();
          this.registerForm.get('surname').updateValueAndValidity();
          this.registerForm.get('birthday').updateValueAndValidity();
          this.registerForm.get('sex').updateValueAndValidity();

          if(this.registerForm.valid){
            cForm.name = this.registerForm.get('name').value;
            cForm.surname = this.registerForm.get('surname').value;
            cForm.birthday = this.registerForm.get('birthday').value;
            cForm.sex = this.registerForm.get('sex').value;
            this.authService.sendRegistration(cForm)
          }
        }
        return;
      case 5:
        // this.sendLogin(cForm);
        break;
    }
  }
  getIsTimerRegistration():boolean{ // check visible TIMER
    return (this.authData.stage > 11);
  }
  resetTimerReg(){
    this.isTimerCountReg = false;
    this.timerCount = 60;
    clearInterval(this.timerSendCodeReg);
  }
  reSendCodeReg(){
    this.authService.sendRegistrationCode({
      login: `${this.prfixNumber}${this.registerForm.get('uphone').value}`
    });
    this.runTimerReg(60);
  }
  runTimerReg(timeSTart:number){

    this.isTimerCountReg = true;
    this.timerCount = timeSTart;

    this.registerForm.controls.regCode.enable();

    clearInterval(this.timerSendCodeReg);
    this.timerSendCodeReg = setInterval(()=>{
      this.timerCount--;
      if( this.timerCount < 1) {
        this.isTimerCountReg = false ;

        this.registerForm.controls.regCode.reset();
        this.registerForm.controls.regCode.setErrors(null);
        this.registerForm.controls.regCode.markAsUntouched();
        this.registerForm.controls.regCode.updateValueAndValidity();

        this.registerForm.controls.uphone.setErrors(null);
        this.registerForm.controls.uphone.updateValueAndValidity();


        if(this.authData.stage === 13){
          this.store.dispatch({type: AUTH_SET_DISABLED_CONTROL, payload: { disabledControl: {
                control: 'uphone',
                isDisable: false
              }
            }});
          this.store.dispatch({type: AUTH_SET_STAGE, payload: {stage: 11 }});
        }
        if(this.authData.stage === 14){
          this.store.dispatch({type: AUTH_SET_DISABLED_CONTROL, payload: { disabledControl: {
                control: 'regCode',
                isDisable: true
              }
            }});
          this.store.dispatch({type: AUTH_SET_STAGE, payload: {stage: 15 }});
        }

        this.timerCount = 0;
        this.resetTimerReg();
      }
    }, 1000);
  }
}
