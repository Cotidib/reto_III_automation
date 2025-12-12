const fetch = require('node-fetch');

/**
 * Simple HTTP client for making API requests
 */
class ApiClient {
  async get(url) {
    const response = await fetch(url);

    let data;
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: data
    };
  }
}

module.exports = new ApiClient();
