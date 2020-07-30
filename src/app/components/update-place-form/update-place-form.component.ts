import {Component, Input, OnInit} from '@angular/core';
import { PlaceEditInterface, PlaceEditStoreInterface} from "../../interfaces/app.interface";
import {Store} from "@ngrx/store";
import {AppService} from "../../services/app.service";
import {Router} from "@angular/router";
import {PlacesService} from "../../services/places.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PLACE_EDIT_SET_INFO__STATUS, PLACE_EDIT_SET_UPDATE_DETAIL} from "../../store/place";
import {APP_SET_LOADER} from "../../store/app";
import {map, mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-update-place-form',
  templateUrl: './update-place-form.component.html',
  styleUrls: ['./update-place-form.component.scss']
})
export class UpdatePlaceFormComponent implements OnInit {
  @Input('placeEdit') placeEdit:PlaceEditStoreInterface;
  subFormChanges$;
  isValidateRun:boolean = false;
  editPlaceForm: FormGroup;
  imageUrl:string ='';
  fileUpload;
  placeEditInner:PlaceEditInterface;
  isChanged:boolean = false;
  constructor(
    private store:Store,
    private placesService:PlacesService,
    private appService:AppService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.placeEditInner = JSON.parse(JSON.stringify(this.placeEdit));
    this.store.dispatch({type: PLACE_EDIT_SET_INFO__STATUS, payload: 2});
    this.editPlaceForm = new FormGroup({
      attachment: new FormControl('', ),
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      address: new FormControl('', []),
      text: new FormControl('', []),
      file: new FormControl('', [])
    });

    if(this.placeEdit.attachment){
      let cImage = this.appService.getAttachImage(this.placeEdit.attachment);
      if(cImage){
        this.imageUrl = cImage.url;
        this.editPlaceForm.get('attachment').setValue(cImage.file_id);
        this.placeEditInner.attachment = cImage.file_id;
      } else {
        this.placeEditInner.attachment = '';
      }
    };

    if(this.placeEdit.name){this.editPlaceForm.get('name').setValue(this.placeEdit.name)};
    if(this.placeEdit.address){this.editPlaceForm.get('address').setValue(this.placeEdit.address)}
    if(this.placeEdit.text){this.editPlaceForm.get('text').setValue(this.placeEdit.text)}
    this.subFormChanges$ = this.editPlaceForm.statusChanges.subscribe(resp=>this.onSetChangeForm());
  }
  ngSubmit():void{
    this.isValidateRun = true;
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    this.formDisabled(true);
    let cForm:PlaceEditInterface = {
      address: null,
      attachment: null,
      lat: null,
      long: null,
      name: null,
      text: null,
      id:null
    };
    for(let fieldNamePlace in this.placeEditInner){
      if(fieldNamePlace === 'name'){ cForm.name = this.placeEditInner.name }
      if(fieldNamePlace === 'address'){ cForm.address = this.placeEditInner.address }
      if(fieldNamePlace === 'lat'){ cForm.lat = this.placeEditInner.lat }
      if(fieldNamePlace === 'id'){ cForm.id = this.placeEditInner.id }
      if(fieldNamePlace === 'long'){ cForm.long = this.placeEditInner.long }
      if(fieldNamePlace === 'text'){ cForm.text = this.placeEditInner.text }

      if(fieldNamePlace === 'attachment'){ cForm.attachment = this.placeEditInner.attachment }
    }
    if(this.editPlaceForm.get('file').value){
      this.placesService.saveNewPlaceFile(this.fileUpload).pipe(
        map( resp=>{ cForm.attachment = resp.id; return resp; }),
        mergeMap(resp => this.placesService.updatePlace(cForm))
      ).subscribe(resp=>{
        console.info('[INFO] Место отредактировано успешно ...');
        this.clearFile();
        this.editPlaceForm.reset();
        this.formDisabled(false);
        this.isValidateRun = false;
        this.store.dispatch({type: APP_SET_LOADER, payload: false});
        this.store.dispatch({type: PLACE_EDIT_SET_UPDATE_DETAIL, payload: true});

        this.router.navigate(['places', this.placeEdit.id]);
      },err => { console.info('Исправьте ошибки при заполнении формы !') })
    } else{
      this.placesService.updatePlace(cForm).subscribe(resp=>{
      console.info('[INFO] Место отредактировано успешно ...');
      this.clearFile();
      this.editPlaceForm.reset();
      this.formDisabled(false);
      this.isValidateRun = false;
      this.store.dispatch({type: APP_SET_LOADER, payload: false});
      this.store.dispatch({type: PLACE_EDIT_SET_UPDATE_DETAIL, payload: true});
      this.router.navigate(['places',this.placeEdit.id]);
      },err => { console.info('Исправьте ошибки при заполнении формы !') })
    }
  }
  // TODO - общий метод, добавить передачу формы в параметр
  formDisabled(status){ // блокировка полей формы
    let controls = this.editPlaceForm.controls;
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
  // TODO - END
  clearFile(){ // сбрасываем поле с файлом
    this.imageUrl='';
    this.placeEditInner.attachment = null;
    this.editPlaceForm.get('file').reset();
    this.editPlaceForm.get('attachment').reset();
  }
  onFileChange(event){ // изменения картинки
    let cFile: File = null;
    cFile = (event.target as HTMLInputElement).files.item(0);
    if (cFile) {
      this.fileUpload = cFile;
      if (!cFile.type.match('image.png')
        && !cFile.type.match('image.jpeg')
        && !cFile.type.match('image.x-png')) {
        this.editPlaceForm.get('file').setErrors({'back':true});
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
      this.editPlaceForm.get('name').valid
      && this.editPlaceForm.touched
      && this.isChanged
    ){ return false; }
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
    if(formName === 'editPlaceForm'){
      return this.editPlaceForm.controls[controlName].hasError(errorName);
    }
  };
  onSetChangeForm(){ // форма изменилась
    this.isChanged = true;
    this.onSyncData();
    this.editPlaceForm.markAsTouched();
  }
  onSyncData(){ // синхронизация изменяемых полей в форме с хранящим объектом
    if(this.placeEditInner.name){
      if(this.placeEditInner.name !== this.editPlaceForm.get('name').value){
        this.placeEditInner.name = this.editPlaceForm.get('name').value
      }
    } else{
      if(this.editPlaceForm.get('name').value){
        this.placeEditInner.name = this.editPlaceForm.get('name').value;
      }
    }
    if(this.placeEditInner.address){
      if(this.placeEditInner.address !== this.editPlaceForm.get('address').value){
        this.placeEditInner.address = this.editPlaceForm.get('address').value
      }
    } else{
      if(this.editPlaceForm.get('address').value){
        this.placeEditInner.address = this.editPlaceForm.get('address').value;
      }
    }
    if(this.placeEditInner.text){
      if(this.placeEditInner.text !== this.editPlaceForm.get('text').value){
        this.placeEditInner.text = this.editPlaceForm.get('text').value
      }
    } else{
      if(this.editPlaceForm.get('text').value){
        this.placeEditInner.text = this.editPlaceForm.get('text').value;
      }
    }
  }

}
