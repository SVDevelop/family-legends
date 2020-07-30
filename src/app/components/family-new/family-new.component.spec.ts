import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyNewComponent } from './family-new.component';

describe('FamilyNewComponent', () => {
  let component: FamilyNewComponent;
  let fixture: ComponentFixture<FamilyNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
