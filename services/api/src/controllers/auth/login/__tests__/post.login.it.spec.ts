import request from 'supertest';
import app from '../../../../app';
import {HttpStatus} from '../../../../lib/enums/HttpStatus';

jest.mock('../../../../models/users/User');

describe('Test POST Login', () => {
  test('POST /auth/login with no details should return 401 Unauthorized', (done) => {
    request(app)
        .post('/auth/login')
        .expect(HttpStatus.UNAUTHORIZED, done);
  });
  test('POST /auth/login with incorrect config should return 500 Internal Server Error', (done) => {
    request(app)
        .post('/auth/login')
        .send({username: 'jonathan.lee.devel@gmail.com', password: 'password'})
        .expect(HttpStatus.INTERNAL_SERVER_ERROR, done);
  });
});
