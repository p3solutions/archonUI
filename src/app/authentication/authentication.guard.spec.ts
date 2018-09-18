import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationGuard } from './authentication.guard';

xdescribe('AuthenticationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthenticationGuard, RouterTestingModule]
    });
  });

  it('should ...', async(inject([AuthenticationGuard, Router],
    (guard, router: Router) => {
      expect(guard).toBeTruthy();
      spyOn(router, 'navigate');
      expect(guard.canActivate()).toBeTruthy();
      // expect(router.navigate).toHaveBeenCalled();
  })));
});
