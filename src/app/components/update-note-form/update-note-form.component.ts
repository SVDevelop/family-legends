import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppService} from "../../services/app.service";
import {Router} from "@angular/router";
import {FeedService} from "../../services/feed.service";
import {NOTE_EDIT_SET_INFO__STATUS, NOTE_EDIT_SET_UPDATE_DETAIL} from "../../store/note";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  aNewFilesInterface,
  NoteBaseInterface,
  NoteEditInterface,
  NoteEditStoreInterface
} from "../../interfaces/app.interface";
import {APP_SET_LOADER} from "../../store/app";
import {map, mergeMap} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-update-note-form',
  templateUrl: './update-note-form.component.html',
  styleUrls: ['./update-note-form.component.scss']
})
export class UpdateNoteFormComponent implements OnInit {
  @Input('noteEdit') noteEdit:NoteEditStoreInterface;
  subFormChanges$;
  isValidateRun:boolean = false;
  editNoteForm: FormGroup;
  noteEditInner:NoteBaseInterface;
  isChanged:boolean = false;

  aNewImages:aNewFilesInterface[] = [];
  isImagesChange:boolean = false;
  nFileCount:number = 0;

  constructor(
    private store:Store,
    private feedService:FeedService,
    private appService:AppService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.noteEditInner = JSON.parse(JSON.stringify(this.noteEdit));
    this.store.dispatch({type: NOTE_EDIT_SET_INFO__STATUS, payload: 2});
    this.editNoteForm = new FormGroup({
      attachments: new FormControl('', ),
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      address: new FormControl('', []),
      text: new FormControl('', []),
      file: new FormControl('', [])
    });

    if(this.noteEdit.attachments){
      let cImages = this.appService.getAttachImages(this.noteEdit.attachments);
      if(cImages.length){
        let cIds = [];
        cImages.forEach(attach=>{
          this.aNewImages.push({
            id: attach.file_id,
            previewUrl: attach.url
          });
          cIds.push(attach.file_id);
        });
        this.editNoteForm.get('attachments').setValue(cIds);
      } else {
        this.noteEditInner.attachments = null;
      }
    };

    if(this.noteEdit.text){this.editNoteForm.get('text').setValue(this.noteEdit.text)}
    this.subFormChanges$ = this.editNoteForm.statusChanges.subscribe(resp=>this.onSetChangeForm());
  }
  ngSubmit():void{
    this.isValidateRun = true;
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    this.formDisabled(true);
    let cForm:NoteEditInterface = {
      text: null,
      attachments: null,
      id: null
    };
    for(let fieldNameNote in this.noteEditInner){
      if(fieldNameNote === 'text'){ cForm.text = this.noteEditInner.text }
      if(fieldNameNote === 'id'){ cForm.id = this.noteEditInner.id }

      if(fieldNameNote === 'attachments' &&  this.noteEditInner.attachments){
        cForm.attachments=[];
        this.noteEditInner.attachments.forEach(item=>{ if(item.file_id){cForm.attachments.push(item.file_id)} });
      }

      if(fieldNameNote === 'persons' && this.noteEditInner.persons){
        cForm.person=[];
        for(let person of this.noteEditInner.persons){ if(person.id){cForm.person.push(person.id)}}
      }
      if(fieldNameNote === 'events' && this.noteEditInner.events){
        cForm.event=[];
        for(let event of this.noteEditInner.events){ if(event.id){cForm.event.push(event.id)}}
      }
      if(fieldNameNote === 'places' && this.noteEditInner.places){
        cForm.place=[];
        for(let place of this.noteEditInner.places){ if(place.id){cForm.place.push(place.id)}}
      }
    }

    const aNewImg = Object.assign([], this.aNewImages).filter((item) => item.file); // загруженные изображения
    if(this.isImagesChange && aNewImg.length){
      this.feedService.uploadImages(aNewImg).pipe(
        map( resp=>{
          if(!cForm.attachments) { cForm.attachments = [] }
          resp.forEach(item=> cForm.attachments.push(item.id));
          return resp;
        }),
        mergeMap(item => this.feedService.updateNote(cForm))
      ).subscribe(resp=>{
        console.info('[INFO] Запись отредактирована успешно ...');
        this.clearFile();
        this.formDisabled(false);
        this.isValidateRun = false;
        this.store.dispatch({type: APP_SET_LOADER, payload: false});
        this.store.dispatch({type: NOTE_EDIT_SET_UPDATE_DETAIL, payload: true});
        ;
        this.router.navigate(['feed',this.noteEdit.id]);
      },err => { console.info('[INFO] Запись отредактирована успешно ...'); });
    } else {
      this.feedService.updateNote(cForm).subscribe(resp=>{
        console.info('[INFO] Запись отредактирована успешно ...');
        this.clearFile();
        this.editNoteForm.reset();
        this.formDisabled(false);
        this.isValidateRun = false;
        this.store.dispatch({type: APP_SET_LOADER, payload: false});
        this.store.dispatch({type: NOTE_EDIT_SET_UPDATE_DETAIL, payload: true});
        this.router.navigate(['feed',this.noteEdit.id]);
      },err => { console.info('Исправьте ошибки при заполнении формы !') })
    }
  }
  formDisabled(status){ // блокировка полей формы
    let controls = this.editNoteForm.controls;
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
    this.noteEditInner.attachments = null;
    this.editNoteForm.get('file').reset();
    this.editNoteForm.get('attachments').reset();
    this.isImagesChange = false;
  }
  onFileChange(event){ // изменения картинки
    const file = (event.target as HTMLInputElement).files.item(0);

    if (file) {
      if (!file.type.match('image.png')
        && !file.type.match('image.jpeg')
        && !file.type.match('image.x-png')) {
        this.editNoteForm.get('file').setErrors({'back':true});
        return;
      }

      const reader = new FileReader();
      reader.onload = event => {
        let imageUrl = reader.result as string;
        this.aNewImages.push({
          id: this.nFileCount.toString(),
          file: file,
          previewUrl: imageUrl
        });
        this.editNoteForm.get('file').reset();
        this.nFileCount++;
        this.isImagesChange = true;
        this.editNoteForm.markAsTouched();
        this.editNoteForm.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    }
  }
  checkValidFormDisable(){ // блокировка кнопки "сохранить"
    if(
      (this.editNoteForm.get('text').value
      ||(this.noteEditInner.attachments || this.aNewImages))
      && this.editNoteForm.touched
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
    if(formName === 'editNoteForm'){
      return this.editNoteForm.controls[controlName].hasError(errorName);
    }
  };
  onSetChangeForm(){ // форма изменилась
    this.isChanged = true;
    this.onSyncData();
    this.editNoteForm.markAsTouched();
  }
  onSyncData(){ // синхронизация изменяемых полей в форме с хранящим объектом
    if(this.noteEditInner.text){
      if(this.noteEditInner.text !== this.editNoteForm.get('text').value){
        this.noteEditInner.text = this.editNoteForm.get('text').value
      }
    } else{
      if(this.editNoteForm.get('text').value){
        this.noteEditInner.text = this.editNoteForm.get('text').value;
      }
    }
  }
  deleteFileByNewImages(cId:string){
    this.aNewImages = Object.assign([], this.aNewImages).filter((item) => item.id !== cId);
    this.noteEditInner.attachments  = Object.assign([], this.noteEditInner.attachments).filter((item) => item.file_id !== cId);
    this.isImagesChange = true;
    this.editNoteForm.markAsTouched();
    this.editNoteForm.updateValueAndValidity();
  }
}
