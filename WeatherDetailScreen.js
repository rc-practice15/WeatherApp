import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Constants } from "expo";

export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = {
    title: "Weahter Information"
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const city = navigation.getParam("city", null);

    fetch(
      `http://10.0.2.2:8080/weather-crawler/current-weathers/by-city-name/${city}`
    )
      .then(Response => Response.json())
      .then(info => {
        this.setState({
          ...info,
          isLoading: false
        });
      });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text style={styles.loading}>데이터를 불러오는 중 입니다.</Text>
        </View>
      );
    }

    const celsius = this.state.main.temp - 273.15;
    const humidity = this.state.main.humidity;
    const weather = this.state.weather[0].main;
    const description = this.state.weather[0].description;

    return (
      <View style={styles.container}>

        <View style={styles.titleContainer}>
          <Text style={styles.weatherTitle}>날씨</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.weatherContent}>{weather} - {description}</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.weatherTitle}>온도</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.weatherContent}>{celsius.toFixed(1)}°C</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.weatherTitle}>습도</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.weatherContent}>{humidity}</Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight + 100
  },
  weatherTitle: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "darkcyan"
  },
  weatherContent: {
    fontSize: 15,
    textAlign: "center",
    color: "white"
  },
  titleContainer: {
    height: 40,
    justifyContent: "center",
    marginBottom: 5,

    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    backgroundColor: "powderblue"
  },
  contentContainer: {
    height: 30,
    justifyContent: "center",
    marginBottom: 20,

    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    backgroundColor: "skyblue"
  },
  loading: {
    textAlign: "center",
    fontSize: 23
  }
});
