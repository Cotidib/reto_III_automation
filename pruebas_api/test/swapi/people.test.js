const { expect } = require('chai');
const apiClient = require('../helpers/api-client');

const BASE_URL = 'https://swapi.info/api';

describe('SWAPI - People Endpoint', () => {

  describe('GET /people/{id} - Successful requests', () => {

    it('should return person details for valid ID', async () => {
      const response = await apiClient.get(`${BASE_URL}/people/1`);

      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('name');
      expect(response.data.name).to.equal('Luke Skywalker');
      expect(response.data).to.have.property('height');
      expect(response.data).to.have.property('mass');
      expect(response.data).to.have.property('hair_color');
    });

    it('should return person details for Darth Vader', async () => {
      const response = await apiClient.get(`${BASE_URL}/people/4`);

      expect(response.status).to.equal(200);
      expect(response.data.name).to.equal('Darth Vader');
    });

  });

  describe('GET /people/{id} - Error cases', () => {

    it('should return 404 for non-existent person ID', async () => {
      const response = await apiClient.get(`${BASE_URL}/people/999999`);

      expect(response.status).to.equal(404);
    });

    it('should return 404 for invalid format - mixed alphanumeric', async () => {
      const response = await apiClient.get(`${BASE_URL}/people/123abc`);

      expect(response.status).to.equal(404);
    });
  });

  describe('GET /people/{id} - Response validation', () => {

    it('should validate required fields in people response', async () => {
      const response = await apiClient.get(`${BASE_URL}/people/1`);

      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('name');
      expect(response.data).to.have.property('height');
      expect(response.data).to.have.property('mass');
      expect(response.data).to.have.property('hair_color');
      expect(response.data).to.have.property('skin_color');
      expect(response.data).to.have.property('eye_color');
      expect(response.data).to.have.property('birth_year');
      expect(response.data).to.have.property('gender');
    });

    it('should validate data types in people response', async () => {
      const response = await apiClient.get(`${BASE_URL}/people/1`);

      expect(response.status).to.equal(200);
      expect(response.data.name).to.be.a('string');
      expect(response.data.height).to.be.a('string');
      expect(response.data.mass).to.be.a('string');
      expect(response.data.hair_color).to.be.a('string');
      expect(response.data.skin_color).to.be.a('string');
      expect(response.data.eye_color).to.be.a('string');
      expect(response.data.birth_year).to.be.a('string');
      expect(response.data.gender).to.be.a('string');
    });
  });

  describe('GET /people/{id} - Data-driven tests', () => {

    const mainCharacters = [
      { id: 1, name: 'Luke Skywalker', gender: 'male' },
      { id: 2, name: 'C-3PO', gender: 'n/a' },
      { id: 3, name: 'R2-D2', gender: 'n/a' },
      { id: 4, name: 'Darth Vader', gender: 'male' },
      { id: 5, name: 'Leia Organa', gender: 'female' }
    ];

    mainCharacters.forEach(({ id, name, gender }) => {
      it(`should verify that character ${id} is ${name} with gender ${gender}`, async () => {
        const response = await apiClient.get(`${BASE_URL}/people/${id}`);

        expect(response.status).to.equal(200);
        expect(response.data.name).to.equal(name);
        expect(response.data.gender).to.equal(gender);
      });
    });
  });

});
