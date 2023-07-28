import {makeGetProductsForOrganizationController} from './get-products.js';
import {makeCreateProductController} from './create-product.js';
import {createProduct, getProductsForOrganization} from '../services/index.js';

export const getProductsForOrganizationController = makeGetProductsForOrganizationController(
    getProductsForOrganization,
);

export const createProductController = makeCreateProductController(createProduct);
