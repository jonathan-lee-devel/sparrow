import {makeConfirmRegistrationCallback} from '../confirm-registration';

describe('Confirm Registration Callback Unit Tests', () => {
  it('When make confirm registration Then defined function', async () => {
    const confirmRegistration = makeConfirmRegistrationCallback(
        // @ts-ignore
        {},
        {},
        {},
    );

    expect(confirmRegistration).toBeDefined();
    expect(confirmRegistration).toBeInstanceOf(Function);
  });
});
