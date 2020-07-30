import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { EditFormPersonInterface, PersonEditStoreInterface} from "../../interfaces/app.interface";
import {Store} from "@ngrx/store";
import {APP_SET_LOADER} from "../../store/app";
import {PERSON_EDIT_SET_INFO__STATUS, PERSON_EDIT_SET_UPDATE_DETAIL} from "../../store/person";
import {AppService} from "../../services/app.service";
import {map, mergeMap} from "rxjs/operators";
import {PersonsService} from "../../services/persons.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-person-form',
  templateUrl: './update-person-form.component.html',
  styleUrls: ['./update-person-form.component.scss']
})
export class UpdatePersonFormComponent implements OnInit, OnDestroy {
  @Input('personEdit') personEdit:PersonEditStoreInterface;
  subFormChanges$;
  isValidateRun:boolean = false;
  editPersonForm: FormGroup; // Person Create form
  imageUrl:string ='';
  fileUpload;
  personEditInner:EditFormPersonInterface;
  isChanged:boolean = false;
  constructor(
    private store:Store,
    private personsService:PersonsService,
    private appService:AppService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.personEditInner = JSON.parse(JSON.stringify(this.personEdit));
    this.store.dispatch({type: PERSON_EDIT_SET_INFO__STATUS, payload: 2});
    this.editPersonForm = new FormGroup({
      attachment: new FormControl('', ),
      firstName: new FormControl('', [Validators.required, Validators.minLength(1)]),
      surName: new FormControl('', [Validators.required, Validators.minLength(1)]),
      deathDate: new FormControl('',[]),
      birthDate: new FormControl('', []),
      sex: new FormControl('', [Validators.required]),
      text: new FormControl('', []),
      file: new FormControl('', [])
    });
    this.editPersonForm.get('sex').clearValidators();
    this.editPersonForm.get('sex').updateValueAndValidity();

    if(this.personEdit.attachment){
      let cImage = this.appService.getAttachImage(this.personEdit.attachment);
      if(cImage){
        this.imageUrl = cImage.url;
        this.editPersonForm.get('attachment').setValue(cImage.file_id);
        this.personEditInner.attachment = cImage.file_id;
      } else {
        this.personEditInner.attachment = '';
      }
    };

    if(this.personEdit.first_name){this.editPersonForm.get('firstName').setValue(this.personEdit.first_name)};
    if(this.personEdit.surname){this.editPersonForm.get('surName').setValue(this.personEdit.surname)}
    if(this.personEdit.birth_date){ this.editPersonForm.get('birthDate').setValue(new Date(this.personEdit.birth_date.date)) }
    if(this.personEdit.death_date){this.editPersonForm.get('deathDate').setValue(new Date(this.personEdit.death_date.date)) }
    if(this.personEdit.sex || this.personEdit.sex === 0){
      this.editPersonForm.get('sex').setValue(this.personEdit.sex)
    }
    if(this.personEdit.text){this.editPersonForm.get('text').setValue(this.personEdit.text)}
    this.subFormChanges$ = this.editPersonForm.statusChanges.subscribe(resp=>this.onSetChangeForm());
  }
  ngOnDestroy(): void {
    this.subFormChanges$.unsubscribe();
  }

  ngSubmit():void{
    this.isValidateRun = true;
    this.editPersonForm.get('sex').setValidators([Validators.required]);
    this.editPersonForm.get('sex').updateValueAndValidity();
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    this.formDisabled(true);

    let cForm:EditFormPersonInterface = {
      birth_date: null,
      death_date: null,
      first_name: null,
      id: null,
      real_user: null,
      sex: null,
      surname: null,
      text: null
    };
    for(let fieldName in this.personEditInner){
      if(fieldName === 'birth_date'){ cForm.birth_date = this.personEditInner.birth_date }
      if(fieldName === 'death_date'){ cForm.death_date = this.personEditInner.death_date }
      if(fieldName === 'first_name'){ cForm.first_name = this.personEditInner.first_name }
      if(fieldName === 'id'){ cForm.id = this.personEditInner.id }
      if(fieldName === 'real_user'){ cForm.real_user = this.personEditInner.real_user }
      if(fieldName === 'phone' && this.personEditInner.phone){ cForm.phone = this.personEditInner.phone }
      if(fieldName === 'sex'){ cForm.sex = this.personEditInner.sex }
      if(fieldName === 'surname'){ cForm.surname = this.personEditInner.surname }
      if(fieldName === 'text'){ cForm.text = this.personEditInner.text }

      if(fieldName === 'attachment'){ cForm.attachment = this.personEditInner.attachment }
    }

    if(this.editPersonForm.get('file').value){
      this.personsService.saveNewPersonFile(this.fileUpload).pipe(
        map( resp=>{ cForm.attachment = resp.id; return resp; }),
        mergeMap(resp => this.personsService.updatePerson(cForm))
      ).subscribe(resp=>{
        console.info('[INFO] Персона отредактирована успешно ...');
        this.clearFile();
        this.editPersonForm.reset();
        this.formDisabled(false);
        this.isValidateRun = false;
        this.store.dispatch({type: APP_SET_LOADER, payload: false});
        this.store.dispatch({type: PERSON_EDIT_SET_UPDATE_DETAIL, payload: true});

        this.router.navigate(['person', this.personEdit.id]);
      },err => { console.info('Исправьте ошибки при заполнении формы !') })
    } else{
      this.personsService.updatePerson(cForm).subscribe(resp=>{
        console.info('[INFO] Персона отредактирована успешно ...');
        this.clearFile();
        this.editPersonForm.reset();
        this.formDisabled(false);
        this.isValidateRun = false;
        this.store.dispatch({type: APP_SET_LOADER, payload: false});
        this.store.dispatch({type: PERSON_EDIT_SET_UPDATE_DETAIL, payload: true});
        this.router.navigate(['person',this.personEdit.id]);
      },err => { console.info('Исправьте ошибки при заполнении формы !') })
    }

    // setTimeout(()=>{
    //   if(this.editPersonForm.invalid){
    //   }
    //   this.store.dispatch({type: APP_SET_LOADER, payload: false});
    // },2000);
  }

  getErrorMessage(sField, sTypeError){
    let cErrorMsg:string;
    switch (sTypeError) {
      case 'required':
        if(sField === 'gender'){
          cErrorMsg = 'Необходимо выбрать';
        } else{
          cErrorMsg = 'Необходимо заполнить';
        }
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
    if(formName === 'editPersonForm'){
      return this.editPersonForm.controls[controlName].hasError(errorName);
    }
  };
  clearFile(){ // сбрасываем поле с файлом
      this.imageUrl='';
      this.personEditInner.attachment = null;
      this.editPersonForm.get('file').reset();
      this.editPersonForm.get('attachment').reset();
  }
  onFileChange(event){ // изменения картинки
    let cFile: File = null;
    cFile = (event.target as HTMLInputElement).files.item(0);
    if (cFile) {
      this.fileUpload = cFile;
      if (!cFile.type.match('image.png')
        && !cFile.type.match('image.jpeg')
        && !cFile.type.match('image.x-png')) {
        this.editPersonForm.get('file').setErrors({'back':true});
        return;
      }

      const reader = new FileReader();
      reader.onload = event => {
        this.imageUrl = reader.result as string;;
      };
      reader.readAsDataURL(cFile);
    }
  }
  checkValidFormDisable(){ // блокировка кнопки "сохранить"
    if(
      this.editPersonForm.get('firstName').valid
      && this.editPersonForm.get('surName').valid
      && this.editPersonForm.get('birthDate').valid
      && this.editPersonForm.get('sex').valid
      && this.editPersonForm.touched
      && this.isChanged
    ){ return false; }
    return true;
  }
  formDisabled(status){ // блокировка полей формы
    let controls = this.editPersonForm.controls;
    if(status){
      Object.keys(controls)
        .forEach(controlName => controls[controlName].disable());
      /** Прерываем выполнение метода*/
      return;
    } else{
      Object.keys(controls)
        .forEach(controlName => controls[controlName].enable());
      /** Прерываем выполнение метода*/
      return;
    }
  }
  onSetChangeForm(){ // форма изменилась
    this.isChanged = true;
    this.onSyncData();
    this.editPersonForm.markAsTouched();
  }
  onSyncData(){ // синхронизация изменяемых полей в форме с хранящим объектом
    if(this.personEditInner.first_name){
      if(this.personEditInner.first_name !== this.editPersonForm.get('firstName').value){
        this.personEditInner.first_name = this.editPersonForm.get('firstName').value
      }
    } else{
      if(this.editPersonForm.get('firstName').value){
        this.personEditInner.first_name = this.editPersonForm.get('firstName').value;
      }
    }
    if(this.personEditInner.surname){
      if(this.personEditInner.surname !== this.editPersonForm.get('surName').value){
        this.personEditInner.surname = this.editPersonForm.get('surName').value
      }
    } else{
      if(this.editPersonForm.get('surName').value){
        this.personEditInner.surname = this.editPersonForm.get('surName').value;
      }
    }
    if(this.personEditInner.death_date){
      if(this.personEditInner.death_date.date !== this.editPersonForm.get('deathDate').value){
        this.personEditInner.death_date.date = this.editPersonForm.get('deathDate').value
      }
    } else{
      if(this.editPersonForm.get('deathDate').value){
        this.personEditInner.death_date= {
          accuracy : 1,
          date: this.editPersonForm.get('deathDate').value
        }
      }
    }

    if(this.personEditInner.birth_date){
      if(this.personEditInner.birth_date.date !== this.editPersonForm.get('birthDate').value){
        this.personEditInner.birth_date.date = this.editPersonForm.get('birthDate').value
      }
    } else{
      if(this.editPersonForm.get('birthDate').value){
        this.personEditInner.birth_date= {
          accuracy: 1,
          date: this.editPersonForm.get('birthDate').value
        }
      }
    }
    if(this.personEditInner.sex){
      if(this.personEditInner.sex !== this.editPersonForm.get('sex').value){
        this.personEditInner.sex = this.editPersonForm.get('sex').value
      }
    } else{
      if(this.editPersonForm.get('sex').value){
        this.personEditInner.sex = this.editPersonForm.get('sex').value;
      }
    }
    if(this.personEditInner.text){
      if(this.personEditInner.text !== this.editPersonForm.get('text').value){
        this.personEditInner.text = this.editPersonForm.get('text').value
      }
    } else{
      if(this.editPersonForm.get('text').value){
        this.personEditInner.text = this.editPersonForm.get('text').value;
      }
    }
  }
}
