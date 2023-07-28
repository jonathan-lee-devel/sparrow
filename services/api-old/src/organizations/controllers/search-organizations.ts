import {SearchOrganizationsFunction} from '../types/search-organizations';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeSearchOrganizationsController = (
    searchOrganizations: SearchOrganizationsFunction,
): HttpController => {
  return async function searchOrganizationsController(httpRequest: HttpRequest) {
    const organizationsContainer = await searchOrganizations(
        httpRequest.user,
        httpRequest.params.searchString,
    );
    return {
      httpStatus: organizationsContainer.status,
      jsonBody: organizationsContainer.data,
    };
  };
};
