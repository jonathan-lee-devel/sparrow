import {makeGetProductsForOrganization} from './get-products.js';
import {makeCreateProduct} from './create-product.js';
import {loggerConfig} from '../../main/config/logger/logger-config.js';
import {generatedId} from '../../util/id/services/index.js';
import {OrganizationModel} from '../../organizations/models/Organization.js';
import {ProductModel} from '../models/Product.js';

const logger = loggerConfig();

export const getProductsForOrganization = makeGetProductsForOrganization(logger, ProductModel);

export const createProduct = makeCreateProduct(logger, generatedId, OrganizationModel, ProductModel);
