import {Component, Input, OnInit} from '@angular/core';
import {FeedResponseResultInterface} from "../../interfaces/feed.interface";

@Component({
  selector: 'app-feed-item-person',
  templateUrl: './feed-item-person.component.html',
  styleUrls: ['./feed-item-person.component.scss']
})
export class FeedItemPersonComponent implements OnInit {
  @Input('dataFeedPerson') dataFeedPerson: FeedResponseResultInterface;
  constructor() { }

  ngOnInit(): void {
  }

}
