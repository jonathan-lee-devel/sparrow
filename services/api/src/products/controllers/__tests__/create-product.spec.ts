import {describe, expect, it} from '@jest/globals';
import {HttpStatus} from '../../../common/enums/HttpStatus';
import {HttpRequest} from '../../../main/types/http-request';
import {makeCreateProductController} from '../create-product';
import {ProductDto} from '../../dtos/ProductDto';
import {User} from '../../../main/models/User';

describe('Create Product', () => {
  it('Make Create Product Controller', async () => {
    const createProductsController = makeCreateProductController(
        // @ts-ignore
        () => {},
    );

    expect(createProductsController).not.toBeNull();
    expect(createProductsController).toBeInstanceOf(Function);
  });
  it('Passed HTTP Request and Result', async () => {
    let requestUser: User | undefined = undefined;
    let passedName: string | undefined = undefined;
    let passedOrganizationId: string | undefined = undefined;
    const httpStatus: HttpStatus = HttpStatus.CREATED;
    const name: string = 'Burger';
    const id: string = '54321';
    const jsonBody: ProductDto = {
      id,
      name,
    };
    const createProductController = makeCreateProductController(
        // @ts-ignore
        (requestingUser, name, organizationId) => {
          requestUser = requestingUser;
          passedName = name;
          passedOrganizationId = organizationId;
          return {
            status: httpStatus,
            data: jsonBody,
          };
        },
    );
    const organizationId = 'd8236bb831b3cf845d688612459952ee';
    const user: User = {
      email: 'test@example.com',
      googleId: '12345',
      emailVerified: true,
      password: 'password',
      firstName: 'John',
      lastName: 'Doe',
    };
    const httpRequest: HttpRequest = {
      user,
      body: {
        name,
        organizationId,
      },
      params: undefined,
    };
    const result = await createProductController(httpRequest);
    expect(requestUser).toBeDefined();
    expect(requestUser).toStrictEqual(user);
    expect(passedName).toBeDefined();
    expect(passedName).toStrictEqual(name);
    expect(passedOrganizationId).toBeDefined();
    expect(passedOrganizationId).toStrictEqual(organizationId);
    expect(result.httpStatus).toStrictEqual(httpStatus);
    expect(result.jsonBody).toStrictEqual(jsonBody);
  });
});
