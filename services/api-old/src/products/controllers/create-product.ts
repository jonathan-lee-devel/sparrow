import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';
import {CreateProductFunction} from '../types/create-product';

export const makeCreateProductController = (
    createProduct: CreateProductFunction,
): HttpController => {
  return async function createProductController(httpRequest: HttpRequest) {
    const productContainer = await createProduct(
        httpRequest.user,
        httpRequest.body.name,
        httpRequest.body.organizationId,
    );
    return {
      httpStatus: productContainer.status,
      jsonBody: productContainer.data,
    };
  };
};
