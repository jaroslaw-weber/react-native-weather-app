
import * as Location from 'expo-location';

export async function getCurrentLocation() {
	let { status } = await Location.requestForegroundPermissionsAsync();
	if (status !== 'granted') {
		//on permission not granted
		return undefined
	}

	let location = await Location.getCurrentPositionAsync({});
	return location;
}


export class Coordinates {
	/** lontitude */
	lon?: number
	/** latitude */
	lat?: number
}