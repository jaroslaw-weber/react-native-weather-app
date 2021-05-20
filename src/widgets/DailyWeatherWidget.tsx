
import React from "react";
import { View, Text, Image } from "react-native";
import tailwind from "tailwind-rn";
import moment from 'moment';
import { DailyWeatherData, getDailyWeather } from "../data/WeatherData";


/** data passed to widget */
interface DailyWeatherWidgetProps {

}

/** widget internal data */
interface DailyWeatherWidgetState {
	weather?: DailyWeatherData[],
}

/** part of the widget for single day */
function getSingleDayWidget(day: DailyWeatherData) {
	let tempMax = day.maxTemp?.celsius;
	let dateDisplay = moment(day.date).format("ddd");
	let iconUrl = day.iconUrl;

	return <div style={tailwind('flex flex-col mx-2 items-center justify-center ')}>
		< Text>{tempMax}°C </Text>
		< Text>{dateDisplay}</Text>
		<Image
			source={{
				uri: iconUrl,
			}}
			style={tailwind('w-12 h-12')}
		/>
	</div>
}


/**
* widget showing weather for each day of the week
*/
export class DailyWeatherWidget extends React.Component<DailyWeatherWidgetProps, DailyWeatherWidgetState> {

	constructor(props: DailyWeatherWidgetProps) {
		super(props)

		this.refresh();

		this.state = {
			weather: undefined
		};
	}
	async refresh() {

		let x = await getDailyWeather();


		this.setState({
			weather: x,
		});

	}
	render() {
		let dailyWeather = <Text>failed to get daily weather</Text>;
		let daily = this.state.weather;
		if (daily) {

			daily = daily.slice(0, 5)

			dailyWeather = <div style={tailwind('flex')}>
				{
					/** map each single day to react component */
					daily.map(day => getSingleDayWidget(day))
				}
			</div >
		}
		return (
			<View style={tailwind('')} >
				<div style={tailwind('flex flex-col h-full items-center')}>
					<Text style={tailwind('mt-4 mb-4 text-xl')}> this week</Text>
					{dailyWeather}
				</div>
			</ View >
		);
	}
}