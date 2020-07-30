import {Component, Input, OnInit} from '@angular/core';
import {FeedResponseResultInterface} from "../../interfaces/feed.interface";

@Component({
  selector: 'app-feed-item-event',
  templateUrl: './feed-item-event.component.html',
  styleUrls: ['./feed-item-event.component.scss']
})
export class FeedItemEventComponent implements OnInit {
  @Input('dataFeedEvent') dataFeedEvent?: FeedResponseResultInterface;
  constructor() { }

  ngOnInit(): void {
  }

}
