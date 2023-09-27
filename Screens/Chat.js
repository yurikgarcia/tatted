import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Linking } from 'react-native';

function Chat() {
  const [location, setLocation] = useState({
    latitude: 37.7749, // Replace with the actual latitude
    longitude: -122.4194, // Replace with the actual longitude
  });

  const openAppleMaps = () => {
    const { latitude, longitude } = location;
    const url = `http://maps.apple.com/?ll=${latitude},${longitude}`;
    Linking.openURL(url);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.leftHalf} onPress={openAppleMaps}>
        <MapView
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Person's Location"
            description="Click to open in Apple Maps"
          />
        </MapView>
        <View style={styles.gradientOverlay} />
      </TouchableOpacity>
    </View>
  );
}

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Make the parent container a row to split the screen in half
  },
  leftHalf: {
    flex: 1, // Take up half of the available width
    backgroundColor: 'transparent',
  },
  map: {
    flex: 1,
  },
  gradientOverlay: {
    position: 'absolute',
    left: '35%', // Cover 25% of the map's width
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'linear-gradient(90deg, rgba(0, 0, 0, 0.7) 35%, rgba(0, 0, 0, 0) 35%)',
  },
});