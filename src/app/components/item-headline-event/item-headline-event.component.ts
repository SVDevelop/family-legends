import {Component, Input, OnInit} from '@angular/core';
import {
  EventResponseInterface
} from "../../interfaces/feed.interface";

@Component({
  selector: 'app-item-headline-event',
  templateUrl: './item-headline-event.component.html',
  styleUrls: ['./item-headline-event.component.scss']
})
export class ItemHeadlineEventComponent implements OnInit {
  @Input('itemDetail') itemDetail:EventResponseInterface;
  @Input('parentType') parentType:string;
  constructor() { }

  ngOnInit(): void {
  }

}
