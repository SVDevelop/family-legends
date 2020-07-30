import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideMenuComponent } from './inside-menu.component';

describe('InsideMenuComponent', () => {
  let component: InsideMenuComponent;
  let fixture: ComponentFixture<InsideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsideMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
