import {Component, Input, OnInit} from '@angular/core';
import {FeedBaseCounterResponseInterface} from "../../interfaces/feed.interface";

@Component({
  selector: 'app-relation-counter',
  templateUrl: './relation-counter.component.html',
  styleUrls: ['./relation-counter.component.scss']
})
export class RelationCounterComponent implements OnInit {
  constructor() { }
  @Input('counterItem') counterItem:FeedBaseCounterResponseInterface;
  @Input('classWrapMod') classWrapMod:string;
  ngOnInit(): void {
  }
}
