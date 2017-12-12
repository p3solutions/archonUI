import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MemberRequestComponent } from './member-request.component';
import { MemberRequestService } from '../member-request.service';
import { MemberRequestData } from '../member-request-data';
describe('MemberRequestComponent', () => {
  let component: MemberRequestComponent;
  let fixture: ComponentFixture<MemberRequestComponent>;
  let memberData : MemberRequestData[];
  let value : number;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [MemberRequestService],
      declarations: [ MemberRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('getMemberRequestDetails()', () => {
      it('should return an Observable<Array<MemberRequestDetail>>',
        inject([MemberRequestService], (memberRequestService) => {
          memberRequestService.getMemberRequestDetails().subscribe(memberData => {
            component.total = memberData.length;
            value = memberData.length;
            expect(memberData.length).toBe(5);
            expect(memberData[0].slNo).toEqual('1');
            expect(memberData[1].slNo).toEqual('2');
            expect(memberData[2].slNo).toEqual('3');
            expect(memberData[3].slNo).toEqual('4');
            expect(memberData[4].slNo).toEqual('5');
          });
        }));
    });
});
