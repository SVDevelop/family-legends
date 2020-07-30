import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-info-widget',
  templateUrl: './info-widget.component.html',
  styleUrls: ['./info-widget.component.scss']
})
export class InfoWidgetComponent implements OnInit {
  @Input('type') typeWidget: string;
  @Input('itemWidget') itemWidget: string = 'note';
  @Input('classButton') classButton: string;
  constructor() { }

  ngOnInit(): void {
  }

}
