import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {Router} from "@angular/router";

import {AppStoreInterface} from "../../interfaces/app.interface";
import {APP_LOGOUT} from "../../store/app";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  isOpen:boolean = false;
  app$: Observable<AppStoreInterface>;
  constructor(
    private store: Store<any>,
  private router: Router
  ) { this.isOpen = false; }

  ngOnInit(): void {
    this.isOpen = false;
    this.app$ = this.store.pipe(select('app'));
  }

  setOpenMenuFlag(){ this.isOpen = true; }
  setCloseMenuFlag(){ this.isOpen = false; }
  onLogOut(){
    this.store.dispatch({type: APP_LOGOUT});
    this.router.navigate(['login']);
  }
}
