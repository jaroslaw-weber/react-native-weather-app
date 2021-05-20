import React from 'react';
import { View } from 'react-native';
import tailwind from 'tailwind-rn';
import { CurrentWeatherWidget } from './src/widgets/CurrentWeatherWidget';
import { DailyWeatherWidget } from './src/widgets/DailyWeatherWidget';

/** main app file */
export default function App() {
  return (
    <View style={tailwind('h-full p-4')}>
      <CurrentWeatherWidget />
      <DailyWeatherWidget />
    </ View>
  );
}