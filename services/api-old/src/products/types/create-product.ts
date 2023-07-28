import {User} from '../../main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {ProductDto} from '../dtos/ProductDto';
import {ErrorDto} from '../../main/dtos/ErrorDto';

export type CreateProductFunction = (
    requestingUser: User,
    name: string,
    organizationId: string,
) => Promise<StatusDataContainer<ProductDto | ErrorDto>>;
