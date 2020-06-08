const request = require('supertest');
const app = require('../../app');

describe('id generator response type', () => {
	test('should return', async () => {
		const response = await request(app).get('/generateid');
		expect(response.statusCode).toBe(200);
	});

	test('should have a json content-type header', async () => {
		const response = await request(app).get('/generateid');
		expect(response.header['content-type']).toBe('application/json; charset=utf-8');
	});

	test('should be a json', async () => {
		const response = await request(app).get('/generateid');
		expect(response.body).toBeDefined();
	});
});

describe('id generator response content', () => {
	test('should return a 10 char id', async () => {
		const response = await request(app).get('/generateid');
		expect(response.body.id).toBeDefined();
		expect(response.body.id).toHaveLength(20);
	});

	test('should not return any other property', async () => {
		const response = await request(app).get('/generateid');
		expect(response.body).toMatchObject({id: response.body.id});
	});

	test('should return unique ids', async () => {
		const firstId = (await request(app).get('/generateid')).body.id;
		const secondId = (await request(app).get('/generateid')).body.id;
		expect(firstId).not.toEqual(secondId);
	});
});
