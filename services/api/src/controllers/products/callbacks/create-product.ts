import winston from 'winston';
import {AuthenticatedEndpointCallback} from '../../../lib/endpoint-util';
import {CreateProductRequestBody, CreateProductRequestQuery} from '../schemas/create-product';
import {GenerateIdFunction} from '../../../lib/generate-id';
import {Model} from 'mongoose';
import {Organization} from '../../../models/organizations/Organization';
import {Product} from '../../../models/products/Product';
import {HttpStatus} from '../../../lib/enums/HttpStatus';
import {ModelTransformFunction} from '../../../lib/model-transform/default-model-transform';

export const makeCreateProductCallback = (
    logger: winston.Logger,
    Organization: Model<Organization>,
    generateId: GenerateIdFunction,
    Product: Model<Product>,
    transform: ModelTransformFunction,
): AuthenticatedEndpointCallback<CreateProductRequestBody, CreateProductRequestQuery> => async (req, res) => {
  const requestingUserEmail = req.user.email;
  const {name, organizationId} = req.body;
  logger.info(`Request from <${requestingUserEmail}> to create product with name: ${name} for organization with ID: ${organizationId}`);

  const organization = await Organization.findOne({id: organizationId}).exec();
  if (!organization) {
    return res.status(HttpStatus.BAD_REQUEST).json({error: `Organization with ID: ${organizationId} does not exist`});
  }

  if (!organization.administratorEmails.includes(requestingUserEmail)) {
    return res.status(HttpStatus.FORBIDDEN).send();
  }

  const product = await Product.create({
    id: await generateId(),
    name,
    organizationId,
  });

  return res.status(HttpStatus.CREATED).json(product.toJSON({transform}));
};
