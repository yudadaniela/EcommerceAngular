import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { admiGuard } from './admi.guard';

describe('admiGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => admiGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
