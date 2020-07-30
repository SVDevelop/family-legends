import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {PlaceEditStoreInterface} from "../../interfaces/app.interface";
import {ActionsSubject, select, Store} from "@ngrx/store";
import {FeedService} from "../../services/feed.service";
import {NOTE_EDIT_SET_INFO, NOTE_EDIT_SET_INFO__STATUS, NoteAction} from "../../store/note";

@Component({
  selector: 'app-item-edit-note',
  templateUrl: './item-edit-note.component.html',
  styleUrls: ['./item-edit-note.component.scss']
})
export class ItemEditNoteComponent implements OnInit,OnDestroy {
  noteEditStore$: Observable<PlaceEditStoreInterface>;
  noteEditData:PlaceEditStoreInterface;

  actionSubjNote$;
  constructor(
    private store: Store<any>,
    private actionsSubject: ActionsSubject,
    private feedService:FeedService
  ) { }

  ngOnInit(): void {
    this.noteEditStore$ = this.store.pipe(select('placeEdit'));
    this.noteEditData = JSON.parse(JSON.stringify(this.feedService.noteData));
    this.actionSubjNote$ = this.actionsSubject.subscribe((action: NoteAction) => {
      if (action.type === NOTE_EDIT_SET_INFO) {
        this.store.dispatch({type: NOTE_EDIT_SET_INFO__STATUS, payload: 2});
      }
    });
  }
  ngOnDestroy(): void {
    this.actionSubjNote$.unsubscribe();
  }
}
