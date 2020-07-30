import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHeadlinePlaceComponent } from './item-headline-place.component';

describe('ItemHeadlinePlaceComponent', () => {
  let component: ItemHeadlinePlaceComponent;
  let fixture: ComponentFixture<ItemHeadlinePlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemHeadlinePlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHeadlinePlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
