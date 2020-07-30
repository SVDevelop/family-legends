import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHeadlineEventComponent } from './item-headline-event.component';

describe('ItemHeadlineEventComponent', () => {
  let component: ItemHeadlineEventComponent;
  let fixture: ComponentFixture<ItemHeadlineEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemHeadlineEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHeadlineEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
