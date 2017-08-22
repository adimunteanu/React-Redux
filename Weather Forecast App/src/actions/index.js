import axios from 'axios';

const API_KEY = 'e7865e76ccfb03f8182f64100de12601';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;
export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
    const url = `${ROOT_URL}&q=${city},de`;
    const request = axios.get(url);

    return {
        type: FETCH_WEATHER,
        payload: request
    };
}