import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemPlaceEventComponent } from './list-item-place-event.component';

describe('ListItemPlaceEventComponent', () => {
  let component: ListItemPlaceEventComponent;
  let fixture: ComponentFixture<ListItemPlaceEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemPlaceEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemPlaceEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
