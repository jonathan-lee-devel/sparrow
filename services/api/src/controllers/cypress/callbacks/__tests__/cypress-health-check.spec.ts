import {makeCypressHealthCheckCallback} from '../cypress-health-check';

describe('Cypress Health Check Callback Unit Tests', () => {
  it('When make health check callback Then defined function', async () => {
    // @ts-ignore
    const cypressHealthCheck = makeCypressHealthCheckCallback({});

    expect(cypressHealthCheck).toBeDefined();
    expect(cypressHealthCheck).toBeInstanceOf(Function);
  });
});
