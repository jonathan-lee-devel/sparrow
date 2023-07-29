import { model, Model, Schema } from 'mongoose';

export interface IOrganizationMembershipRequest extends Document {
  id: string;
  organizationId: string;
  requestingUserEmail: string;
  isApproved: boolean,
  approvingAdministratorEmail?: string;
}

export interface IOrganizationMembershipRequestModel extends Model<IOrganizationMembershipRequest> {}

const schema = new Schema<IOrganizationMembershipRequest>({
  id: { type: String, required: true, unique: true },
  organizationId: { type: String, required: true, unique: false },
  requestingUserEmail: { type: String, required: true, unique: false },
  isApproved: { type: Boolean, required: true, unique: false },
  approvingAdministratorEmail: { type: String, required: false, unique: false }
}, { timestamps: true });

const OrganizationMembershipRequest: IOrganizationMembershipRequestModel = model<IOrganizationMembershipRequest, IOrganizationMembershipRequestModel>('OrganizationMembershipRequest', schema);

export default OrganizationMembershipRequest;
