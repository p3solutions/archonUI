import { NonspecialcharDirective } from './nonspecialchar.directive';

const elRefMock = {
  nativeElement: document.createElement('div')
};
describe('NonspecialcharDirective', () => {
  it('should create an instance', () => {
    const directive = new NonspecialcharDirective(elRefMock);
    expect(directive).toBeTruthy();
  });
});
