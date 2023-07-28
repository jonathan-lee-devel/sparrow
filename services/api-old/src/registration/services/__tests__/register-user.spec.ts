import 'jest';
import {makeRegisterUser} from '../register-user.js';
import {describe, expect, it} from '@jest/globals';

describe('Create Organization', () => {
  it('Make Create Organization Controller', async () => {
    const registerUser = makeRegisterUser(
        // @ts-ignore
        {},
        () => {},
        () => {},
        () => {},
        () => {},
        {},
        () => {},
    );

    expect(registerUser).not.toBeNull();
    expect(registerUser).toBeInstanceOf(Function);
  });
});
