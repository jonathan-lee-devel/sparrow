import {makeConfirmRegistration} from '../confirm-registration.js';
import {RegistrationStatus} from '../../enums/RegistrationStatus.js';

describe('Registration Service Confirm Registration Tests', () => {
  it('When makeConfirmRegistration Then confirmRegistration', async () => {
    // @ts-ignore
    const confirmRegistration = makeConfirmRegistration(
        // @ts-ignore
        {},
        {},
        {},
    );

    expect(confirmRegistration).not.toBeNull();
    expect(confirmRegistration).toBeInstanceOf(Function);
  });
  it('When token not found Then return status invalid token', async () => {
    // @ts-ignore
    const confirmRegistration = makeConfirmRegistration(
        // @ts-ignore
        {},
        {
          findOne: () => {
            return {exec: () => {
              return undefined;
            }};
          },
        },
        {},
    );

    const result = await confirmRegistration('12345');

    expect(result.status).toStrictEqual(400);
    expect(result.data).toStrictEqual({
      status: RegistrationStatus[RegistrationStatus.INVALID_TOKEN],
    });
  });
  xit('When token found and user not found Then return status failure', async () => {
    // @ts-ignore
    const confirmRegistration = makeConfirmRegistration(
        // @ts-ignore
        {
          // @ts-ignore
          error: () => {
          },
        },
        {
          findOne: () => {
            return {};
          },
        },
        {
          findOne: () => {
            return {exec: () => {
              return undefined;
            }};
          },
        },
    );

    const result = await confirmRegistration('12345');

    expect(result.status).toStrictEqual(500);
    expect(result.data).toStrictEqual({
      status: RegistrationStatus[RegistrationStatus.FAILURE],
    });
  });
  xit('When token found and user found and token expired Then return status email verification expired', async () => {
    const tokenExpiryDate = new Date();
    tokenExpiryDate.setDate(new Date().getDate() - 1);

    // @ts-ignore
    const confirmRegistration = makeConfirmRegistration(
        // @ts-ignore
        {},
        {
          findOne: () => {
            return {
              expiryDate: tokenExpiryDate,
            };
          },
        },
        {
          findOne: () => {
            return {exec: () => {
              return {};
            }};
          },
        },
    );

    const result = await confirmRegistration('12345');

    expect(result.status).toStrictEqual(400);
    expect(result.data).toStrictEqual({
      status: RegistrationStatus[RegistrationStatus.EMAIL_VERIFICATION_EXPIRED],
    });
  });
  xit('When token found and user found and token valid Then return status success and user and token saved', async () => {
    const tokenExpiryDate = new Date();
    tokenExpiryDate.setDate(new Date().getDate() + 1);

    let tokenIsSaved = false;
    let userIsSaved = false;
    // @ts-ignore
    const confirmRegistration = makeConfirmRegistration(
        // @ts-ignore
        {
          // @ts-ignore
          info: () => {
          },
        },
        {
          findOne: () => {
            return {
              expiryDate: tokenExpiryDate,
              save: () => {
                tokenIsSaved = true;
              },
            };
          },
        },
        {
          findOne: () => {
            return {
              exec: () => {
                return {
                  save: () => {
                    userIsSaved = true;
                  },
                };
              },
            };
          },
        },
    );

    const result = await confirmRegistration('12345');

    expect(result.status).toStrictEqual(200);
    expect(result.data).toStrictEqual({
      status: RegistrationStatus[RegistrationStatus.SUCCESS],
    });
    expect(tokenIsSaved).toBeTruthy();
    expect(userIsSaved).toBeTruthy();
  });
});
