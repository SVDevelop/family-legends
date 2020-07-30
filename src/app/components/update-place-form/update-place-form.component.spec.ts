import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlaceFormComponent } from './update-place-form.component';

describe('UpdatePlaceFormComponent', () => {
  let component: UpdatePlaceFormComponent;
  let fixture: ComponentFixture<UpdatePlaceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePlaceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePlaceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
