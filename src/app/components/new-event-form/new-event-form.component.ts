import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { NewEventInterface } from "../../interfaces/app.interface";
import {map, mergeMap} from "rxjs/operators";
import {APP_SET_LOADER} from "../../store/app";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-new-event-form',
  templateUrl: './new-event-form.component.html',
  styleUrls: ['./new-event-form.component.scss']
})
export class NewEventFormComponent implements OnInit {
  newEventForm: FormGroup; // EVENT Create form
  imageUrl:string ='';
  fileUpload;
  constructor(
    private eventService:EventService,
    private router: Router,
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    // "attachment"?: string;
    // "date_event"?: DateInterface,
    //   "name": string;
    // "text"?: string;
    this.newEventForm = new FormGroup({
      attachment: new FormControl('', ),
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      date_event: new FormControl('', []),
      text: new FormControl('', []),
      file: new FormControl('', [])
    });
  }
  ngSubmit():void{
    if(this.newEventForm.invalid){
      console.info('Исправьте ошибки при заполнении формы !');
      return;
    }
    let cForm:NewEventInterface = {
      name: this.newEventForm.get('name').value,
    };
    if(this.newEventForm.get('text').value){ cForm.text = this.newEventForm.get('text').value; }
    if(this.newEventForm.get('date_event').value){
      cForm.date_event = {
        accuracy: 1,
        date: this.newEventForm.get('date_event').value
      }
    }

    if(this.newEventForm.get('file').value){
      this.eventService.saveNewEventFile(this.fileUpload).pipe(
        map( resp=>{ cForm.attachment = resp.id; return resp; }),
        mergeMap(resp => this.eventService.saveNewEvent(cForm))
      ).subscribe(resp=>{
        console.info('[INFO] Новое событие создано успешно ...');
        this.clearFile();
        this.newEventForm.reset();
        this.store.dispatch({type: APP_SET_LOADER, payload: false});
        this.router.navigate(['event']);
      },err => { console.info('Исправьте ошибки при заполнении формы !') })
    } else{
      this.eventService.saveNewEvent(cForm).subscribe(resp=>{
        console.info('[INFO] Новое событие создано успешно ...');
        this.clearFile();
        this.newEventForm.reset();
        this.store.dispatch({type: APP_SET_LOADER, payload: false});
        this.router.navigate(['event']);
      },err => { console.info('Исправьте ошибки при заполнении формы !') })
    }
  }

  checkValidFormDisable(){
    if(
      this.newEventForm.get('name').valid
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
    if(formName === 'newEventForm'){
      return this.newEventForm.controls[controlName].hasError(errorName);
    }
  };
  clearFile(){
    if( this.newEventForm.get('file').value){
      this.imageUrl='';
      this.newEventForm.get('file').reset();
    }
  }

  onFileChange(event){
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.fileUpload = file;
      if (!file.type.match('image.png')
        && !file.type.match('image.jpeg')
        && !file.type.match('image.x-png')) {
        this.newEventForm.get('file').setErrors({'back': true});
        return;
      }
      const reader = new FileReader();
      reader.onload = event => {
        this.imageUrl = reader.result as string;;
      };
      reader.readAsDataURL(file);
    }
  }
}
