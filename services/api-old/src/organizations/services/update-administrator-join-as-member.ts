import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Organization} from '../models/Organization.js';
import {UpdateAdministratorJoinAsMemberFunction} from '../types/update-administrator-join-as-member.js';
import {returnForbidden, returnNotFound} from '../../common/use-cases/status-data-container/index.js';
import {User} from '../../main/models/User.js';
import {errorMessageToDto} from '../../common/use-cases/errors/index.js';
import {OrganizationMembershipStatus} from '../enums/OrganizationMembershipStatus.js';
import {HttpStatus} from '../../common/enums/HttpStatus.js';

export const makeUpdateAdministratorJoinAsMember = (
    logger: bunyan,
    OrganizationModel: Model<Organization>,
): UpdateAdministratorJoinAsMemberFunction => {
  return async function updateAdministratorJoinAsMember(
      requestingUser: User,
      toJoinOrganizationId: string,
      administratorEmailToUpdate: string,
  ) {
    logger.info(`Request for user with e-mail: <${administratorEmailToUpdate}> (admin) to become member of organization with ID: ${toJoinOrganizationId}`);
    const organizationModel = await OrganizationModel
        .findOne({id: toJoinOrganizationId}, {__v: 0}).exec();
    if (!organizationModel) {
      return returnNotFound();
    }
    if (!organizationModel.administratorEmails.includes(requestingUser.email)) {
      return returnForbidden();
    }
    if (organizationModel.memberEmails.includes(administratorEmailToUpdate)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: errorMessageToDto(`User is already a member of organization with ID: ${toJoinOrganizationId}`),
      };
    }
    organizationModel.memberEmails.push(administratorEmailToUpdate);
    await organizationModel.markModified('memberEmails');
    await organizationModel.save();
    return {
      status: HttpStatus.OK,
      data: {
        status: OrganizationMembershipStatus[OrganizationMembershipStatus.SUCCESS],
      },
    };
  };
};
