import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedItemPersonComponent } from './feed-item-person.component';

describe('FeedItemPersonComponent', () => {
  let component: FeedItemPersonComponent;
  let fixture: ComponentFixture<FeedItemPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedItemPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedItemPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
