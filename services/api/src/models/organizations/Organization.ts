import { model, Model, Schema } from 'mongoose';

export interface IOrganization extends Document {
  id: string;
  name: string;
  memberEmails: Array<string>;
  administratorEmails: Array<string>;
}

export interface IOrganizationModel extends Model<IOrganization> {}

const schema = new Schema<IOrganization>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: false },
  memberEmails: {},
  administratorEmails: {}
}, { timestamps: true });

const Organization: IOrganizationModel = model<IOrganization, IOrganizationModel>('Organization', schema);

export default Organization;
