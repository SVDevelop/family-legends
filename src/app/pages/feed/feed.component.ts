import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";

import { FeedService } from "../../services/feed.service";
import {FeedResponseInterface, FeedResponseResultInterface} from "../../interfaces/feed.interface";
import {ErrorBase} from "../../interfaces/errors.interface";
import {APP_SET_LOADER } from "../../store/app";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  debugRESULT:any;
  feedAll= [] as FeedResponseResultInterface[];
  constructor(
    private store: Store<any>,
    private feedService:FeedService
  ) {}

  ngOnInit(): void {
    this.getAllFeed();
  }
  getAllFeed(){ // получаем ЛЕНТУ
    this.store.dispatch({type: APP_SET_LOADER, payload: true});
    this.feedService.getAllFeed().subscribe((resp: FeedResponseInterface)=>{
      this.debugRESULT = resp;
      if(resp.count > 0){
        this.feedAll = resp.results;
      }
      this.store.dispatch({type: APP_SET_LOADER, payload: false});
    },
    (err: ErrorBase) => {
      this.debugRESULT = 'Ошибка загрузки данных ...';
      console.info('#err: ', 'Ошибка загрузки данных ...');
    });
  }
}
