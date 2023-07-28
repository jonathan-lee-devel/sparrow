import { Request, Response } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Product, { IProductModel } from '../../models/products/Product';
import { HttpStatus } from '../../common/enums/HttpStatus';

export const makeGetHandler = (ProductModel: IProductModel) => async (req: Request, res: Response) => {
  const { productId } = req.params;

  const product = await ProductModel.findOne({ id: productId }, { __v: 0, _id: 0 }).exec();
  if (!product) {
    return res.status(HttpStatus.NOT_FOUND).send();
  }

  return res.status(HttpStatus.OK).json(product.toJSON());
};

export default requestMiddleware(makeGetHandler(Product));
