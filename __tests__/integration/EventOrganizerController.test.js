import request from 'supertest';
import app from '../../src/app';
import { data } from '../mock/mocks';

describe('event organizer controller', () => {
  it('Should return a schedule for a event', async () => {
    const response = await request(app)
      .post('/api/organize/event')
      .send({ data })
      .expect(200);

    expect(response.body).toHaveProperty('data');
  });
});
