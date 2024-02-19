import { CanActivateFn } from '@angular/router';

export const homeProductsGuard: CanActivateFn = (route, state) => {
  return true;
};
