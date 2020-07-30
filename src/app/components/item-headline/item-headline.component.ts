import {Component, Input, OnInit} from '@angular/core';
import {
  EventResponseInterface,
  FeedPersonResponseInterface,
  FeedPlaceResponseInterface
} from "../../interfaces/feed.interface";

@Component({
  selector: 'app-item-headline',
  templateUrl: './item-headline.component.html',
  styleUrls: ['./item-headline.component.scss']
})
export class ItemHeadlineComponent implements OnInit {
  @Input('itemDetail') itemDetail:FeedPersonResponseInterface;
  @Input('parentType') parentType:string;

  constructor() { }

  ngOnInit(): void {
  }

}
