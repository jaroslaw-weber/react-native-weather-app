import { weatherApiKey } from "../../ApiKeys"; //.gitignore this file for security purposes
import { Coordinates, getCurrentLocation } from "../Location"
import { Temperature } from "../Temperature"
import { getWeatherIcon } from "../WeatherIconHelper"
import { WeatherSummary } from "./WeatherData";



/** main weather data */
class RawCurrentWeatherMainData {
	/** current temperature */
	temp?: number
	/** how temperature feels like (may deviate from raw temperature) */
	feels_like?: number
}

/** raw current weather response (parsed) */
export class RawCurrentWeatherData {
	/** main weather data */
	main?: RawCurrentWeatherMainData
	/** cloud data */
	clouds?: RawCurrentWeatherClouds
	/** location name */
	name?: string
	/** weather summary */
	weather?: WeatherSummary[]
	/** datetime */
	dt?: number
	/** coordinates */
	coord?: Coordinates
}

/** cloud data */
class RawCurrentWeatherClouds {
	/** how much cloudy (%) */
	all?: number
}


/**
 * current weather
 * improved structure over raw api response
 */
export class CurrentWeatherData {

	/** pass raw api response */
	constructor(raw: RawCurrentWeatherData) {
		this.cityName = raw.name;
		let rawCurrentTemp = raw.main?.temp;
		if (rawCurrentTemp) {
			let currentTemp = new Temperature();
			currentTemp.fromKelvin(rawCurrentTemp);
			this.temperature = currentTemp
		}
		let feels = raw.main?.feels_like;
		if (feels) {
			let temp = new Temperature();
			temp.fromKelvin(feels);
			this.feelsLike = temp;
		}
		if (raw.weather) {
			this.description = raw.weather[0].description;
			let iconId = raw.weather[0].icon;
			if (iconId) {
				this.iconUrl = getWeatherIcon(iconId);
			}
		}

		this.clouds = raw.clouds?.all;
		this.timestamp = new Date();
		this.coord = raw.coord;
	}
	/** location name */
	cityName?: string
	/** current raw temperature */
	temperature?: Temperature
	/** what the temperature feels like */
	feelsLike?: Temperature
	/** how much cloudy is the weather. value: 1-100 (%) */
	clouds?: number
	/** weather description, example: "sunny" */
	description?: string
	/** timestamp */
	timestamp?: Date
	/** icon url. used for displaying sun/cloud/rain icons */
	iconUrl?: string
	/** coordinates */
	coord?: Coordinates
}

/** request from server */
export async function getCurrentWeather(): Promise<CurrentWeatherData> {

	let location = await getCurrentLocation();
	let lat = location?.coords.latitude;
	let lon = location?.coords.longitude;

	const currentWeatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey()}`;

	let response = await fetch(currentWeatherEndpoint);
	let parsed = await response.json();
	console.log(parsed);
	const raw: RawCurrentWeatherData = Object.assign(new RawCurrentWeatherData(), parsed);
	const result = new CurrentWeatherData(raw);
	return result

}