import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {EventService} from "../../services/event.service";
import {AppService} from "../../services/app.service";
import {Router} from "@angular/router";
import {
  EventEditInterface,
  EventEditStoreInterface,
  AttachmentInterface, DateInterface
} from "../../interfaces/app.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {APP_SET_LOADER} from "../../store/app";
import {map, mergeMap} from "rxjs/operators";
import {EVENT_EDIT_SET_INFO__STATUS, EVENT_EDIT_SET_UPDATE_DETAIL} from "../../store/event";

@Component({
  selector: 'app-update-event-form',
  templateUrl: './update-event-form.component.html',
  styleUrls: ['./update-event-form.component.scss']
})
export class UpdateEventFormComponent implements OnInit {
  @Input('eventEdit') eventEdit:EventEditStoreInterface;
  subFormChanges$;
  isValidateRun:boolean = false;
  editEventForm: FormGroup;
  imageUrl:string ='';
  fileUpload;
  eventEditInner:EventEditInterface;
  isChanged:boolean = false;
  constructor(
    private store:Store,
    private eventService:EventService,
    private appService:AppService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.eventEditInner = JSON.parse(JSON.stringify(this.eventEdit));
    this.store.dispatch({type: EVENT_EDIT_SET_INFO__STATUS, payload: 2});
    // "attachment"?: AttachmentInterface;
    // "date_event"?: DateInterface,
    //   "name": string;
    // "text"?: string;
    // "id"?:string;
    this.editEventForm = new FormGroup({
      attachment: new FormControl('', ),
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      date_event: new FormControl('', []),
      text: new FormControl('', []),
      file: new FormControl('', [])
    });

    if(this.eventEdit.attachment){
      let cImage = this.appService.getAttachImage(this.eventEdit.attachment);
      if(cImage){
        this.imageUrl = cImage.url;
        this.editEventForm.get('attachment').setValue(cImage.file_id);
        this.eventEditInner.attachment = cImage.file_id;
      } else {
        this.eventEditInner.attachment = '';
      }
    };

    if(this.eventEdit.name){this.editEventForm.get('name').setValue(this.eventEdit.name)};
    if(this.eventEdit.date_event){this.editEventForm.get('date_event').setValue(new Date(this.eventEdit.date_event.date))}
    if(this.eventEdit.text){this.editEventForm.get('text').setValue(this.eventEdit.text)}
    this.subFormChanges$ = this.editEventForm.statusChanges.subscribe(resp=>this.onSetChangeForm());
  }
  ngSubmit():void{
    this.isValidateRun = true;
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    this.formDisabled(true);
    let cForm:EventEditInterface = {
      attachment: null,
      date_event: null,
      name: null,
      text: null,
      id:null
    };
    for(let fieldNameEvent in this.eventEditInner){
      if(fieldNameEvent === 'name'){ cForm.name = this.eventEditInner.name }
      if(fieldNameEvent === 'date_event'){ cForm.date_event = this.eventEditInner.date_event }
      if(fieldNameEvent === 'id'){ cForm.id = this.eventEditInner.id }
      if(fieldNameEvent === 'text'){ cForm.text = this.eventEditInner.text }

      if(fieldNameEvent === 'attachment'){ cForm.attachment = this.eventEditInner.attachment }
    }
    if(this.editEventForm.get('file').value){
      this.eventService.saveNewEventFile(this.fileUpload).pipe(
        map( resp=>{ cForm.attachment = resp.id; return resp; }),
        mergeMap(resp => this.eventService.updateEvent(cForm))
      ).subscribe(resp=>{
        console.info('[INFO] Событие отредактировано успешно ...');
        this.clearFile();
        this.editEventForm.reset();
        this.formDisabled(false);
        this.isValidateRun = false;
        this.store.dispatch({type: APP_SET_LOADER, payload: false});
        this.store.dispatch({type: EVENT_EDIT_SET_UPDATE_DETAIL, payload: true});

        this.router.navigate(['event', this.eventEdit.id]);
      },err => { console.info('Исправьте ошибки при заполнении формы !') })
    } else{
      this.eventService.updateEvent(cForm).subscribe(resp=>{
        console.info('[INFO] Событие отредактировано успешно ...');
        this.clearFile();
        this.editEventForm.reset();
        this.formDisabled(false);
        this.isValidateRun = false;
        this.store.dispatch({type: APP_SET_LOADER, payload: false});
        this.store.dispatch({type: EVENT_EDIT_SET_UPDATE_DETAIL, payload: true});
        this.router.navigate(['event',this.eventEdit.id]);
      },err => { console.info('Исправьте ошибки при заполнении формы !') })
    }
  }
  // TODO - общий метод, добавить передачу формы в параметр
  formDisabled(status){ // блокировка полей формы
    let controls = this.editEventForm.controls;
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
    this.eventEditInner.attachment = null;
    this.editEventForm.get('file').reset();
    this.editEventForm.get('attachment').reset();
  }
  updateImage(){ // сбрасываем поле с файлом
    this.imageUrl='';
    this.eventEditInner.attachment = null;
    this.editEventForm.get('file').reset();
    this.editEventForm.get('attachment').reset();
  }
  onFileChange(event){ // изменения картинки
    let cFile: File = null;
    cFile = (event.target as HTMLInputElement).files.item(0);
    if (cFile) {
      this.fileUpload = cFile;
      if (!cFile.type.match('image.png')
        && !cFile.type.match('image.jpeg')
        && !cFile.type.match('image.x-png')) {
        this.editEventForm.get('file').setErrors({'back':true});
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
      this.editEventForm.get('name').valid
      && this.editEventForm.touched
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
    if(formName === 'editEventForm'){
      return this.editEventForm.controls[controlName].hasError(errorName);
    }
  };
  onSetChangeForm(){ // форма изменилась
    this.isChanged = true;
    this.onSyncData();
    this.editEventForm.markAsTouched();
  }
  onSyncData(){ // синхронизация изменяемых полей в форме с хранящим объектом
    if(this.eventEditInner.name){
      if(this.eventEditInner.name !== this.editEventForm.get('name').value){
        this.eventEditInner.name = this.editEventForm.get('name').value
      }
    } else{
      if(this.editEventForm.get('name').value){
        this.eventEditInner.name = this.editEventForm.get('name').value;
      }
    }
    if(this.eventEditInner.date_event){
      if(this.eventEditInner.date_event.date !== this.editEventForm.get('date_event').value){
        this.eventEditInner.date_event.date = this.editEventForm.get('date_event').value
      }
    } else{
      if(this.editEventForm.get('date_event').value){
        this.eventEditInner.date_event= {
          accuracy : 1,
          date: this.editEventForm.get('date_event').value
        }
      }
    }
    if(this.eventEditInner.text){
      if(this.eventEditInner.text !== this.editEventForm.get('text').value){
        this.eventEditInner.text = this.editEventForm.get('text').value
      }
    } else{
      if(this.editEventForm.get('text').value){
        this.eventEditInner.text = this.editEventForm.get('text').value;
      }
    }
  }
}
