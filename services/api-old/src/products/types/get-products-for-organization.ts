import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {ProductDto} from '../dtos/ProductDto';

export type GetProductsForOrganizationFunction = (
    organizationId: string,
) => Promise<StatusDataContainer<ProductDto[]>>;
