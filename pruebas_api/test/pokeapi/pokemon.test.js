const { expect } = require('chai');
const apiClient = require('../helpers/api-client');

const BASE_URL = 'https://pokeapi.co/api/v2';

describe('PokeAPI - Pokemon Endpoint', () => {

  describe('GET /pokemon/{name} - Successful requests', () => {

    it('should return pokemon details for valid pokemon name', async () => {
      const response = await apiClient.get(`${BASE_URL}/pokemon/pikachu`);

      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('name');
      expect(response.data.name).to.equal('pikachu');
      expect(response.data).to.have.property('id');
      expect(response.data).to.have.property('abilities');
    });

    it('should return pokemon by ID', async () => {
      const response = await apiClient.get(`${BASE_URL}/pokemon/1`);

      expect(response.status).to.equal(200);
      expect(response.data.name).to.equal('bulbasaur');
      expect(response.data.id).to.equal(1);
    });
  });

  describe('GET /pokemon/{name} - Error cases', () => {

    it('should return 404 for non-existent pokemon', async () => {
      const response = await apiClient.get(`${BASE_URL}/pokemon/nonexistentpokemon123`);

      expect(response.status).to.equal(404);
    });

    it('should return 404 for non-existent pokemon ID', async () => {
      const response = await apiClient.get(`${BASE_URL}/pokemon/99999`);

      expect(response.status).to.equal(404);
    });

    it('should return 404 for invalid format - mixed alphanumeric', async () => {
      const response = await apiClient.get(`${BASE_URL}/pokemon/123abc`);

      expect(response.status).to.equal(404);
    });
  });

  describe('GET /pokemon/{name} - Response validation', () => {

    it('should validate required fields in pokemon response', async () => {
      const response = await apiClient.get(`${BASE_URL}/pokemon/pikachu`);

      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('id');
      expect(response.data).to.have.property('name');
      expect(response.data).to.have.property('height');
      expect(response.data).to.have.property('weight');
      expect(response.data).to.have.property('abilities');
      expect(response.data).to.have.property('types');
      expect(response.data).to.have.property('stats');
    });

    it('should validate data types in pokemon response', async () => {
      const response = await apiClient.get(`${BASE_URL}/pokemon/pikachu`);

      expect(response.status).to.equal(200);
      expect(response.data.id).to.be.a('number');
      expect(response.data.name).to.be.a('string');
      expect(response.data.height).to.be.a('number');
      expect(response.data.weight).to.be.a('number');
      expect(response.data.abilities).to.be.an('array');
      expect(response.data.types).to.be.an('array');
      expect(response.data.stats).to.be.an('array');
    });
  });

  describe('GET /pokemon/{name} - Data-driven tests', () => {

    const firePokemon = [
      { name: 'charmander', expectedType: 'fire' },
      { name: 'charmeleon', expectedType: 'fire' },
      { name: 'charizard', expectedType: 'fire' },
      { name: 'vulpix', expectedType: 'fire' },
      { name: 'growlithe', expectedType: 'fire' }
    ];

    firePokemon.forEach(({ name, expectedType }) => {
      it(`should verify that ${name} is a ${expectedType} type pokemon`, async () => {
        const response = await apiClient.get(`${BASE_URL}/pokemon/${name}`);

        expect(response.status).to.equal(200);
        expect(response.data.name).to.equal(name);
        expect(response.data.types).to.be.an('array');

        const types = response.data.types.map(t => t.type.name);
        expect(types).to.include(expectedType);
      });
    });
  });

});
