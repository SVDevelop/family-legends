import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditPlaceComponent } from './item-edit-place.component';

describe('ItemEditPlaceComponent', () => {
  let component: ItemEditPlaceComponent;
  let fixture: ComponentFixture<ItemEditPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEditPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEditPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
