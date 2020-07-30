import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {APP_SET_LOADER, APP_SET_NOW_PAGE} from "../../store/app";
import {PersonsService} from "../../services/persons.service";
import {PlacesService} from "../../services/places.service";
import {ErrorBase} from "../../interfaces/errors.interface";
import {select, Store} from "@ngrx/store";
import {concat, Observable, of} from "rxjs";
import {
  EventResponseInterface,
  FeedPersonResponseInterface,
  FeedPlaceResponseInterface
} from "../../interfaces/feed.interface";
import {PERSON_EDIT_INITIAL, PERSON_EDIT_SET_INFO, PERSON_EDIT_SET_INFO__STATUS} from "../../store/person";
import {PersonEditStoreInterface} from "../../interfaces/app.interface";
import {AuthInterface} from "../../interfaces/auth.interface";

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit, OnDestroy {
  idItem:string="";
  itemDetail: FeedPersonResponseInterface;

  subsCobcat$;
  subsRouter$;

  typeParent:string;
  personEditStore$: Observable<PersonEditStoreInterface>;
  timerIsGoEdit;
  constructor(
    private router: Router,
    private store: Store<any>,
    private activateRoute: ActivatedRoute,
    private personsService:PersonsService
  ) {}

  ngOnInit(): void {
    this.personEditStore$ = this.store.pipe(select('personEdit'));
    this.personEditStore$.subscribe((resp: PersonEditStoreInterface) => {
      this.personsService.personData = resp;
    });
    this.store.dispatch({type: APP_SET_LOADER, payload: true});

    this.subsCobcat$ = concat(
      of(this.activateRoute.data.subscribe(data=>{
        this.typeParent = data.pType;
      })),
      of(this.activateRoute.params.subscribe(params=>{
        this.idItem=params['id'];
          this.getItemPersonInfo(this.idItem);
      }))
    );

    this.subsRouter$ = this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.store.dispatch({type: PERSON_EDIT_SET_INFO__STATUS, payload: 1});
        if(this.personsService.personData.isNeedUpdateDetail){
          this.getItemPersonInfo(this.idItem);
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.subsRouter$.unsubscribe();
  }
  getItemPersonInfo(cId){
    this.personsService.getPerson(cId).subscribe((resp:FeedPersonResponseInterface)=>{
        this.store.dispatch({type: APP_SET_LOADER, payload: false});
        if(resp.person_creater){
          this.itemDetail = resp;
          this.store.dispatch({type: PERSON_EDIT_INITIAL});
          this.store.dispatch({type: PERSON_EDIT_SET_INFO__STATUS, payload: 1 });
          this.store.dispatch({type: PERSON_EDIT_SET_INFO, payload: resp });
        } else{
          this.router.navigate(['person']);
        }

      },
      (err: ErrorBase) => {
        // this.debugDATA = 'Ошибка загрузки данных ...';
        console.info('#err: ', 'Ошибка загрузки данных ...');
        setTimeout(()=>{ this.router.navigate(['person']); },1000);
    });
  }
  onGoEdit(id){
    clearTimeout(this.timerIsGoEdit);
    this.timerIsGoEdit = setTimeout(()=>{
      this.router.navigate(['person', id, 'edit']);
    }, 100);
  }

  onSave(){
    alert('Сохраним ДАННЫЕ');
  }
}
