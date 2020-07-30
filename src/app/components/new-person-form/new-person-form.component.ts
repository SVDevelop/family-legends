import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PersonsService} from "../../services/persons.service";
import {AppIdReturnInterface, DateInterface, NewPersonInterface} from "../../interfaces/app.interface";
import {catchError, map, mergeMap, switchMap} from "rxjs/operators";
import {forkJoin, of} from "rxjs";
import {APP_SET_LOADER} from "../../store/app";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-new-person-form',
  templateUrl: './new-person-form.component.html',
  styleUrls: ['./new-person-form.component.scss']
})
export class NewPersonFormComponent implements OnInit {
  newPersonForm: FormGroup; // Person Create form
  imageUrl:string ='';
  fileUpload;
  constructor(
    private personsService:PersonsService,
    private router: Router,
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    //fileds FORM
    this.newPersonForm = new FormGroup({
      attachment: new FormControl('', ),
      firstName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
      surName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
      deathDate: new FormControl('',[]),
      birthDate: new FormControl('', [Validators.required]),
      sex: new FormControl('', []),
      text: new FormControl('', [ Validators.maxLength(50)]),
      file: new FormControl('', [])
    });
  }
  ngSubmit():void{
    // console.log('###SUBMIT', this.newPersonForm);
    // "attachment": string;
    // "birth_date": DateInterface;
    // "death_date"?: DateInterface;
    // "first_name": string;
    // "id": string;
    // "phone": string;
    // "real_user": boolean;
    // "sex": number;
    // "surname"?: string;
    // "text": string;
    this.newPersonForm.get('sex').setValidators(Validators.required);
    this.newPersonForm.get('sex').updateValueAndValidity();
    if(this.newPersonForm.invalid){
      console.info('Исправьте ошибки при заполнении формы !');
      return;
    }

    let cForm:NewPersonInterface = {
      birth_date:{
        accuracy: 1,
        date: this.newPersonForm.get('birthDate').value
      },
      sex: parseInt(this.newPersonForm.get('sex').value, 10),
      text: this.newPersonForm.get('text').value,
      first_name: this.newPersonForm.get('firstName').value,
      surname: this.newPersonForm.get('surName').value,
      real_user: false
    };

    if(this.newPersonForm.get('deathDate').value){
      cForm.death_date = {
        accuracy: 1,
        date: this.newPersonForm.get('deathDate').value
      }
    }
    if(this.newPersonForm.get('file').value){
      this.personsService.saveNewPersonFile(this.fileUpload).pipe(
        map( resp=>{ cForm.attachment = resp.id; return resp; }),
        mergeMap(resp => this.personsService.saveNewPerson(cForm))
      ).subscribe(resp=>{
        console.info('[INFO] Новая персона создана успешно ...');
        this.clearFile();
        this.newPersonForm.reset();
        this.store.dispatch({type: APP_SET_LOADER, payload: false});
        this.router.navigate(['person']);
      },err => { console.info('Исправьте ошибки при заполнении формы !') })
    } else{
      this.personsService.saveNewPerson(cForm).subscribe(resp=>{
        console.info('[INFO] Новая персона создана успешно ...');
        this.clearFile();
        this.newPersonForm.reset();
        this.store.dispatch({type: APP_SET_LOADER, payload: false});
        this.router.navigate(['person']);
      },err => { console.info('Исправьте ошибки при заполнении формы !') })
    }
  }
  checkValidFormDisable(){
    if(
      this.newPersonForm.get('firstName').valid
      && this.newPersonForm.get('surName').valid
      && this.newPersonForm.get('birthDate').valid
      && this.newPersonForm.get('sex').valid
    ){
      return false;
    }
    return true;
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
    //   if(this.authData.stage === 4){
    //     this.loginForm.controls.lcode.setErrors({'back':true});
    //   }
    if(formName === 'newPersonForm'){
      return this.newPersonForm.controls[controlName].hasError(errorName);
    }
  };
  clearFile(){
    if( this.newPersonForm.get('file').value){
      this.imageUrl='';
      this.newPersonForm.get('file').reset();
    }
  }

  onFileChange(event){
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      // this.fileName = file.name;
      // this.file = file;
      this.fileUpload = file;
      if (!file.type.match('image.png')
        && !file.type.match('image.jpeg')
        && !file.type.match('image.x-png')) {
        this.newPersonForm.get('file').setErrors({'back':true});
        return;
      }
      const reader = new FileReader();
      reader.onload = event => {
        this.imageUrl = reader.result as string;;
      };
      reader.readAsDataURL(file);
      // this.newPersonForm.controls['file'].patchValue(file);
    }
  }
}
