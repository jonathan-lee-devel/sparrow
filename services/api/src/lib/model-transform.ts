import {IfAny, Types} from 'mongoose';

export type ModelTransformFunction = (
  _doc: Document & unknown extends { _id?: infer U } ?
    IfAny<U, { _id: Types.ObjectId }, Required<{ _id: U }>> :
    { _id: Types.ObjectId },
  ret: Record<string, any>) => void;

const deleteMongoIdentifierAndVersionKey = (ret: Record<string, any>) => {
  delete ret._id;
  delete ret.__v;
};

export const makeDefaultModelTransform = (): ModelTransformFunction => (
    _doc: Document & unknown extends
        { _id?: infer U } ?
        IfAny<U, { _id: Types.ObjectId }, Required<{ _id: U }>> :
        { _id: Types.ObjectId },
    ret: Record<string, any>): void => {
  deleteMongoIdentifierAndVersionKey(ret);
};

export const defaultModelTransform = makeDefaultModelTransform();

export const makeOrganizationSnippetModelTransform = (): ModelTransformFunction => (
    _doc: Document & unknown extends
    { _id?: infer U } ?
    IfAny<U, { _id: Types.ObjectId }, Required<{ _id: U }>> :
    { _id: Types.ObjectId },
    ret: Record<string, any>): void => {
  deleteMongoIdentifierAndVersionKey(ret);
  delete ret.administratorEmails;
  delete ret.memberEmails;
};

export const organizationSnippetModelTransform = makeOrganizationSnippetModelTransform();
