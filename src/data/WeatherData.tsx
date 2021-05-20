import { getCurrentLocation } from "../Location"
import { Temperature } from "../Temperature"
import { getWeatherIcon } from "../WeatherIconHelper"
import { weatherApiKey } from "../../ApiKeys"; //.gitignore this file for security purposes

export class RawWeatherData {
	daily?: RawDailyWeather[]
}

export class RawDailyWeather {
	dt?: number
	temp?: RawTemp
	date?: Date
	weather?: WeatherSummary[]
}

class RawTemp {
	min?: number
	max?: number
}

/** weather summary */
export class WeatherSummary {
	description?: string
	icon?: string
}

/** weather data for each day of a week */
export class DailyWeatherData {
	/** convert from raw api response */
	constructor(raw: RawDailyWeather) {
		if (raw) {
			this.maxTemp = new Temperature();
			if (raw.temp && raw.temp.max) this.maxTemp.fromKelvin(raw.temp?.max);
			if (raw.dt) this.date = new Date(1000 * raw.dt);
			if (raw.weather) {
				let iconId = raw.weather[0].icon;
				if (iconId)
					this.iconUrl = getWeatherIcon(iconId);
			}
		}
	}
	/** max temp for that day */
	maxTemp?: Temperature
	/** date */
	date?: Date
	/** weather icon */
	iconUrl?: string
}


/** request from server */
export async function getDailyWeather(): Promise<DailyWeatherData[] | undefined> {

	let location = await getCurrentLocation();
	let lat = location?.coords.latitude;
	let lon = location?.coords.longitude;

	//const currentWeatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey()}`;
	const endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weatherApiKey()}`

	let response = await fetch(endpoint);
	let parsed = await response.json();
	console.log(parsed);
	const raw: RawWeatherData = Object.assign(new RawWeatherData(), parsed);

	if (raw.daily) {
		let result = raw.daily?.map(x => {
			return new DailyWeatherData(x);

		});
		return result;

	}
	return undefined;
}