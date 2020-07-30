import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-view-more-list-feed',
  templateUrl: './view-more-list-feed.component.html',
  styleUrls: ['./view-more-list-feed.component.scss']
})
export class ViewMoreListFeedComponent implements OnInit {
  @Output() onGetMore = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  getMore():void{
    this.onGetMore.emit();
  }
}
