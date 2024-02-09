// utils/location.js
import { PermissionsAndroid } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
const currents =
  "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";
const forcasts =
  "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
import * as Location from 'expo-location';


export const requestPermissions = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  
  export const getCurrentLocation = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = coords;
      console.log('Current location:', { latitude, longitude });
      return { latitude, longitude };
    } catch (error) {
      console.log('Error getting location:', error);
      throw error;
    }
  };
///! react native geolaction
export const requestPermissionsNative = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
        title: 'Location Permission',
        message: 'This app needs access to your location',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location permission granted');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
export const requestPermissionss = async () => {
  try {
    const { state } = await navigator.permissions.query({
      name: 'geolocation'
    });

    if (state === 'granted') {
      console.log('Location permission granted');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const getCurrentLocationNative = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.log('Current location:', { latitude, longitude });
        resolve({ latitude, longitude });
      },
      error => {
        console.log('Error getting location:', error);
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  });
};


import axios from 'axios';

const API_KEY = 'dda4db35af91075c626f93913b2bb4f0 ';
const current ='https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}'
const forcast = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}'

export const getWeatherData = async (latitude, longitude) => {
  try {
    const [currentResponse, forecastResponse] = await Promise.all([
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`),
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${API_KEY}`)
      ]);
      const currentWeather = currentResponse.data;
      const forecastData = forecastResponse.data;
      // console.log(currentWeather)
      // console.log(currentWeather)
      // console.log(forecastData)
      // console.log(forecastData?.list?.slice(0,1),'from list acccordion')
      // console.log(forecastData?.list?.slice(0,1),'from list acccordion')
  
      return { current: currentWeather, forecast: forecastData };

    // const response = await axios.get(
    //   `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    // );
    // return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error?.response);
    console.error('Error fetching weather data:', error?.message);
    throw error;
  }
};