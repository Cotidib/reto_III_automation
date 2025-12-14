import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
    summaryTrendStats: ['avg', 'min', 'max'],

    scenarios: {
        montevideo_test: {
            executor: 'constant-vus',
            vus: 2,
            duration: '10s',
            tags: { departamento: 'Montevideo' },
            env: { LOCATION: 'Montevideo' }
        },

        canelones_test: {
            executor: 'constant-vus',
            vus: 1,
            duration: '10s',
            tags: { departamento: 'Canelones' },
            env: { LOCATION: 'Canelones' },
            startTime: '0s'
        },

        maldonado_test: {
            executor: 'constant-vus',
            vus: 1,
            duration: '10s',
            tags: { departamento: 'Maldonado' },
            env: { LOCATION: 'Maldonado' },
            startTime: '5s'
        }
    }
};

export default function() {
    const apiKey = __ENV.WEATHER_API_KEY;

    const location = __ENV.LOCATION;

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

    const response = http.get(url);
    console.log(`[${location}] Status: ${response.status} | Duration: ${response.timings.duration}ms`);

    sleep(1);
}
