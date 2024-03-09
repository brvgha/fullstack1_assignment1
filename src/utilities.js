import axios from "axios";
import dotenv from "dotenv";
// import Client from "@googlemaps/google-maps-services-js"

const result = dotenv.config();

export const removeCity = async (name) => {
    name = name.replace("City", "");
    return name
}

export const getWeather = async (name) => {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.openweatherapi_key}`);
    return response.data.weather[0].main;
}

export const getTemp = async (name) => {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.openweatherapi_key}`);
    return response.data.main.temp - 273.15; // convert from Kelvin
}

export const getMinTemp = async (name) => {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.openweatherapi_key}`);
    return response.data.main.temp_min - 273.15; // convert from Kelvin
}
export const getMaxTemp = async (name) => {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.openweatherapi_key}`);
    return response.data.main.temp_max - 273.15; // convert from Kelvin
}

export const getWindSpeed = async (name) => {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.openweatherapi_key}`);
    return response.data.wind.speed;
}

export const getWindDirection= async (name) => {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.openweatherapi_key}`);
    return response.data.wind.deg;
}

export const getHumidity= async (name) => {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.openweatherapi_key}`);
    return response.data.main.humidity;
}

export const getLat= async (name) => {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.openweatherapi_key}`);
    return response.data.coord.lat;
}

export const getLng= async (name) => {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.openweatherapi_key}`);
    return response.data.coord.lon;
}

export const celsiusToFahr = async (temp) => (temp * 9 / 5) + 32

export const convertDegToDirection = async (deg) => {
    const i = 22.5;
    if (deg >= i*0 && deg < i)
       { return "N"}
    if (deg >= i && deg < i*2)
       { return "NNE"}
    if (deg >= i*2 && deg < i*3)
        {return "ENE"}
    if (deg >= i*3 && deg < i*4)
        {return "E"}
    if (deg >= i*4 && deg < i*5)
        {return "ESE"}
    if (deg >= i*5 && deg < i*6)
       { return "SE"}
    if (deg >= i*6 && deg < i*7)
        {return "SSE"}
    if (deg >= i*7 && deg < i*8)
        {return "S"}
    if (deg >= i*8 && deg < i*9)
        {return "SSW"}
    if (deg >= i*9 && deg < i*10)
        {return "SW"}
    if (deg >= i*10 && deg < i*11)
       { return "WSW"}
    if (deg >= i*11 && deg < i*12)
        {return "W"}
    if (deg >= i*12 && deg < i*13)
        {return "WNW"}
    if (deg >= i*13 && deg < i*14)
        {return "NW"}
    if (deg >= i*14 && deg < i*15)
       { return "NNW"}
    if (deg >= i*15 && deg < i*16)
        {return "N"}
    return null;
}

export const getMapData = async (lat, lng) => {
    const client = new Client({});
    const res = await client.geocode({
        params: {
            latlng: { lat, lng },
            key: (process.env.googlemapsapi_key),
        }
    });
}

export const addWeatherMeticsToPlaceMark = async (placemark) => {
    const updatedName = await removeCity(placemark.name)
    placemark.weather = await getWeather(updatedName);
    placemark.temp = Number((await getTemp(updatedName)).toFixed(2));
    placemark.tempF = Number((await celsiusToFahr(placemark.temp)).toFixed(2));
    placemark.min_temp = Number((await getMinTemp(updatedName)).toFixed(2));
    placemark.max_temp = Number((await getMaxTemp(updatedName)).toFixed(2));
    placemark.wind_speed = Number((await getWindSpeed(updatedName)).toFixed(2));
    placemark.wind_direction_deg = await getWindDirection(updatedName);
    placemark.wind_direction_txt = await convertDegToDirection(placemark.wind_direction_deg);
    placemark.humidity = Number((await getHumidity(updatedName)).toFixed(2));
    placemark.lat = await getLat(updatedName);
    placemark.lng = await getLng(updatedName);
    return placemark;
}