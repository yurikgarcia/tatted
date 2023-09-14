import React, { useState } from 'react';
import { Avatar, Button, Card } from 'react-native-paper';
import { Image, ScrollView, StyleSheet, View, Text, Dimensions } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import ArtistPage from './ArtistPage';



const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  image: {
    width: windowWidth / 3, // Divide the width by 3 to display 3 images
    height: 100,
    marginHorizontal: 5, // Add some horizontal margin between images
  },
  text: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardContent: {
    alignItems: 'center',
  },
  circleImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginTop: 10,
  },
  cardSize: {
    height: 400, // Set the desired height for the card
    width: windowWidth - 40, // Adjust the width as needed
  },
  cardTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageAccordion: {
    alignItems: 'center',
  },
});

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

function Home( ) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [1, 2, 3, 4, 5]; // Replace with your image data
  const navigation = useNavigation();

  const handleGestureEvent = (event) => {
    if (event.nativeEvent.state === State.END) {
      // Determine swipe direction and update the current image index
      const { translationX } = event.nativeEvent;
      if (translationX > 0 && currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1);
      } else if (translationX < 0 && currentImageIndex < images.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      }
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={require('../assets/logoNoBack.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.text}>My Artist</Text>

        <View style={styles.contentContainer}>
          <Card style={[{ justifyContent: 'center', marginTop: 5 }, styles.cardSize]}>
            <View style={styles.cardContent}>
              <View style={styles.circleImage}>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
              </View>
              <Card.Title title="Yurik Garcia" titleStyle={styles.cardTitle} />


              <Card.Actions>
                <PanGestureHandler onGestureEvent={handleGestureEvent}>
                  <View>
                    <ScrollView
                      horizontal
                      contentContainerStyle={styles.imageAccordion}
                      showsHorizontalScrollIndicator={false}
                      pagingEnabled
                    >
                      {images.map((index) => (
                        <Image
                          key={index}
                          source={{ uri: `https://picsum.photos/700?random=${index}` }}
                          style={styles.image}
                        />
                      ))}
                    </ScrollView>
                  </View>
                </PanGestureHandler>
            </Card.Actions>

            <Card.Content>
              <Button 
                  mode="elevated"
                  buttonColor='#504a4b'
                  textColor='#ffffff'
                  style={{ marginTop: 5 }}
                  onPress={() => navigation.navigate('ArtistPage')}
                  // Replace 'ArtistPage' with the actual screen name
                >
                  Book Appointment
                </Button>
            </Card.Content>

              
            </View>
          </Card>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

export default Home;
