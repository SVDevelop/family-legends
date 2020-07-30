import {Component, NgModule, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {PersonEditStoreInterface} from "../../interfaces/app.interface";
import {ActionsSubject, select, Store} from "@ngrx/store";
import {PERSON_EDIT_SET_INFO, PERSON_EDIT_SET_INFO__STATUS, PersonAction} from "../../store/person";
import {PersonsService} from "../../services/persons.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})

export class ItemEditComponent implements OnInit, OnDestroy {
  personEditStore$: Observable<PersonEditStoreInterface>;
  personEditData:PersonEditStoreInterface;

  actionSubj$;

  constructor(
    private store: Store<any>,
    private actionsSubject: ActionsSubject,
    private personsService:PersonsService
  ) { }

  ngOnInit(): void {
    this.personEditStore$ = this.store.pipe(select('personEdit'));
    this.personEditData = JSON.parse(JSON.stringify(this.personsService.personData));
    this.actionSubj$ = this.actionsSubject.subscribe((action: PersonAction) => {
      if (action.type === PERSON_EDIT_SET_INFO) {
        this.store.dispatch({type: PERSON_EDIT_SET_INFO__STATUS, payload: 2});
      }
    });
  }

  ngOnDestroy(): void {
    this.actionSubj$.unsubscribe();
  }
}


