import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SignInService } from './sign-in.service';
import { Forgotpassword } from './forgotpassword';


describe('SignInService', () => {
  let signInService: SignInService;
  // tslint:disable-next-line:prefer-const
  let forgot_password_observable: Observable<Forgotpassword>;
  // let info_observable: Observable<Forgotpassword>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignInService]
    });
  });

  // it('should be created', inject([SignInService], (service: SignInService) => {
  //   expect(service).toBeTruthy();
  // }));
  // it('should get forgot-password data for forgot-password component', inject([HttpClient],
  //   (http: HttpClient) => {
  //     signInService = new SignInService(http);
  //     const newLocal: Forgotpassword = signInService.forgotPasswordUrl;

  //     forgot_password_observable = signInService.forgotPassword( newLocal );
  //     // info_observable = signInService.forgotPassword(signInService.forgotPasswordUrl);
  //     expect(forgot_password_observable).toBeTruthy();
  // }));
});
