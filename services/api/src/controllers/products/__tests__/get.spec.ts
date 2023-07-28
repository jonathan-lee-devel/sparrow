import { makeGetHandler } from '../get';

describe('Products GET Controller Unit Tests', () => {
  it('Request Handler Make', async () => {
    // @ts-ignore
    const getHandler = makeGetHandler({});

    expect(getHandler).not.toBeNull();
    expect(getHandler).toBeInstanceOf(Function);
  });
  it('Request Handler Calls Product.findOne().exec()', async () => {
    let isFindOneExecCalled = false;
    // @ts-ignore
    const getHandler = makeGetHandler({
      // @ts-ignore
      findOne: () => ({
        // @ts-ignore
        exec: () => {
          isFindOneExecCalled = true;
        }
      })
    });

    // @ts-ignore
    await getHandler({ params: { productId: 1 } }, { status: () => ({ send: () => {} }) });
    expect(isFindOneExecCalled).toBeTruthy();
  });
  it('Request Handler Returns Product.toJSON()', async () => {
    let productIsToJSONCalled = false;
    // @ts-ignore
    const getHandler = makeGetHandler({
      // @ts-ignore
      findOne: () => ({
        // @ts-ignore
        exec: () => ({
          toJSON: () => {
            productIsToJSONCalled = true;
          }
        })
      })
    });

    // @ts-ignore
    await getHandler({ params: { productId: 1 } }, { status: () => ({ json: () => {} }) });
    expect(productIsToJSONCalled).toBeTruthy();
  });
});
