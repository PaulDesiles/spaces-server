const request = require('supertest');
const app = require('../../app');
const { setupDatabase } = require('../databaseTestHelper');

setupDatabase('drawing-tests');

const drawing = {
	shapes: [
		{ points: [{x: 10, y: 10}, {x: 80, y: 40}, {x: 50, y: 90}] },
		{ points: [{x: 20, y: 20}, {x: 80, y: 40}, {x: 50, y: 90}] }
	],
	parameters: {
		width: 1000,
		height: 600,
		gap: 10
	}
};

describe('EndToEnd drawing tests', () => {

	test('create and retrieve', async () => {
		const postDrawing = await request(app)
			.post('/drawing')
			.send(drawing);
		expect(postDrawing.statusCode).toBe(201);
		const id = postDrawing.body.publicId;
		expect(id).toBeDefined();

		const getDrawing = await request(app).get(`/drawing/${id}`);
		expect(getDrawing.statusCode).toBe(200);
		expect(getDrawing.body.publicId).toBe(id);
		expect(getDrawing.body.shapes).toMatchObject(drawing.shapes);
		expect(getDrawing.body.parameters).toEqual(drawing.parameters);
	});

	test('create, update and retrieve', async () => {
		const postDrawing = await request(app)
			.post('/drawing')
			.send(drawing);

		expect(postDrawing.statusCode).toBe(201);
		const id = postDrawing.body.publicId;
		expect(id).toBeDefined();

		const getDrawing = await request(app).get(`/drawing/${id}`);
		expect(getDrawing.statusCode).toBe(200);
		const firstShapeId = getDrawing.body.shapes[0]._id;
		const secondShapeId = getDrawing.body.shapes[1]._id;

		const putDrawing = await request(app)
			.patch(`/drawing/${id}`)
			.send({
				removeShapeIds: [firstShapeId],
				addShapes: [
					{ points: [{x: 30, y: 30}, {x: 80, y: 40}, {x: 50, y: 90}] },
					{ points: [{x: 40, y: 40}, {x: 80, y: 40}, {x: 50, y: 90}] }
				]
			});
		expect(putDrawing.statusCode).toBe(200);

		const getDrawing2 = await request(app).get(`/drawing/${id}`);
		expect(getDrawing2.body.shapes).toHaveLength(3);
		expect(getDrawing2.body.shapes.find(s => s._id === firstShapeId)).toBeUndefined();
		expect(getDrawing2.body.shapes.find(s => s._id === secondShapeId)).toBeDefined();
		expect(getDrawing2.body.shapes.find(s => s.points[0].x === 30)).toBeDefined();
		expect(getDrawing2.body.shapes.find(s => s.points[0].x === 40)).toBeDefined();
	});
});
