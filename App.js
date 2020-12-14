import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=93069";

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
          (item) => item.no === "14"
        )[0];
        //console.log("My bus:");
        //console.log(myBus);
        //setArrival(myBus.next.time);
        //change arrival duration from milliseconds to mintues by /60000
        setArrival(myBus.next.duration_ms / 60000);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadBusStopData();
    const interval = setInterval(loadBusStopData, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bus 14 arrival time at Siglap BusStop 93069:
      </Text>
      <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator size="large" color="red" /> : arrival}
      </Text>
      <Text style={styles.title}>mintues</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Refresh!</Text>
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
  },
  arrivalTime: {
    fontSize: 64,
    marginBottom: 32,
  },
  button: {
    padding: 20,
    backgroundColor: "darkgreen",
  },
  buttonText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
});
