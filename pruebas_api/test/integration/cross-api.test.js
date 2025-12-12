const { expect } = require('chai');
const apiClient = require('../helpers/api-client');

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
const SWAPI_BASE_URL = 'https://swapi.info/api';

describe('Cross-API Integration Tests', () => {

  describe('Height Comparison - Dragon Pokemon vs Wookiee Characters', () => {

    it('should compare average height of dragon type pokemon with wookiee characters', async function() {
      // Get dragon type pokemon
      const dragonTypeResponse = await apiClient.get(`${POKEAPI_BASE_URL}/type/dragon`);
      expect(dragonTypeResponse.status).to.equal(200);

      // Filter and get first 5 dragon pokemon
      const dragonPokemonList = dragonTypeResponse.data.pokemon.slice(0, 5);
      const dragonHeights = [];

      for (const pokemonEntry of dragonPokemonList) {
        const pokemonName = pokemonEntry.pokemon.name;
        const pokemonResponse = await apiClient.get(`${POKEAPI_BASE_URL}/pokemon/${pokemonName}`);

        if (pokemonResponse.status === 200) {
          // Convert height to centimeters
          dragonHeights.push(pokemonResponse.data.height * 10);
        }
      }

      // Calculate average height for dragon pokemon
      const dragonAvgHeight = dragonHeights.reduce((sum, h) => sum + h, 0) / dragonHeights.length;

      // Get Wookie species
      const wookieSpeciesResponse = await apiClient.get(`${SWAPI_BASE_URL}/species/3`);
      expect(wookieSpeciesResponse.status).to.equal(200);
      expect(wookieSpeciesResponse.data.name).to.equal('Wookie');

      // Get all Wookie characters from the species endpoint
      const wookieeCharacters = [];
      for (const personUrl of wookieSpeciesResponse.data.people) {
        const personResponse = await apiClient.get(personUrl);
        if (personResponse.status === 200) {
          wookieeCharacters.push({
            name: personResponse.data.name,
            height: parseInt(personResponse.data.height)
          });
        }
      }

      // Calculate average height for wookiee characters
      const wookieeHeightsArray = wookieeCharacters.map(w => w.height);
      const wookieeAvgHeight = wookieeHeightsArray.reduce((sum, h) => sum + h, 0) / wookieeHeightsArray.length;

      // Log results
      console.log('\n--- Height Comparison Results ---');
      console.log(`Dragon Pokemon analyzed: ${dragonPokemonList.map(p => p.pokemon.name).join(', ')}`);
      console.log(`Dragon Pokemon heights (cm): ${dragonHeights.join(', ')}`);
      console.log(`Dragon Pokemon average height: ${dragonAvgHeight.toFixed(2)} cm`);
      console.log(`\nWookiee characters: ${wookieeCharacters.map(w => w.name).join(', ')}`);
      console.log(`Wookiee heights (cm): ${wookieeHeightsArray.join(', ')}`);
      console.log(`Wookiee average height: ${wookieeAvgHeight.toFixed(2)} cm`);
      console.log(`\nHeight difference: ${Math.abs(dragonAvgHeight - wookieeAvgHeight).toFixed(2)} cm`);
      console.log('--------------------------------\n');

      // Assertions
      expect(dragonHeights.length).to.be.greaterThan(0);
      expect(wookieeHeightsArray.length).to.be.greaterThan(0);
      expect(dragonAvgHeight).to.be.a('number');
      expect(wookieeAvgHeight).to.be.a('number');
      expect(dragonAvgHeight).to.be.greaterThan(0);
      expect(wookieeAvgHeight).to.be.greaterThan(0);

      // Compare averages
      if (dragonAvgHeight > wookieeAvgHeight) {
        console.log('Result: Dragon Pokemon are taller on average than Wookiees');
      } else if (wookieeAvgHeight > dragonAvgHeight) {
        console.log('Result: Wookiees are taller on average than Dragon Pokemon');
      } else {
        console.log('Result: Both have the same average height');
      }
    });
  });
});
