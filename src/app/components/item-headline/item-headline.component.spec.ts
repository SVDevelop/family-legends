import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHeadlineComponent } from './item-headline.component';

describe('ItemHeadlineComponent', () => {
  let component: ItemHeadlineComponent;
  let fixture: ComponentFixture<ItemHeadlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemHeadlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
