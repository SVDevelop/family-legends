import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {FormControl, FormGroup} from "@angular/forms";
import {aNewFilesInterface, NewNoteInterface} from "../../interfaces/app.interface";
import {map, mergeMap } from "rxjs/operators";
import {APP_SET_LOADER} from "../../store/app";
import {FeedService} from "../../services/feed.service";

@Component({
  selector: 'app-new-note-form',
  templateUrl: './new-note-form.component.html',
  styleUrls: ['./new-note-form.component.scss']
})
export class NewNoteFormComponent implements OnInit {
  newNoteForm: FormGroup; // EVENT Create form
  aNewImages:aNewFilesInterface[] = [];
  nFileCount:number = 0;

  constructor(
    private feedService:FeedService,
    private router: Router,
    private store: Store<any>
  ) {
    this.newNoteForm = new FormGroup({
      attachment: new FormControl('', ),
      text: new FormControl('', []),
      file: new FormControl('', [])
    });
  }

  ngOnInit(): void {
  }
  ngSubmit():void{
    if(this.newNoteForm.invalid){
      console.info('Исправьте ошибки при заполнении формы !');
      return;
    }
    let cForm:NewNoteInterface = {
      text: this.newNoteForm.get('text').value,
    };

    if(this.aNewImages.length){
      this.feedService.uploadImages(this.aNewImages).pipe(
        map( resp=>{
          let cIds = [];
          resp.forEach(item=> cIds.push(item.id));
          cForm.attachments = cIds;
          return resp;
        }),
        mergeMap(item => this.feedService.saveNewEvent(cForm))
      ).subscribe(resp=>{
        console.info('[INFO] Новая запись создана успешно ...');
        this.clearFile();
        this.newNoteForm.reset();
        this.store.dispatch({type: APP_SET_LOADER, payload: false});
        ;
        this.router.navigate(['feed']);
      },err => { console.info('Исправьте ошибки при заполнении формы !') })
    } else{
      this.feedService.saveNewEvent(cForm).subscribe(resp=>{
        console.info('[INFO] Новая запись создана успешно ...');
        this.clearFile();
        this.newNoteForm.reset();
        this.store.dispatch({type: APP_SET_LOADER, payload: false});
        this.router.navigate(['feed']);
      },err => { console.info('Исправьте ошибки при заполнении формы !') })
    }
  }
  checkValidFormDisable(){
    if(
      (this.newNoteForm.get('text').value
      || this.aNewImages.length)
      && this.newNoteForm.touched
      && this.newNoteForm.valid
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
    if(formName === 'newNoteForm'){
      return this.newNoteForm.controls[controlName].hasError(errorName);
    }
  };
  clearFile(){
    if( this.newNoteForm.get('file').value){
      this.newNoteForm.get('file').reset();
    }
    this.aNewImages = [];
  }


  onFileChange(event){
    const file = (event.target as HTMLInputElement).files.item(0);

    if (file) {
      if (!file.type.match('image.png')
        && !file.type.match('image.jpeg')
        && !file.type.match('image.x-png')) {
        this.newNoteForm.get('file').setErrors({'back':true});
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
        this.newNoteForm.get('file').reset();
        this.nFileCount++;
        this.newNoteForm.markAsTouched();
        this.newNoteForm.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    }
  }
  deleteFileByNewImages(cId:string){
    this.aNewImages = Object.assign([], this.aNewImages).filter((item) => item.id !== cId)
  }
}
