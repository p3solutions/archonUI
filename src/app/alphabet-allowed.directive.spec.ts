import { AlphabetAllowedDirective } from './alphabet-allowed.directive';

const elRefMock = {
  nativeElement: document.createElement('div')
};
describe('AlphabetAllowedDirective', () => {
  it('should create an instance', () => {
    const directive = new AlphabetAllowedDirective(elRefMock);
    expect(directive).toBeTruthy();
  });
});
