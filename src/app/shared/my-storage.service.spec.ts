import { TestBed } from '@angular/core/testing';

import { MyUniversalService } from './my-universal.service';

describe('MyUniversalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyUniversalService = TestBed.get(MyUniversalService);
    expect(service).toBeTruthy();
  });
});
