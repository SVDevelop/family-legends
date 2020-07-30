import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedItemEventComponent } from './feed-item-event.component';

describe('FeedItemEventComponent', () => {
  let component: FeedItemEventComponent;
  let fixture: ComponentFixture<FeedItemEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedItemEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedItemEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
