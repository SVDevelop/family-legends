import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-inside-menu',
  templateUrl: './inside-menu.component.html',
  styleUrls: ['./inside-menu.component.scss']
})
export class InsideMenuComponent implements OnInit {
  @Input() activeMenu:string;
  constructor() { }

  ngOnInit(): void {
  }

}
