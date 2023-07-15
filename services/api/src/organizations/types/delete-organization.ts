import {User} from '../../main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {OrganizationDto} from '../dtos/OrganizationDto';

export type DeleteOrganizationFunction = (
    requestingUser: User,
    organizationId: string,
) => Promise<StatusDataContainer<OrganizationDto>>;
