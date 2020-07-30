import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationCounterComponent } from './relation-counter.component';

describe('RelationCounterComponent', () => {
  let component: RelationCounterComponent;
  let fixture: ComponentFixture<RelationCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
