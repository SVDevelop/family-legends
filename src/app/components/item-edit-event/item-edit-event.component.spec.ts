import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditEventComponent } from './item-edit-event.component';

describe('ItemEditEventComponent', () => {
  let component: ItemEditEventComponent;
  let fixture: ComponentFixture<ItemEditEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEditEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEditEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
