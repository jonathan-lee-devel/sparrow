import {makeConfirmPasswordResetCallback} from '../confirm-password-reset';

describe('Confirm Password Reset Callback Unit Tests', () => {
  it('When make confirm password reset Then defined function', async () => {
    const confirmPasswordReset = makeConfirmPasswordResetCallback(
        // @ts-ignore
        {},
        {},
        {},
        () => {},
    );

    expect(confirmPasswordReset).toBeDefined();
    expect(confirmPasswordReset).toBeInstanceOf(Function);
  });
});
