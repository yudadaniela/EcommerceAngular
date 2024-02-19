import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { homeProductsGuard } from './home-products.guard';

describe('homeProductsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => homeProductsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
