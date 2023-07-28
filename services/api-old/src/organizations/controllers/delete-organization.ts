import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';
import {DeleteOrganizationFunction} from '../types/delete-organization';

export const makeDeleteOrganizationController = (
    deleteOrganization: DeleteOrganizationFunction,
): HttpController => {
  return async function deleteOrganizationController(httpRequest: HttpRequest) {
    const organizationContainer = await deleteOrganization(
        httpRequest.user,
        httpRequest.params.organizationId,
    );
    return {
      httpStatus: organizationContainer.status,
      jsonBody: organizationContainer.data,
    };
  };
};
