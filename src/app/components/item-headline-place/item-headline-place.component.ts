import {Component, Input, OnInit} from '@angular/core';
import {FeedPersonResponseInterface, FeedPlaceResponseInterface} from "../../interfaces/feed.interface";

@Component({
  selector: 'app-item-headline-place',
  templateUrl: './item-headline-place.component.html',
  styleUrls: ['./item-headline-place.component.scss']
})
export class ItemHeadlinePlaceComponent implements OnInit {
  @Input('itemDetail') itemDetail:FeedPlaceResponseInterface;
  constructor() { }
  ngOnInit(): void {
  }

}
