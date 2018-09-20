import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalColumnDriverComponent } from './optional-column-driver.component';

describe('OptionalColumnDriverComponent', () => {
  let component: OptionalColumnDriverComponent;
  let fixture: ComponentFixture<OptionalColumnDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalColumnDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalColumnDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
