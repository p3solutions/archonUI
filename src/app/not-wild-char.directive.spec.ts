import { NotWildCharDirective } from './not-wild-char.directive';

const elRefMock = {
  nativeElement: document.createElement('div')
};
describe('NotWildCharDirective', () => {
  it('should create an instance', () => {
    const directive = new NotWildCharDirective(elRefMock);
    expect(directive).toBeTruthy();
  });
});
