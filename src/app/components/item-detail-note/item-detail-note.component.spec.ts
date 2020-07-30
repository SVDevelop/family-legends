import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailNoteComponent } from './item-detail-note.component';

describe('ItemDetailNoteComponent', () => {
  let component: ItemDetailNoteComponent;
  let fixture: ComponentFixture<ItemDetailNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDetailNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
