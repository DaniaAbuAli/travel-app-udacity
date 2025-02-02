import {app} from '../src/server/server'
import request from "supertest";
describe('GET /', () => {
    it('should return the index.html file', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toContain('<!doctype html>'); 
    });
  });