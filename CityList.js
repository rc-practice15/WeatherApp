import React from "react";
import { Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Constants } from "expo";

export default class CityList extends React.Component {
  static navigationOptions = {
    title: 'Cities',
  };

  constructor(props) {
    super(props);

    this.state = {
      cities: []
    };
  }

  componentDidMount() {
    fetch("http://10.0.2.2:8080/weather-crawler/available-cities")
      .then(Response => Response.json())
      .then(cities => {
        console.log("cities =", cities.length);
        this.setState({
          cities
        });
      });
  }

  onPressCity(item) {
    this.props.navigation.navigate(
      'Detail',
      {
        city: item
      }
    )
  }

  renderItem(city) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => this.onPressCity(city)}
      >
        <Text style={styles.text}>{city}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        renderItem={({ item }) => this.renderItem(item)}
        keyExtractor={item => item}
        data={this.state.cities}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight - 15,

    borderColor: "white",
    borderWidth: 2
  },

  item: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    marginBottom: 5,

    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    backgroundColor: "powderblue"
  },

  text: {
    fontSize: 20,
    textAlign: "center",
    color: "darkcyan"
  }
});
