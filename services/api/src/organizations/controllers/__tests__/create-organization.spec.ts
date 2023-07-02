import {describe, expect, it} from '@jest/globals';
import {makeCreateOrganizationController} from '../create-organization';
import {User} from '../../../main/models/User';
import {HttpRequest} from '../../../main/types/http-request';
import {HttpStatus} from '../../../common/enums/HttpStatus';

describe('Create Organization', () => {
  it('Make Create Organization Controller', async () => {
    const createOrganizationController = makeCreateOrganizationController(
        // @ts-ignore
        () => {},
    );

    expect(createOrganizationController).not.toBeNull();
    expect(createOrganizationController).toBeInstanceOf(Function);
  });
  it('Passed HTTP Request and Result', async () => {
    let passedRequestingUser: User | undefined = undefined;
    let passedName: string | undefined = undefined;
    const httpStatus: HttpStatus = HttpStatus.CREATED;
    const jsonBody: any = {};
    const createOrganizationController = makeCreateOrganizationController(
        // @ts-ignore
        (requestingUser, name) => {
          passedRequestingUser = requestingUser;
          passedName = name;
          return {
            status: httpStatus,
            data: jsonBody,
          };
        },
    );
    const name = 'John Doe';
    const email = 'test@example.com';
    const httpRequest: HttpRequest = {
      user: {email},
      body: {name},
      params: undefined,
    };
    const result = await createOrganizationController(httpRequest);
    expect(passedRequestingUser).toBeDefined();
    expect(passedRequestingUser).toStrictEqual({email});
    expect(passedName).toBeDefined();
    expect(passedName).toStrictEqual(name);
    expect(result.httpStatus).toStrictEqual(httpStatus);
    expect(result.jsonBody).toStrictEqual(jsonBody);
  });
});
