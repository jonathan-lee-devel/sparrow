import {AuthenticatedRequest, Response} from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import {HttpStatus} from '../../lib/enums/HttpStatus';
import {Model} from 'mongoose';
import {Product, ProductModel} from '../../models/products/Product';

export const makeGetHandler = (ProductModel: Model<Product>) => async (req: AuthenticatedRequest, res: Response) => {
  const {productId} = req.params;

  const product = await ProductModel.findOne({id: productId}, {__v: 0, _id: 0}).exec();
  if (!product) {
    return res.status(HttpStatus.NOT_FOUND).send();
  }

  return res.status(HttpStatus.OK).json(product.toJSON());
};

// @ts-ignore
export default requestMiddleware(makeGetHandler(ProductModel), {requiresAuthentication: true});
