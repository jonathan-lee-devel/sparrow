import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Product} from '../models/Product.js';
import {GetProductsForOrganizationFunction} from '../types/get-products-for-organization.js';
import {returnNotFound} from '../../common/use-cases/status-data-container/index.js';
import {ProductDto} from '../dtos/ProductDto.js';
import {HttpStatus} from '../../common/enums/HttpStatus.js';

export const makeGetProductsForOrganization = (
    logger: bunyan,
    ProductModel: Model<Product>,
): GetProductsForOrganizationFunction => {
  return async function getProductsForOrganization(
      organizationId: string,
  ) {
    const productModels = await ProductModel.find({organizationId}, {__v: 0}).exec();
    if (!productModels) {
      return returnNotFound();
    }

    const productDtos: ProductDto[] = [];
    for (const productModel of productModels) {
      productDtos.push({
        id: productModel.id,
        name: productModel.name,
      });
    }

    logger.info(`GET products for organization with ID: ${organizationId}`);
    return {
      status: HttpStatus.OK,
      data: productDtos,
    };
  };
};
