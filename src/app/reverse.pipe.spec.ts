import { ReverseArrayPipe } from './reverse.pipe';

xdescribe('Pipe: ReverseArrayPipe', () => {
  let pipe: ReverseArrayPipe;

  beforeEach(() => {
    pipe = new ReverseArrayPipe();
  });

  it('create an ReverseArrayPipe() instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('Functionality of ReverseArrayPipe', () => {
    const array = [1, 2, 3, 4, 5];
    const reversedArray = pipe.transform(array);
    const lastIndex = array.length - 1;
    expect(array[0]).toBe(reversedArray[lastIndex]);
  });
});
