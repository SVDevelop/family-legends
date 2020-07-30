import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PlacesService} from "../../services/places.service";
import { NewPlaceInterface} from "../../interfaces/app.interface";
import {map, mergeMap} from "rxjs/operators";
import {APP_SET_LOADER} from "../../store/app";

@Component({
  selector: 'app-new-place-form',
  templateUrl: './new-place-form.component.html',
  styleUrls: ['./new-place-form.component.scss']
})
export class NewPlaceFormComponent implements OnInit {
  newPlaceForm: FormGroup; // Place Create form
  imageUrl:string ='';
  fileUpload;
  constructor(
    private placesService:PlacesService,
    private router: Router,
    private store: Store<any>
  ) {}

  ngOnInit(): void {
    //fileds FORM
    // "address"?: string;
    // "attachment"?: string;
    // "lat"?: 30.31413,
    //   "long"?: 59.93863,
    //   "name": string;
    // "text"?: string;
    this.newPlaceForm = new FormGroup({
      attachment: new FormControl('', ),
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      address: new FormControl('', []),
      text: new FormControl('', []),
      file: new FormControl('', [])
    });
  }
  ngSubmit():void{
    if(this.newPlaceForm.invalid){
      console.info('Исправьте ошибки при заполнении формы !');
      return;
    }
    let cForm:NewPlaceInterface = {
      name: this.newPlaceForm.get('name').value,
    };
    if(this.newPlaceForm.get('address').value){ cForm.address = this.newPlaceForm.get('address').value; }
    if(this.newPlaceForm.get('text').value){ cForm.text = this.newPlaceForm.get('text').value; }

    if(this.newPlaceForm.get('file').value){
      this.placesService.saveNewPlaceFile(this.fileUpload).pipe(
        map( resp=>{ cForm.attachment = resp.id; return resp; }),
        mergeMap(resp => this.placesService.saveNewPlace(cForm))
      ).subscribe(resp=>{
        console.info('[INFO] Новое место создано успешно ...');
        this.clearFile();
        this.newPlaceForm.reset();
        this.store.dispatch({type: APP_SET_LOADER, payload: false});
        this.router.navigate(['places']);
      },err => { console.info('Исправьте ошибки при заполнении формы !') })
    } else{
      this.placesService.saveNewPlace(cForm).subscribe(resp=>{
        console.info('[INFO] Новое место создано успешно ...');
        this.clearFile();
        this.newPlaceForm.reset();
        this.store.dispatch({type: APP_SET_LOADER, payload: false});
        this.router.navigate(['places']);
      },err => { console.info('Исправьте ошибки при заполнении формы !') })
    }
  }

  checkValidFormDisable(){
    if(
      this.newPlaceForm.get('name').valid
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
    if(formName === 'newPlaceForm'){
      return this.newPlaceForm.controls[controlName].hasError(errorName);
    }
  };
  clearFile(){
    if( this.newPlaceForm.get('file').value){
      this.imageUrl='';
      this.newPlaceForm.get('file').reset();
    }
  }

  onFileChange(event){
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      // this.fileName = file.name;
      // this.file = file;
      this.fileUpload = file;
      this.fileUpload = file;
      if (!file.type.match('image.png')
        && !file.type.match('image.jpeg')
        && !file.type.match('image.x-png')) {
        this.newPlaceForm.get('file').setErrors({'back':true});
        return;
      }
      const reader = new FileReader();
      reader.onload = event => {
        this.imageUrl = reader.result as string;;
      };
      reader.readAsDataURL(file);
      // this.newPlaceForm.controls['file'].patchValue(file);
    }
  }
}
