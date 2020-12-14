import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [Loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus arrival time:</Text>
      <Text style={styles.arrivalTime}>
        {Loading ? <ActivityIndicator size="large" color="red" /> : "Loaded"}
      </Text>
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
