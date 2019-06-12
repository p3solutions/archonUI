import { OnlyuppercaseallowDirective } from './onlyuppercaseallow.directive';

const elRefMock = {
  nativeElement: document.createElement('div')
};
describe('OnlyuppercaseallowDirective', () => {
  it('should create an instance', () => {
    const directive = new OnlyuppercaseallowDirective(elRefMock);
    expect(directive).toBeTruthy();
  });
});
