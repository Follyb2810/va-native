import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Collapsible from 'react-native-collapsible';
import {
  d10n,
  d01d,
  d01n,
  d02d,
  d02n,
  d03d,
  d03n,
  d04d,
  d04n,
  d09d,
  d09n,
  d10d,
  d11d,
  d11n,
  d13d,
  d13n,
  d50d,
  general,
  d50n,
} from "./../../asets/images";

const Accordions = ({ weatherforcast }) => {
  const Week_Days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  const getDay = new Date().getDay();
  const forcastDays = Week_Days.slice(getDay, Week_Days.length).concat(Week_Days.slice(0, getDay));

  const weatherIconMap = {
    "01d": d01d,
    "01n": d01n,
    "02d": d02d,
    "02n": d02n,
    "03d": d03d,
    "03n": d03n,
    "04d": d04d,
    "04n": d04n,
    "09d": d09d,
    "09n": d09n,
    "10d": d10d,
    "10n": d10n,
    "11d": d11d,
    "11n": d11n,
    "13d": d13d,
    "13n": d13n,
    "50d": d50d,
    "50n": d50n,
  };

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <View style={styles.container}>
      {weatherforcast?.list?.slice(0, 7).map((item, indx) => (
        <View key={indx}>
          <TouchableOpacity style={styles.header} onPress={() => toggleAccordion(indx)}>
            <Text style={styles.title}>{forcastDays[indx]}</Text>
            <Text style={styles.title}>{item.main.temp_min}°C/{item.main.temp_max}°C</Text>
            <Image source={weatherIconMap[item.weather[0]?.icon] || general} style={styles.weatherImage} />
          </TouchableOpacity>
          <Collapsible align="center" collapsed={activeIndex !== indx}>
            <View style={styles.content}>
              <Text>Content for {forcastDays[indx]}</Text>
              <Text style={styles.weatherText}>Temperature: {item?.main?.temp} °C</Text>
              <Text style={styles.weatherText}>Description: {item?.weather[0]?.description}</Text>
              <Text style={styles.weatherText}>Wind Speed: {item?.wind?.speed} m/s</Text>
              <Text style={styles.weatherText}>Humidity: {item?.main?.humidity}%</Text>
              <Text style={styles.weatherText}>Pressure: {item?.main?.pressure} hPa</Text>
            </View>
          </Collapsible>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
    backgroundColor: '#fff',
  },
  weatherText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  weatherImage: {
    width: 50,
    height: 50,
  },
});

export default Accordions;








