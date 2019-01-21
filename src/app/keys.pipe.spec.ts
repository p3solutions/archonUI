import { KeysPipe } from './keys.pipe';

describe('Pipe: Keys', () => {
  let pipe: KeysPipe;

  beforeEach(() => {
    pipe = new KeysPipe();
  });

  it('create an KeysPipe() instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('Functionality of KeysPipe', () => {
    const keyArray = pipe.transform({a: 1});
    const attr = keyArray[0];
    expect(attr).toBe('a');
  });
});
