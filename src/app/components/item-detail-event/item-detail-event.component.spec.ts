import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailEventComponent } from './item-detail-event.component';

describe('ItemDetailEventComponent', () => {
  let component: ItemDetailEventComponent;
  let fixture: ComponentFixture<ItemDetailEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDetailEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
