import {Component, Input, OnInit } from '@angular/core';
import {
  FeedResponseResultInterface
} from "../../interfaces/feed.interface";
import {AttachmentInterface} from "../../interfaces/app.interface";

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.scss']
})

export class FeedItemComponent implements OnInit {
  @Input('type') typeItem: string;
  @Input('dataFeedNote') dataFeed: FeedResponseResultInterface;

  constructor() { }

  ngOnInit(): void {}
}
