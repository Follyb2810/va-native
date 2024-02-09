import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  AppState,
  Button,
  StyleSheet,
  Image,
} from "react-native";
import { Provider as PaperProvider, Card } from "react-native-paper"; // Import Card from react-native-paper
import {
  getCurrentLocation,
  getWeatherData,
  requestPermissions,
} from "../../../utils/location";
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
} from "./../../../asets/images";
import Forcast from "../../../components/weather/Forcast";
import Accordions from "../../../components/weather/Forcast";

const Index = () => {
  const [location, setLocation] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(general);
  const [weatherData, setWeatherData] = useState({});
  const [locationPermissionDenied, setLocationPermissionDenied] =
    useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

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

  const fetchLocation = async () => {
    try {
      await requestPermissions();
      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);

      // Fetch weather data after getting location
      const data = await getWeatherData(
        currentLocation.latitude,
        currentLocation.longitude
      );
      setWeatherData(data);

      // Reset location permission denied state if previously denied
      setLocationPermissionDenied(false);
    } catch (error) {
      // Handle location permission denied
      console.error("Location permission denied:", error);
      setLocationPermissionDenied(true);
    }
  };

  const handlePermissionRequest = async () => {
    await requestPermissions();
    fetchLocation();
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    fetchLocation();

    // Cleanup function
    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === "active") {
      handlePermissionRequest();
    }
    setAppState(nextAppState);
  };

  useEffect(() => {
    if (weatherData?.current?.weather[0]?.icon) {
      const iconCode = weatherData.current.weather[0].icon;
      const iconImage = weatherIconMap[iconCode] || general;
      setWeatherIcon(iconImage);
    }
  }, [weatherData]);
  const weatherforcast = weatherData?.forecast?.list?.slice(0,7)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PaperProvider>
        {locationPermissionDenied ? (
          <View style={styles.centeredContainer}>
            <Text style={styles.errorText}>
              Location permission denied. Please enable location permissions.
            </Text>
            <Button title="Retry" onPress={handlePermissionRequest} />
          </View>
        ) : (
          <>
            <Text style={styles.locationText}>
              {location
                ? `Location: ${location.latitude}, ${location.longitude}`
                : "Loading..."}
            </Text>

            <Text style={styles.headingText}>Weather Information</Text>

            {weatherData && (
              <Card style={styles.weatherCard}>
                <Image source={weatherIcon} style={styles.weatherImage} />
                <Card.Content>
                  <Text style={styles.weatherText}>
                    Country: {weatherData?.current?.name},{" "}
                    {weatherData?.current?.sys?.country}
                  </Text>
                  <Text style={styles.weatherText}>
                    Temperature: {weatherData?.current?.main?.temp} °C
                  </Text>
                  <Text style={styles.weatherText}>
                    Description:{" "}
                    {weatherData?.current?.weather[0]?.description}
                  </Text>
                  <Text style={styles.weatherText}>
                    Wind Speed: {weatherData?.current?.wind?.speed} m/s
                  </Text>
                  <Text style={styles.weatherText}>
                    Humidity: {weatherData?.current?.main?.humidity}%
                  </Text>
                  <Text style={styles.weatherText}>
                    Pressure: {weatherData?.current?.main?.pressure} hPa
                  </Text>
                </Card.Content>
              </Card>
            )}
          </>
        )}
      </PaperProvider>
      
      <ScrollView> 
        <Accordions weatherforcast={weatherData?.forecast}/>  
    </ScrollView>
    </ScrollView>
  );
};

// {console.log(weatherData?.forecast?.list.slice(0,3))}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    marginBottom: 16,
    color: "#ff0000",
    fontSize: 16,
    textAlign: "center",
  },
  locationText: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  weatherCard: {
    marginVertical: 16,
    borderRadius: 8,
  },
  weatherImage: {
    height: 100,
    width: 100,
    alignSelf: "center",
    marginBottom: 16,
  },
  weatherText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
});

export default Index;




///! current
// {"base": "stations", "clouds": {"all": 20}, 
// "cod": 200, "coord": {"lat": 6.4761, "lon": 3.3542},
//  "dt": 1705749567, "id": 2332459, 
// "main": {"feels_like": 311.21, "humidity": 70, "pressure": 1015, "temp": 304.32, "temp_max": 304.32, "temp_min": 304.32},
//  "name": "Lagos", 
// "sys": {"country": "NG", "id": 1185, "sunrise": 1705730594, "sunset": 1705773071, "type": 1},
//  "timezone": 3600, "visibility": 4000, 
// "weather": [{"description": "haze", "icon": "50d", "id": 721, "main": "Haze"}],
//  "wind": {"deg": 340, "speed": 1.54}}

///! forcast
// Location permission granted
// LOG  Current location: {"latitude": 6.4761305, "longitude": 3.354163}
// LOG  {"city": {"coord": {"lat": 6.4761, "lon": 3.3542}, "country": "NG", "id": 2332459, "name": "Lagos", "population": 9000000, "sunrise": 1705730594, "sunset": 1705773071, "timezone": 3600}, 
// "cnt": 40, "cod": "200",
//  "list": [
//   {"clouds": [Object], "dt": 1705752000, "dt_txt": "2024-01-20 12:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]},
//   {"clouds": [Object], "dt": 1705762800, "dt_txt": "2024-01-20 15:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]},
//   {"clouds": [Object], "dt": 1705773600, "dt_txt": "2024-01-20 18:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]}, 
// {"clouds": [Object], "dt": 1705784400, "dt_txt": "2024-01-20 21:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]},
//  {"clouds": [Object], "dt": 1705795200, "dt_txt": "2024-01-21 00:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]}, 
// {"clouds": [Object], "dt": 1705806000, "dt_txt": "2024-01-21 03:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]},
//  {"clouds": [Object], "dt": 1705816800, "dt_txt": "2024-01-21 06:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]}, 
// {"clouds": [Object], "dt": 1705827600, "dt_txt": "2024-01-21 09:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]},
//  {"clouds": [Object], "dt": 1705838400, "dt_txt": "2024-01-21 12:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]},
//  {"clouds": [Object], "dt": 1705849200, "dt_txt": "2024-01-21 15:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]}, 
// {"clouds": [Object], "dt": 1705860000, "dt_txt": "2024-01-21 18:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]}, 
// {"clouds": [Object], "dt": 1705870800, "dt_txt": "2024-01-21 21:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]}, 
// {"clouds": [Object], "dt": 1705881600, "dt_txt": "2024-01-22 00:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]}, 
// {"clouds": [Object], "dt": 1705892400, "dt_txt": "2024-01-22 03:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]}, 
// {"clouds": [Object], "dt": 1705903200, "dt_txt": "2024-01-22 06:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]}, 
// {"clouds": [Object], "dt": 1705914000, "dt_txt": "2024-01-22 09:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]}, 
// {"clouds": [Object], "dt": 1705924800, "dt_txt": "2024-01-22 12:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]}, 
// {"clouds": [Object], "dt": 1705935600, "dt_txt": "2024-01-22 15:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]}, 
// {"clouds": [Object], "dt": 1705946400, "dt_txt": "2024-01-22 18:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]},
//  {"clouds": [Object], "dt": 1705957200, "dt_txt": "2024-01-22 21:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]},
//  {"clouds": [Object], "dt": 1705968000, "dt_txt": "2024-01-23 00:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]},
//  {"clouds": [Object], "dt": 1705978800, "dt_txt": "2024-01-23 03:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]}, 
// {"clouds": [Object], "dt": 1705989600, "dt_txt": "2024-01-23 06:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]}, 
// {"clouds": [Object], "dt": 1706000400, "dt_txt": "2024-01-23 09:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]},
//  {"clouds": [Object], "dt": 1706011200, "dt_txt": "2024-01-23 12:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]},
//  {"clouds": [Object], "dt": 1706022000, "dt_txt": "2024-01-23 15:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]}, 
// {"clouds": [Object], "dt": 1706032800, "dt_txt": "2024-01-23 18:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]},
//  {"clouds": [Object], "dt": 1706043600, "dt_txt": "2024-01-23 21:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]}, 
// {"clouds": [Object], "dt": 1706054400, "dt_txt": "2024-01-24 00:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]}, 
// {"clouds": [Object], "dt": 1706065200, "dt_txt": "2024-01-24 03:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]},
//  {"clouds": [Object], "dt": 1706076000, "dt_txt": "2024-01-24 06:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]},
//  {"clouds": [Object], "dt": 1706086800, "dt_txt": "2024-01-24 09:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]},
//  {"clouds": [Object], "dt": 1706097600, "dt_txt": "2024-01-24 12:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]}, 
// {"clouds": [Object], "dt": 1706108400, "dt_txt": "2024-01-24 15:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]}, 
// {"clouds": [Object], "dt": 1706119200, "dt_txt": "2024-01-24 18:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]}, 
// {"clouds": [Object], "dt": 1706130000, "dt_txt": "2024-01-24 21:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]}, 
// {"clouds": [Object], "dt": 1706140800, "dt_txt": "2024-01-25 00:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]}, 
// {"clouds": [Object], "dt": 1706151600, "dt_txt": "2024-01-25 03:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]}, 
// {"clouds": [Object], "dt": 1706162400, "dt_txt": "2024-01-25 06:00:00", "main": [Object], "pop": 0, "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]},
//  {"clouds": [Object], "dt": 1706173200, "dt_txt": "2024-01-25 09:00:00", "main": [Object], "pop": 0.2, "rain": [Object], "sys": [Object], "visibility": 10000, "weather": [Array], "wind": [Object]}], "message": 0}
