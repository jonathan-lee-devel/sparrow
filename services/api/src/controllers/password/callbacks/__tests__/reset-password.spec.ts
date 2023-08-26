import {makeResetPasswordCallback} from '../reset-password';

describe('Reset Password Callback Unit Tests', () => {
  it('When make reset password Then defined function', async () => {
    const resetPassword = makeResetPasswordCallback(
        // @ts-ignore
        {},
        {},
        {},
        () => {},
        () => {},
        {},
    );

    expect(resetPassword).toBeDefined();
    expect(resetPassword).toBeInstanceOf(Function);
  });
});
