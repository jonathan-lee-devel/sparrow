import {makeIndexHealthCheckCallback} from '../index-health-check';

describe('Cypress Health Check Callback Unit Tests', () => {
  it('When make health check callback Then defined function', async () => {
    // @ts-ignore
    const cypressHealthCheck = makeIndexHealthCheckCallback({});

    expect(cypressHealthCheck).toBeDefined();
    expect(cypressHealthCheck).toBeInstanceOf(Function);
  });
});
