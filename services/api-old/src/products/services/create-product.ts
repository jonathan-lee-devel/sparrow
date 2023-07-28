import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {GenerateIdFunction} from '../../util/id/types/generate-id.js';
import {CreateProductFunction} from '../types/create-product.js';
import {User} from '../../main/models/User.js';
import {Product} from '../models/Product.js';
import {DEFAULT_ID_LENGTH} from '../../util/id/constants/default-id-length.js';
import {HttpStatus} from '../../common/enums/HttpStatus.js';
import {Organization} from '../../organizations/models/Organization.js';
import {errorMessageToDto} from '../../common/use-cases/errors/index.js';
import {returnForbidden} from '../../common/use-cases/status-data-container/index.js';

export const makeCreateProduct = (
    logger: bunyan,
    generateId: GenerateIdFunction,
    OrganizationModel: Model<Organization>,
    ProductModel: Model<Product>,
): CreateProductFunction => {
  return async function createProduct(
      requestingUser: User,
      name: string,
      organizationId: string,
  ) {
    const organizationModel = await OrganizationModel.findOne({id: organizationId}, {__v: 0}).exec();
    if (!organizationModel) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: errorMessageToDto(`Corresponding organization with ID: ${organizationId} not found`),
      };
    }
    if (!organizationModel.administratorEmails.includes(requestingUser.email)) {
      return returnForbidden();
    }
    const product: Product = {
      id: await generateId(DEFAULT_ID_LENGTH),
      name,
      organizationId,
    };

    await ProductModel.create(product);
    logger.info(`POST new product with ID: ${product.id}`);

    return {
      status: HttpStatus.CREATED,
      data: {
        ...product,
      },
    };
  };
};
