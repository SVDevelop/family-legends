import { Component, OnInit } from '@angular/core';
import {APP_SET_LOADER} from "../../store/app";
import {
  FeedPlaceResponseInterface,
  PLACEResponseInterface
} from "../../interfaces/feed.interface";
import {ErrorBase} from "../../interfaces/errors.interface";
import { PlacesService } from '../../services/places.service'
import {Store} from "@ngrx/store";
import {PersonsService} from "../../services/persons.service";

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  placesAll:FeedPlaceResponseInterface[] = [];
  constructor(
    private store: Store<any>,
    private placesService:PlacesService
    ,private personsService:PersonsService
  ) { }

  ngOnInit(): void {
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    this.getPlaces();
  }
  getPlaces(){
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    this.placesService.getAllPlaces().subscribe((resp: PLACEResponseInterface)=>{
        if(resp.count > 0){
          this.placesAll = resp.results;
        }
        this.store.dispatch({type: APP_SET_LOADER, payload: false});
      },
      (err: ErrorBase) => {
        // this.debugDATA = 'Ошибка загрузки данных ...';
        console.info('#err: ', 'Ошибка загрузки данных ...');
      });
  }
}
