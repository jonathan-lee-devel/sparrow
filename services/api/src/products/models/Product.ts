import mongoose from 'mongoose';

const {model, Schema} = mongoose;

export interface Product {
    id: string;
    name: string;
    organizationId: string;
}

const schema = new Schema<Product>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: false,
  },
  organizationId: {
    type: String,
    required: true,
    unique: false,
  },
});

export const ProductModel = model<Product>('Product', schema);
