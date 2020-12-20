import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BUSSTOP_NUMBER = "93069";
const BUS_NUMBER = "14";
const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=" + BUSSTOP_NUMBER;
const LOADING_INTERVAL = 60000;

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");

  function loadBusStopData() {
    //Turn on the loading indictor each time
    setLoading(true);

    fetch(BUSSTOP_URL)
      .then((response) => response.json())
      .then((responseData) => {
        //console.log(responseData)

        const myBus = responseData.services.filter(
          (item) => item.no === BUS_NUMBER
        )[0];
        //console.log("My bus:");
        console.log(myBus);

        //setArrival(myBus.next.time);
        //change arrival duration from milliseconds to mintues and seconds
        const duration_s = Math.floor(myBus.next["duration_ms"] / 1000); // same as myBus.next.duration_ms
        const minutes = Math.floor(duration_s / 60);
        const seconds = duration_s % 60;
        if (duration_s < 0) {
          setArrival(`Bus has arrived`);
        } else {
          setArrival(`${minutes} minutes & ${seconds} seconds`);
        }
        setLoading(false);
      });
  }

  useEffect(() => {
    loadBusStopData(); //need to call it once at start to show timing immediately
    const interval = setInterval(loadBusStopData, LOADING_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus {BUS_NUMBER} arrival time</Text>
      <Text style={styles.title}>Siglap BusStop {BUSSTOP_NUMBER}:</Text>
      <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator size="large" color="red" /> : arrival}
      </Text>
      <TouchableOpacity onPress={loadBusStopData} style={styles.button}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 32,
    marginBottom: 24,
    textAlign: "center",
  },
  arrivalTime: {
    fontSize: 64,
    marginBottom: 32,
    textAlign: "center",
  },
  button: {
    padding: 20,
    backgroundColor: "darkgreen",
    borderRadius: 18,
  },
  buttonText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
});
