import {Component, Input, OnInit} from '@angular/core';
import {FeedResponseResultInterface} from "../../interfaces/feed.interface";

@Component({
  selector: 'app-feed-item-place',
  templateUrl: './feed-item-place.component.html',
  styleUrls: ['./feed-item-place.component.scss']
})
export class FeedItemPlaceComponent implements OnInit {
  @Input('dataFeedPlace') dataFeedPlace?: FeedResponseResultInterface;
  constructor() { }

  ngOnInit(): void {
  }

}
