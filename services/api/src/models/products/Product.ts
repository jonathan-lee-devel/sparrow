import {
  Document, model, Model, Schema
} from 'mongoose';

export interface IProduct extends Document {
  id: string;
  name: string;
  organizationId: string;
}

export interface IProductModel extends Model<IProduct> {}

const schema = new Schema<IProduct>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: false },
  organizationId: { type: String, required: true, unique: false }
}, { timestamps: true });

const Product: IProductModel = model<IProduct, IProductModel>('Product', schema);

export default Product;
