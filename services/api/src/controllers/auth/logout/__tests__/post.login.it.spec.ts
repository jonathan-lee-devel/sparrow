import request from 'supertest';
import app from '../../../../app';
import { HttpStatus } from '../../../../common/enums/HttpStatus';

jest.mock('../../../../models/users/User');

describe('Test POST Logout', () => {
  test('POST /auth/logout with no session should return 401 Unauthorized', done => {
    request(app).post('/auth/logout')
      .expect(HttpStatus.UNAUTHORIZED, done);
  });
});
