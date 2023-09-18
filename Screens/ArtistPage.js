import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

function ArtistPage() {
  const [value, setValue] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {/* Your avatar circle picture goes here */}
        <View style={styles.avatar}>
          <Image
            source={{ uri: 'https://picsum.photos/700' }}
            style={styles.avatarImage}
          />
        </View>
        <Text style={styles.name}>STUPID ARTIST</Text>
      </View>
      {/* Content for the remaining portion of the screen */}
      <SafeAreaView style={styles.content}>
        {/* Your content goes here */}
        <View style={styles.segContainer}>
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={[
              {
                value: 'info',
                label: 'Information',
              },
              {
                value: 'reviews',
                label: 'Reviews',
              },
            ]}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Adjust background color as needed
  },
  avatarContainer: {
    // flex: 0.15, // 15% of the screen height
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    // backgroundColor: '#504a4b', // Adjust background color as needed
  },
  avatar: {
    width: 120, // Adjust the width and height of the avatar circle as needed
    height: 120,
    borderRadius: 60, // Make it a circle by setting border radius to half of width/height
    overflow: 'hidden', // Clip the image within the circle
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    marginTop: 10, // Adjust spacing between avatar and name as needed
    fontSize: 16, // Adjust font size as needed
  },
  content: {
    flex: 0.85, // 85% of the screen height for content
    // Add styling for content section as needed
  },
  segContainer: {
    flex: 1,
    alignItems: 'center', // Center the SegmentedButtons horizontally
    marginTop: 10
  },
});

export default ArtistPage;
