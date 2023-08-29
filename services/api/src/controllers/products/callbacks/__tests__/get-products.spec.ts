import {makeGetProductsCallback} from '../get-products';
import {HttpStatus} from '../../../../lib/enums/HttpStatus';
import {Product} from '../../../../models/products/Product';

describe('Get Products Callback Unit Tests', () => {
  const organizationId = '12345';
  it('When make get products callback Then defined function', async () => {
    // @ts-ignore
    const getProducts = makeGetProductsCallback({}, {});

    expect(getProducts).toBeDefined();
    expect(getProducts).toBeInstanceOf(Function);
  });
  it('When get products And no products Then return correct status with empty list', async () => {
    let loggedMessage: string | undefined;
    let queryFilter: any;
    const getProducts = makeGetProductsCallback({
      // @ts-ignore
      info: (message) => {
        loggedMessage = message;
      },
    },
    {
      find: (filter) => {
        queryFilter = filter;
        return {
          exec: () => {
            return [];
          },
        };
      },
    });

    let returnedCode: number | undefined;
    let returnedBody: any;
    // @ts-ignore
    await getProducts({params: {organizationId}}, {
      status(code: number) {
        returnedCode = code;
        return {
          json: (body) => {
            returnedBody = body;
          },
        };
      },
    });

    expect(returnedCode).toStrictEqual(HttpStatus.OK);
    expect(returnedBody).toStrictEqual([]);
    expect(loggedMessage).toStrictEqual(`Request to get products for organization with ID: ${organizationId}`);
    expect(queryFilter).toStrictEqual({organizationId});
  });
  it('When get products Then return correct status', async () => {
    let loggedMessage: string | undefined;
    let queryFilter: any;
    const products: Product[] = [{
      id: '12345',
      organizationId,
      name: 'Test',
    }];
    const getProducts = makeGetProductsCallback({
      // @ts-ignore
      info: (message) => {
        loggedMessage = message;
      },
    },
    {
      find: (filter) => {
        queryFilter = filter;
        return {
          exec: () => {
            return products;
          },
        };
      },
    });

    let returnedCode: number | undefined;
    let returnedBody: any;
    // @ts-ignore
    await getProducts({params: {organizationId}}, {
      status(code: number) {
        returnedCode = code;
        return {
          json: (body) => {
            returnedBody = body;
          },
        };
      },
    });

    expect(returnedCode).toStrictEqual(HttpStatus.OK);
    expect(returnedBody).toStrictEqual([{
      ...products[0],
      createdAt: undefined,
      updatedAt: undefined,
    }]);
    expect(loggedMessage).toStrictEqual(`Request to get products for organization with ID: ${organizationId}`);
    expect(queryFilter).toStrictEqual({organizationId});
  });
});
