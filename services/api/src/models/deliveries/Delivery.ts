import { model, Model, Schema } from 'mongoose';

export interface IDelivery extends Document {
  id: string;
  creatorEmail: string;
  assignedDriverEmail: string;
  organizationId: string;
  productId: string;
  customerId: string;
  details: string;
  isDelivered: boolean;
}

export interface IDeliveryModel extends Model<IDelivery> {}

const schema = new Schema<IDelivery>({
  id: { type: String, required: true, unique: true },
  creatorEmail: { type: String, required: true, unique: false },
  assignedDriverEmail: { type: String, required: true, unique: false },
  organizationId: { type: String, required: true, unique: false },
  productId: { type: String, required: true, unique: false },
  customerId: { type: String, required: true, unique: false },
  details: { type: String, required: true, unique: false },
  isDelivered: { type: Boolean, required: true, unique: false }
}, { timestamps: true });

const Delivery: IDeliveryModel = model<IDelivery, IDeliveryModel>('Delivery', schema);

export default Delivery;
