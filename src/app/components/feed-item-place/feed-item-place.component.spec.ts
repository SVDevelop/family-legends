import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedItemPlaceComponent } from './feed-item-place.component';

describe('FeedItemPlaceComponent', () => {
  let component: FeedItemPlaceComponent;
  let fixture: ComponentFixture<FeedItemPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedItemPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedItemPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
