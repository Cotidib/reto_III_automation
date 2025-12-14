import http from 'k6/http'

export const options = {
    vus: 1,
    duration: '10s',
    summaryTrendStats: ['avg', 'min', 'max']
};

const departamentos = ['Montevideo', 'Canelones', 'Maldonado'];

export default() => {
    const apiKey = __ENV.WEATHER_API_KEY;
    console.log(apiKey)

    const location = departamentos[Math.floor(Math.random() * departamentos.length)];

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

    const response = http.get(url);
    console.log(`Departamento: ${location} | Status: ${response.status}`);
}
