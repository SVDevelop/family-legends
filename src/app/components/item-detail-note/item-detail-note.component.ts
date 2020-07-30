import { Component, OnInit } from '@angular/core';
import {
  EventResponseInterface,
  FeedPlaceResponseInterface,
  NoteResponseInterface
} from "../../interfaces/feed.interface";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {APP_SET_LOADER} from "../../store/app";
import {ErrorBase} from "../../interfaces/errors.interface";
import {FeedService} from "../../services/feed.service";
import {Observable} from "rxjs";
import { NoteEditStoreInterface} from "../../interfaces/app.interface";
import {NOTE_EDIT_INITIAL, NOTE_EDIT_SET_INFO, NOTE_EDIT_SET_INFO__STATUS} from "../../store/note";

@Component({
  selector: 'app-item-detail-note',
  templateUrl: './item-detail-note.component.html',
  styleUrls: ['./item-detail-note.component.scss']
})
export class ItemDetailNoteComponent implements OnInit {
  idItem:string="";
  itemDetail: NoteResponseInterface;
  noteEditStore$: Observable<NoteEditStoreInterface>;
  timerIsGoEditEvent;

  subsRouterEvent$;
  subsRouterEventParam$;
  constructor(
    private router: Router,
    private store: Store<any>,
    private activateRoute: ActivatedRoute,
    private feedService:FeedService
  ) { }

  ngOnInit(): void{
      this.noteEditStore$ = this.store.pipe(select('noteEdit'));
      this.noteEditStore$.subscribe((resp: NoteEditStoreInterface) => {
      this.feedService.noteData = resp;
    });
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    this.subsRouterEventParam$ = this.activateRoute.params.subscribe(params=>{
      this.idItem=params['id'];
      this.getItemNoteInfo(this.idItem);
    });

    this.subsRouterEvent$ = this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.store.dispatch({type: NOTE_EDIT_SET_INFO__STATUS, payload: 1});
        if(this.feedService.noteData.isNeedUpdateDetail){
          this.getItemNoteInfo(this.idItem);
        }
      }
    });

}
  getItemNoteInfo(cId){
    this.feedService.getNote(cId).subscribe((resp:NoteResponseInterface)=>{
        this.store.dispatch({type: APP_SET_LOADER, payload: false});
        if(resp.person_creater){
          this.itemDetail = resp;
          this.store.dispatch({type: NOTE_EDIT_INITIAL});
          this.store.dispatch({type: NOTE_EDIT_SET_INFO__STATUS, payload: 1 });
          this.store.dispatch({type: NOTE_EDIT_SET_INFO, payload: resp });
        } else {
          this.router.navigate(['feed']);
        }
      },
      (err: ErrorBase) => {
        // this.debugDATA = 'Ошибка загрузки данных ...';
        console.info('#err: ', 'Ошибка загрузки данных ...');
        setTimeout(()=>{ this.router.navigate(['feed']); },1000);
      });
  }
  onGoEdit(id){
    clearTimeout(this.timerIsGoEditEvent);
    this.timerIsGoEditEvent = setTimeout(()=>{
      this.router.navigate(['feed', id, 'edit']);
    }, 100);
  }
}
