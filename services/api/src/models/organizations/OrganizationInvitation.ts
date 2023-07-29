import { model, Model, Schema } from 'mongoose';

export interface IOrganizationInvitation extends Document {
  id: string;
  organizationId: string;
  requestingUserEmail: string;
  emailToInvite: string;
  isAccepted: boolean;
  value: string;
  expiryDate: Date;
}

export interface IOrganizationInvitationModel extends Model<IOrganizationInvitation> {}

const schema = new Schema<IOrganizationInvitation>({
  id: { type: String, required: true, unique: true },
  organizationId: { type: String, required: true, unique: false },
  requestingUserEmail: { type: String, required: true, unique: false },
  emailToInvite: { type: String, required: true, unique: false },
  isAccepted: { type: Boolean, required: true, unique: false },
  value: { type: String, required: true, unique: true },
  expiryDate: { type: Date, required: true, unique: false }
}, { timestamps: true });

const OrganizationInvitation: IOrganizationInvitationModel = model<IOrganizationInvitation, IOrganizationInvitationModel>('OrganizationInvitation', schema);

export default OrganizationInvitation;
