import { AllowcharDirective } from './allowchar.directive';
const elRefMock = {
  nativeElement: document.createElement('div')
};
describe('AllowcharDirective', () => {
  it('should create an instance', () => {
    const directive = new AllowcharDirective(elRefMock);
    expect(directive).toBeTruthy();
  });
});
