import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { shoppingGuard } from './shopping.guard';

describe('shoppingGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => shoppingGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
