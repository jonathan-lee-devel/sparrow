import { makeTestFunction } from '../add';

describe('Test', () => {
  it('This is a test', async () => {
    const testFunction = makeTestFunction();

    expect(testFunction).not.toBeNull();
    expect(testFunction).toBeInstanceOf(Function);
    expect(await testFunction()).toStrictEqual(0);
  });
});
