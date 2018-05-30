import { ReverseArrayPipe } from './reverse.pipe';

describe('Pipe: ReverseArrayPipe', () => {
  let pipe: ReverseArrayPipe;

  beforeEach(() => {
    pipe = new ReverseArrayPipe();
  });

  it('create an ReverseArrayPipe() instance', () => {
    expect(pipe).toBeTruthy();
  });
});
