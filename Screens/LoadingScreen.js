import React from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import buzzLogo from "../assets/buzzLogo.gif";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      {/* Display the GIF using the Image component */}
      <Image source={require('../assets/buzzLogo.gif')} style={styles.gif} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:'#0DBB80'
  },
  gif: {
    width: 50, // Set the width and height to match your GIF's dimensions
    height: 50,
  },
});

export default LoadingScreen;
