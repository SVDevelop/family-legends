import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailPlaceComponent } from './item-detail-place.component';

describe('ItemDetailPlaceComponent', () => {
  let component: ItemDetailPlaceComponent;
  let fixture: ComponentFixture<ItemDetailPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDetailPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
