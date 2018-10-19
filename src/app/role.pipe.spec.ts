import { RolePipe } from './role.pipe';

describe('RolePipe', () => {
  let pipe = new RolePipe();

  beforeEach(() => {
    pipe = new RolePipe();
  });

  it('create an RolePipe() instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Functionality of RolePipe', () => {
    // const filter = [ 'ROLE_ADMIN', 'ROLE_MEMBER', 'ROLE_TEST' ];
    const filter = [
      {
        id: 0,
        globalRoles: [
        {roleName: 'ROLE_ADMIN' }
      ]},
      {
        id: 1,
        globalRoles: [
        {roleName: 'ROLE_MEMBER' }
      ]},
      {
        id: 2,
        globalRoles: [
        {roleName: 'ROLE_TEST' }
      ]}
    ];
    const output = pipe.transform(filter);
    expect(output.length).toBe(2);
  });
});
