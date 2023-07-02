import {expect, it, describe} from '@jest/globals';
import {makeCreateOrganizationController} from '../create-organization';

describe('Create Organization', () => {
  it('Example Test', async () => {
    const createOrganizationController = makeCreateOrganizationController(
        // @ts-ignore
        () => {},
    );

    expect(createOrganizationController).not.toBeNull();
    expect(createOrganizationController).toBeInstanceOf(Function);
  });
});
