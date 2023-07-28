import {describe, expect, it} from '@jest/globals';
import {makeGetProductsForOrganizationController} from '../get-products';
import {HttpStatus} from '../../../common/enums/HttpStatus';
import {HttpRequest} from '../../../main/types/http-request';

describe('Get Products', () => {
  it('Make Get Products Controller', async () => {
    const getProductsController = makeGetProductsForOrganizationController(
        // @ts-ignore
        () => {},
    );

    expect(getProductsController).not.toBeNull();
    expect(getProductsController).toBeInstanceOf(Function);
  });
  it('Passed HTTP Request and Result', async () => {
    let passedOrganizationId: string | undefined = undefined;
    const httpStatus: HttpStatus = HttpStatus.OK;
    const jsonBody: any = {};
    const getProductsController = makeGetProductsForOrganizationController(
        // @ts-ignore
        (organizationId) => {
          passedOrganizationId = organizationId;
          return {
            status: httpStatus,
            data: jsonBody,
          };
        },
    );
    const organizationId = 'd8236bb831b3cf845d688612459952ee';
    const httpRequest: HttpRequest = {
      user: undefined,
      body: undefined,
      params: {
        organizationId,
      },
    };
    const result = await getProductsController(httpRequest);
    expect(passedOrganizationId).toBeDefined();
    expect(passedOrganizationId).toStrictEqual(organizationId);
    expect(result.httpStatus).toStrictEqual(httpStatus);
    expect(result.jsonBody).toStrictEqual(jsonBody);
  });
});
