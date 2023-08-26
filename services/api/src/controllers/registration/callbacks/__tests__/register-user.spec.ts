import {makeRegisterUserCallback} from '../register-user';

describe('Register User Callback Unit Tests', () => {
  it('When make register user Then defined function', async () => {
    const registerUser = makeRegisterUserCallback(
        // @ts-ignore
        {},
        () => {},
        () => {},
        () => {},
        () => {},
        {},
        () => {},
        {},
    );

    expect(registerUser).toBeDefined();
    expect(registerUser).toBeInstanceOf(Function);
  });
});
