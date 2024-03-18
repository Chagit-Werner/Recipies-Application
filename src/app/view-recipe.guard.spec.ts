import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { viewRecipeGuard } from './view-recipe.guard';

describe('viewRecipeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => viewRecipeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
