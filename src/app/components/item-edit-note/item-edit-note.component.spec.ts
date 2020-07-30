import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditNoteComponent } from './item-edit-note.component';

describe('ItemEditNoteComponent', () => {
  let component: ItemEditNoteComponent;
  let fixture: ComponentFixture<ItemEditNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEditNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEditNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
