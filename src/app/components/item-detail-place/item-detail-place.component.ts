import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  FeedPlaceResponseInterface
} from "../../interfaces/feed.interface";
import {APP_SET_LOADER} from "../../store/app";
import {ErrorBase} from "../../interfaces/errors.interface";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {PlacesService} from "../../services/places.service";
import {concat, Observable, of} from "rxjs";
import {PlaceEditStoreInterface} from "../../interfaces/app.interface";
import {PLACE_EDIT_INITIAL, PLACE_EDIT_SET_INFO, PLACE_EDIT_SET_INFO__STATUS} from "../../store/place";

@Component({
  selector: 'app-item-detail-place',
  templateUrl: './item-detail-place.component.html',
  styleUrls: ['./item-detail-place.component.scss']
})
export class ItemDetailPlaceComponent implements OnInit, OnDestroy {
  idItem:string="";
  itemDetail: FeedPlaceResponseInterface;

  placeEditStore$: Observable<PlaceEditStoreInterface>;
  subsRouterPlace$;
  subsRouterPlaceParam$;

  timerIsGoEdit;
  constructor(
    private router: Router,
    private store: Store<any>,
    private activateRoute: ActivatedRoute,
    private placesService:PlacesService
  ) { }

  ngOnInit(): void {
    this.placeEditStore$ = this.store.pipe(select('placeEdit'));
    this.placeEditStore$.subscribe((resp: PlaceEditStoreInterface) => {
      this.placesService.placeData = resp;
    });
    this.store.dispatch({type: APP_SET_LOADER, payload: true});

    this.subsRouterPlaceParam$ = this.activateRoute.params.subscribe(params=>{
      this.idItem=params['id'];
      this.getItemPlaceInfo(this.idItem);
    });

    this.subsRouterPlace$ = this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.store.dispatch({type: PLACE_EDIT_SET_INFO__STATUS, payload: 1});
        if(this.placesService.placeData.isNeedUpdateDetail){
          this.getItemPlaceInfo(this.idItem);
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.subsRouterPlaceParam$.unsubscribe();
    this.subsRouterPlace$.unsubscribe();
  }
  getItemPlaceInfo(cId){
    this.placesService.getPlaces(cId).subscribe((resp:FeedPlaceResponseInterface)=>{
        this.store.dispatch({type: APP_SET_LOADER, payload: false});
        if(resp.person_creater){
          this.itemDetail = resp;
          this.store.dispatch({type: PLACE_EDIT_INITIAL});
          this.store.dispatch({type: PLACE_EDIT_SET_INFO__STATUS, payload: 1 });
          this.store.dispatch({type: PLACE_EDIT_SET_INFO, payload: resp });
        } else {
          this.router.navigate(['places']);
        }
      },
      (err: ErrorBase) => {
        // this.debugDATA = 'Ошибка загрузки данных ...';
        console.info('#err: ', 'Ошибка загрузки данных ...');
        setTimeout(()=>{ this.router.navigate(['places']); },1000);
      });
  }
  onGoEdit(id){
    clearTimeout(this.timerIsGoEdit);
    this.timerIsGoEdit = setTimeout(()=>{
      this.router.navigate(['places', id, 'edit']);
    }, 100);
  }
}
