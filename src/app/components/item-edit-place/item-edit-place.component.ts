import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActionsSubject, select, Store} from "@ngrx/store";
import {PlacesService} from "../../services/places.service";
import {Observable} from "rxjs";
import { PlaceEditStoreInterface} from "../../interfaces/app.interface";
import {PLACE_EDIT_SET_INFO, PLACE_EDIT_SET_INFO__STATUS, PlaceAction} from "../../store/place";

@Component({
  selector: 'app-item-edit-place',
  templateUrl: './item-edit-place.component.html',
  styleUrls: ['./item-edit-place.component.scss']
})
export class ItemEditPlaceComponent implements OnInit,OnDestroy {
  placeEditStore$: Observable<PlaceEditStoreInterface>;
  placeEditData:PlaceEditStoreInterface;

  actionSubjPlace$;
  constructor(
    private store: Store<any>,
    private actionsSubject: ActionsSubject,
    private placesService:PlacesService
  ) { }

  ngOnInit(): void {
    this.placeEditStore$ = this.store.pipe(select('placeEdit'));
    this.placeEditData = JSON.parse(JSON.stringify(this.placesService.placeData));
    this.actionSubjPlace$ = this.actionsSubject.subscribe((action: PlaceAction) => {
      if (action.type === PLACE_EDIT_SET_INFO) {
        this.store.dispatch({type: PLACE_EDIT_SET_INFO__STATUS, payload: 2});
      }
    });
  }
  ngOnDestroy(): void {
    this.actionSubjPlace$.unsubscribe();
  }
}
