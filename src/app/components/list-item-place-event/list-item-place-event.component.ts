import {Component, Input, OnInit} from '@angular/core';
import {
  FeedPlaceEventResponseInterface
} from "../../interfaces/feed.interface";

@Component({
  selector: 'app-list-item-place-event',
  templateUrl: './list-item-place-event.component.html',
  styleUrls: ['./list-item-place-event.component.scss']
})
export class ListItemPlaceEventComponent implements OnInit {
  @Input() itemTemplate:FeedPlaceEventResponseInterface;
  @Input() itemType: string;
  constructor() { }

  ngOnInit(): void {
  }

}
