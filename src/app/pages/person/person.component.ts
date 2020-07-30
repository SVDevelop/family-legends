import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";

import {APP_SET_LOADER} from "../../store/app";
import {PersonsService} from "../../services/persons.service";
import {
  FeedPersonResponseInterface,
  PERSONResponseInterface
} from "../../interfaces/feed.interface";
import {ErrorBase} from "../../interfaces/errors.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  debugDATA:PERSONResponseInterface;
  personAll:FeedPersonResponseInterface[] = [];
  constructor(
    private store: Store<any>,
    private router: Router,
    private personsService:PersonsService
  ) { }

  ngOnInit(): void {
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    this.getPersons();
  }

  getPersons(){
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    this.personsService.getAllPerson().subscribe((resp: PERSONResponseInterface)=>{
          this.debugDATA = resp;
          if(resp.count > 0){
            this.personAll = resp.results;
          }
          this.store.dispatch({type: APP_SET_LOADER, payload: false});
        },
        (err: ErrorBase) => {
          // this.debugDATA = 'Ошибка загрузки данных ...';
          console.info('#err: ', 'Ошибка загрузки данных ...');
    });
  }
}
