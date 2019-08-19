import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DreportComponent } from './dreport.component';

describe('DreportComponent', () => {
  let component: DreportComponent;
  let fixture: ComponentFixture<DreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
