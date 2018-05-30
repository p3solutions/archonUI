import { KeysPipe } from './keys.pipe';

describe('Pipe: Keys', () => {
  let pipe: KeysPipe;

  beforeEach(() => {
    pipe = new KeysPipe();
  });

  it('create an KeysPipe() instance', () => {
    expect(pipe).toBeTruthy();
  });
});
