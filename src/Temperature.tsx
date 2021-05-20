
var temperatureConverter = require('temp-units-conv');
const toCelsius = temperatureConverter.k2c;

/**
 * temperature
 * can convert to different systems
 */
export class Temperature {
	kelvin: number
	celsius: number
	constructor() {
		//temporary values
		this.kelvin = 0;
		this.celsius = 0;
	}
	/** convert kelvin temperature to Temperature class
	 * act as constructor
	 */
	fromKelvin(kelvinTemp: number) {
		let rounded = Math.round(kelvinTemp);
		this.kelvin = rounded;
		this.celsius = Math.round(toCelsius(kelvinTemp));

	}
}
