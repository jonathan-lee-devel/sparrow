import request from 'supertest';
import app from '../../../../app';
import { HttpStatus } from '../../../../common/enums/HttpStatus';

jest.mock('../../../../models/users/User');

describe('Test POST Login', () => {
  test('POST /auth/login with no details should return 401 Unauthorized', done => {
    request(app).post('/auth/login')
      .expect(HttpStatus.UNAUTHORIZED, done);
  });
});
