import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoreListFeedComponent } from './view-more-list-feed.component';

describe('ViewMoreListFeedComponent', () => {
  let component: ViewMoreListFeedComponent;
  let fixture: ComponentFixture<ViewMoreListFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMoreListFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMoreListFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
