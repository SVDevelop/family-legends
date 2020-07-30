import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilySetComponent } from './family-set.component';

describe('FamilySetComponent', () => {
  let component: FamilySetComponent;
  let fixture: ComponentFixture<FamilySetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilySetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilySetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
