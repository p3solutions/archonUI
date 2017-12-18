import { TestBed, inject } from '@angular/core/testing';
import { HttpClient} from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InfoService } from './info.service';
import { Observable } from 'rxjs/Observable';
import { Info } from './info';


xdescribe('InfoService', () => {
  let infoService: InfoService;
  let info_observable: Observable<Info>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InfoService]
    });
  });
  it('should get an observable if the data exists', inject([HttpClient],
    (http: HttpClient) => {
      infoService = new InfoService(http);
      info_observable = infoService.getinfo(infoService.infoUrl);
      expect(info_observable).toBeTruthy();
  }));
  it('should get an observable if the data doesnt exist', inject([HttpClient],
    (http: HttpClient) => {
      const fake_url: String = '/data';
      infoService = new InfoService(http);
      info_observable = infoService.getinfo(fake_url);
      expect(info_observable).toBeTruthy();
      // info_observable.subscribe(information => expect(information).toBeUndefined());
  }));
});
