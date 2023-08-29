import {makeGetProductsCallback} from '../get-products';

describe('Get Products Callback Unit Tests', () => {
  it('When make get products callback Then defined function', async () => {
    // @ts-ignore
    const getProducts = makeGetProductsCallback({}, {});

    expect(getProducts).toBeDefined();
    expect(getProducts).toBeInstanceOf(Function);
  });
});
