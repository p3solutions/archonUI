import { ScrollableDirective } from './scrollable.directive';

const elRefMock = {
  nativeElement: document.createElement('div')
};
describe('ScrollableDirective', () => {
  it('should create an instance', () => {
    const directive = new ScrollableDirective(elRefMock);
    expect(directive).toBeTruthy();
  });
});
