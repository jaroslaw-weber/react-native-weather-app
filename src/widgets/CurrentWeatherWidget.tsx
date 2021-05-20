import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View, Text, Image } from "react-native";
import tailwind from "tailwind-rn";
import { CurrentWeatherData, getCurrentWeather } from "../data/CurrentWeatherData";

/** data passed to widget */
interface CurrentWeatherWidgetProps {

}

/** widget internal data */
interface CurrentWeatherWidgetState {
	currentWeather?: CurrentWeatherData,
}


/**
* widget showing current weather
*/
export class CurrentWeatherWidget extends React.Component<CurrentWeatherWidgetProps, CurrentWeatherWidgetState> {

	constructor(props: CurrentWeatherWidgetProps) {
		super(props)

		this.refresh();

		this.state = {
			currentWeather: undefined,

		};
	}
	getMapUrl(lon: number, lat: number) {
		return `https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${lat},${lon}+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`;

	}
	async refresh() {
		let x = await getCurrentWeather();
		this.setState({
			currentWeather: x,
		});
	}
	render() {
		return (
			<View style={tailwind('')} >
				<div style={tailwind('flex flex-col h-full items-center')}>
					<Text style={tailwind('text-3xl')}>{this.state.currentWeather?.cityName}</Text>
					<Image
						source={{
							uri: this.state.currentWeather?.iconUrl,
						}}
						style={tailwind('w-20 h-20')}
					/>
					<Text style={tailwind(`mt-2 text-3xl`)}>
						{this.state.currentWeather?.temperature?.celsius}°C
					</Text>
					<Text style={tailwind('mt-2 text-lg')}>
						{this.state.currentWeather?.description}
					</Text>
					<Text style={tailwind(`mt-2`)}>
						clouds: {this.state.currentWeather?.clouds}%
					</Text>
					<Text style={tailwind('text-gray-400 text-sm mt-2')}>
						{this.state.currentWeather?.timestamp?.toTimeString()}
					</Text>

					<button style={tailwind('bg-indigo-600 text-white px-2 pl-4 rounded border-none  mt-2 flex items-center')}
						onClick={this.refresh.bind(this)}>
						<p style={tailwind('')}>refresh</p>
						<FontAwesomeIcon icon={faSync} style={tailwind('text-white ml-4 pr-2')} />
					</button>
					<Text style={tailwind(`mt-2 text-gray-400`)}>lon: {this.state.currentWeather?.coord?.lon} lat: {this.state.currentWeather?.coord?.lat}</Text>

				</div>
			</ View >
		);
	}
}