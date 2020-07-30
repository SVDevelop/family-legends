import {Component, EventEmitter, OnInit} from '@angular/core';
import {PersonsService} from "../../services/persons.service";

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.scss']
})
export class NewPersonComponent implements OnInit {
  constructor(
    private personsService:PersonsService
  ) { }
  ngOnInit(): void {
  }
}
