import {User} from '../../main/models/User.js';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer.js';
import {OrganizationSnippetDto} from '../dtos/OrganizationSnippetDto.js';

export type SearchOrganizationsFunction = (
    requestingUser: User,
    searchString: string,
) => Promise<StatusDataContainer<OrganizationSnippetDto[]>>;
