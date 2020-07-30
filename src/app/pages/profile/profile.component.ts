import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidatorsService} from "../../services/validators.service";
import {AppService} from "../../services/app.service";
import {AppStoreInterface, NewPersonInterface, ProfileEditInterface} from "../../interfaces/app.interface";
import {map, mergeMap} from "rxjs/operators";
import {
  APP_GET_PROFILE_INFO,
  APP_SET_LOADER,
  APP_UPDATE_PROFILE_INFO,
  APP_USER_SET_INFO_INIT,
  AppAction
} from "../../store/app";
import {ActionsSubject, Store} from "@ngrx/store";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  prfixNumber:string;
  profileEdit: FormGroup; // Profile edit form
  imageUrl:string ='';
  fileUpload;

  profileEditInner;
  subFormChanges$;
  prodileUpdate$;

  constructor(
    private validatorsService:ValidatorsService,
    private appService:AppService,
    private router: Router,
    private store:Store,
    private actionsSubject: ActionsSubject
  ) { }

  ngOnInit(): void {
    // const appData:AppStoreInterface = this.appService.getAppData();

    this.prfixNumber = '+7';
    this.profileEdit = new FormGroup({
      attachment: new FormControl('', ),
      firstName: new FormControl('', [Validators.required, Validators.minLength(1)]),
      surName: new FormControl('', [Validators.required, Validators.minLength(1)]),
      birthDate: new FormControl('', [Validators.required]),
      phone: new FormControl('', []),
      sex: new FormControl('', []),
      text: new FormControl('', []),
      file: new FormControl('', [])
    });
    this.updateData();
      // if(appData.profilePerson){
      //   this.profileEditInner = JSON.parse(JSON.stringify(appData.profilePerson));
      //   if(this.profileEditInner.attachment){
      //     let cImage = this.appService.getAttachImage(this.profileEditInner.attachment);
      //     if(cImage){
      //       this.imageUrl = cImage.url;
      //       this.profileEdit.get('attachment').setValue(cImage.file_id);
      //       this.profileEditInner.attachment = cImage.file_id;
      //     } else {
      //       this.profileEditInner.attachment = null;
      //     }
      //   }
      //   if(appData.profilePerson.first_name){this.profileEdit.get('firstName').setValue(appData.profilePerson.first_name)}
      //   if(appData.profilePerson.surname){this.profileEdit.get('surName').setValue(appData.profilePerson.surname)}
      //   if(appData.profilePerson.phone){this.profileEdit.get('phone').setValue(appData.profilePerson.phone.replace('+7',''))}
      //   if(appData.profilePerson.text){this.profileEdit.get('text').setValue(appData.profilePerson.text)}
      //   if(appData.profilePerson.sex || appData.profilePerson.sex === 0){this.profileEdit.get('sex').setValue(appData.profilePerson.sex)}
      //   if(appData.profilePerson.birth_date){this.profileEdit.get('birthDate').setValue(new Date(appData.profilePerson.birth_date.date))}
      // }



    this.subFormChanges$ = this.profileEdit.statusChanges.subscribe(resp=>this.onSetChangeForm());

    this.prodileUpdate$ = this.actionsSubject.subscribe((action: AppAction) => {
      if (action.type === APP_UPDATE_PROFILE_INFO) {
        this.updateData();
      }
    })
  }
  ngOnDestroy():void{
    this.subFormChanges$.unsubscribe();
  }
  ngSubmit():void{
    this.profileEdit.get('sex').setValidators(Validators.required);
    this.profileEdit.get('sex').updateValueAndValidity();

    // if(this.profileEdit.get('file').value){
    //   this.clearFile();
    // }


    if(this.profileEdit.invalid){
      console.info('Исправьте ошибки при заполнении формы !');
      return;
    }

    let cForm:ProfileEditInterface = {
      birth_date:{
        accuracy: 1,
        date: this.profileEdit.get('birthDate').value
      },
      sex: this.profileEdit.get('sex').value,
      text: this.profileEdit.get('text').value,
      first_name: this.profileEdit.get('firstName').value,
      surname: this.profileEdit.get('surName').value,
      id: this.profileEditInner.id,
    };
    for(let fieldName in this.profileEditInner){
      if(fieldName === 'birth_date'){ cForm.birth_date = this.profileEditInner.birth_date }
      if(fieldName === 'death_date'){ cForm.death_date = this.profileEditInner.death_date }
      if(fieldName === 'first_name'){ cForm.first_name = this.profileEditInner.first_name }
      if(fieldName === 'id'){ cForm.id = this.profileEditInner.id }
      if(fieldName === 'real_user'){ cForm.real_user = this.profileEditInner.real_user }
      if(fieldName === 'phone' && this.profileEditInner.phone){ cForm.phone = this.profileEditInner.phone }
      if(fieldName === 'sex'){ cForm.sex = this.profileEditInner.sex }
      if(fieldName === 'surname'){ cForm.surname = this.profileEditInner.surname }
      if(fieldName === 'text'){ cForm.text = this.profileEditInner.text }

      if(fieldName === 'attachment'){ cForm.attachment = this.profileEditInner.attachment }
    }
    if(this.profileEdit.get('file').value){
      this.appService.saveNewFile(this.fileUpload).pipe(
        map( resp=>{ cForm.attachment = resp.id; return resp; }),
        mergeMap(resp => this.appService.updateProfile(cForm))
      ).subscribe(resp=>{
        console.info('[INFO] Профиль отредактирован успешно ...');
        this.profileEdit.markAsUntouched();
        this.store.dispatch({type: APP_GET_PROFILE_INFO})
        // this.router.navigate(['/']);
      },err => { console.info('Исправьте ошибки при заполнении формы !') })
    } else{
      this.appService.updateProfile(cForm).subscribe(resp=>{
        console.info('[INFO]  Профиль отредактирован успешно ...');
        this.profileEdit.markAsUntouched();
        this.store.dispatch({type: APP_GET_PROFILE_INFO});
        // this.router.navigate(['/']);

      },err => { console.info('Исправьте ошибки при заполнении формы !') })
    }
  }
  checkValidFormDisable(){
    if(
      this.profileEdit.get('firstName').valid
      && this.profileEdit.get('surName').valid
      && this.profileEdit.get('birthDate').valid
      && this.profileEdit.get('sex').valid
      && this.profileEdit.touched
    ){
      return false;
    }
    return true;
  }
  getErrorMessage(sField, sTypeError){
    let cErrorMsg:string;
    switch (sTypeError) {
      case 'required':
        break;
      case 'invalid':
        cErrorMsg = 'Некорректная запись';
        break;
      case 'back':
        cErrorMsg = 'Некорректный формат записи';
        break;
    }
    return cErrorMsg;
  }
  hasError = (formName:string, controlName: string, errorName?: string) =>{ // Проверяем ошибки ввода
    if(formName === 'profileEdit'){
      if(this.profileEdit.controls[controlName]){
        return this.profileEdit.controls[controlName].hasError(errorName);
      }
      return true;
    }
  };
  clearFile(){
    this.imageUrl='';
    this.profileEditInner.attachment = null;
    this.profileEdit.get('file').reset();
    this.profileEdit.get('attachment').reset();
  }
  validatePhone(event){
    return this.validatorsService.checkPhone(event);
  }
  onFileChange(event){ // изменения картинки
    let cFile: File = null;
    cFile = (event.target as HTMLInputElement).files.item(0);
    if (cFile) {
      this.fileUpload = cFile;
      if (!cFile.type.match('image.png')
        && !cFile.type.match('image.jpeg')
        && !cFile.type.match('image.x-png')) {
        this.profileEdit.get('file').setErrors({'back':true});
        return;
      }

      const reader = new FileReader();
      reader.onload = event => {
        this.imageUrl = reader.result as string;;
      };
      reader.readAsDataURL(cFile);
    }
  }
  onSetChangeForm(){ // форма изменилась
    this.onSyncData();
    this.profileEdit.markAsTouched();
  }
  onSyncData(){ // синхронизация изменяемых полей в форме с хранящим объектом
    if(this.profileEditInner.first_name){
      if(this.profileEditInner.first_name !== this.profileEdit.get('firstName').value){
        this.profileEditInner.first_name = this.profileEdit.get('firstName').value
      }
    } else{
      if(this.profileEdit.get('firstName').value){
        this.profileEditInner.first_name = this.profileEdit.get('firstName').value;
      }
    }
    if(this.profileEditInner.surname){
      if(this.profileEditInner.surname !== this.profileEdit.get('surName').value){
        this.profileEditInner.surname = this.profileEdit.get('surName').value
      }
    } else{
      if(this.profileEdit.get('surName').value){
        this.profileEditInner.surname = this.profileEdit.get('surName').value;
      }
    }

    if(this.profileEditInner.birth_date){
      if(this.profileEditInner.birth_date.date !== this.profileEdit.get('birthDate').value){
        this.profileEditInner.birth_date.date = this.profileEdit.get('birthDate').value
      }
    } else{
      if(this.profileEdit.get('birthDate').value){
        this.profileEditInner.birth_date= {
          accuracy: 1,
          date: this.profileEdit.get('birthDate').value
        }
      }
    }
    if(this.profileEditInner.sex){
      if(this.profileEditInner.sex !== this.profileEdit.get('sex').value){
        this.profileEditInner.sex = this.profileEdit.get('sex').value
      }
    } else{
      if(this.profileEdit.get('sex').value){
        this.profileEditInner.sex = this.profileEdit.get('sex').value;
      }
    }
    if(this.profileEditInner.text){
      if(this.profileEditInner.text !== this.profileEdit.get('text').value){
        this.profileEditInner.text = this.profileEdit.get('text').value
      }
    } else{
      if(this.profileEdit.get('text').value){
        this.profileEditInner.text = this.profileEdit.get('text').value;
      }
    }
  }
  updateData(){
    const appData:AppStoreInterface = this.appService.getAppData();
    if(appData.profilePerson){
      this.profileEditInner = JSON.parse(JSON.stringify(appData.profilePerson));
      if(this.profileEditInner.attachment){
        let cImage = this.appService.getAttachImage(this.profileEditInner.attachment);
        if(cImage){
          this.imageUrl = cImage.url;
          this.profileEdit.get('attachment').setValue(cImage.file_id);
          this.profileEditInner.attachment = cImage.file_id;
        } else {
          this.profileEditInner.attachment = null;
        }
      }
      if(appData.profilePerson.first_name){this.profileEdit.get('firstName').setValue(appData.profilePerson.first_name)}
      if(appData.profilePerson.surname){this.profileEdit.get('surName').setValue(appData.profilePerson.surname)}
      if(appData.profilePerson.phone){this.profileEdit.get('phone').setValue(appData.profilePerson.phone.replace('+7',''))}
      if(appData.profilePerson.text){this.profileEdit.get('text').setValue(appData.profilePerson.text)}
      if(appData.profilePerson.sex || appData.profilePerson.sex === 0){this.profileEdit.get('sex').setValue(appData.profilePerson.sex)}
      if(appData.profilePerson.birth_date){this.profileEdit.get('birthDate').setValue(new Date(appData.profilePerson.birth_date.date))}
    }
  }
}
