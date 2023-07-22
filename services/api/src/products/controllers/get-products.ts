import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';
import {GetProductsForOrganizationFunction} from '../types/get-products-for-organization';

export const makeGetProductsForOrganizationController = (
    getProductsForOrganization: GetProductsForOrganizationFunction,
): HttpController => {
  return async function getProductsForOrganizationController(httpRequest: HttpRequest) {
    const productsContainer = await getProductsForOrganization(
        httpRequest.params.organizationId,
    );

    return {
      httpStatus: productsContainer.status,
      jsonBody: productsContainer.data,
    };
  };
};
