import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeleteDriverComponent } from './delete-driver.component';

describe('DeleteDriverComponent', () => {
  let component: DeleteDriverComponent;
  let fixture: ComponentFixture<DeleteDriverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
