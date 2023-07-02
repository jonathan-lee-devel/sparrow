import {GetProfileFunction} from '../types/get-profile.js';
import {HttpController} from '../../main/types/http-controller.js';
import {HttpRequest} from '../../main/types/http-request.js';

/**
 * HTTP controller for processing requests to get user profile.
 * @param getProfile function which actually processes the get profile request
 */
export const makeGetProfileController = (
    getProfile: GetProfileFunction,
): HttpController => {
  return async function getProfileController(httpRequest: HttpRequest) {
    const profileContainer = await getProfile(
        httpRequest.user,
        httpRequest.user.email,
    );
    return {
      httpStatus: profileContainer.status,
      jsonBody: profileContainer.data,
    };
  };
};
