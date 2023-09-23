import React, { useState } from "react";
import { Avatar, Button, Card } from "react-native-paper";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import ArtistPage from "./ArtistPage";
import artist1 from "../assets/artist1.jpg";

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  alignItems: "center",
  avatarImage: {
    height: 75,
    marginHorizontal: 5,
    marginBottom: 10,
    width: windowWidth / 1,
  },
  cardContent: {
    alignItems: "flex-start", // Align items to the top of the Card
  },
  cardSize: {
    height: 400,
    width: windowWidth - 40,
  },
  cardTitle: {
    fontWeight: "bold",
    textAlign: "left",
  },
  cardTop: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginBottom: 10,
  },
  circleImage: {
    borderRadius: 50,
    height: 50,
    marginLeft: 10,
    marginBottom: 0,
    overflow: "hidden",
    width: 50,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 10,
  },
  contentContainer: {
    alignItems: "center",
  },
  flexDirection: "row",
  image: {
    height: 200,
    marginHorizontal: 5,
    width: windowWidth / 1,
  },
  imageAccordion: {
    alignItems: "center",
  },
  justifyContent: "flex-start",
  marginHorizontal: 5,
  marginBottom: 10,
  marginTop: 20,
  overflow: "hidden",
  scrollView: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  textAlign: "left",
  textAlign: "center",
  width: windowWidth / 1,
});


const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [1, 2, 3, 4, 5];
  const navigation = useNavigation();

  const handleGestureEvent = (event) => {
    if (event.nativeEvent.state === State.END) {
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
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Image
            source={require("../assets/logoNoBack.png")}
            style={styles.avatarImage}
            resizeMode="contain"
          />
          <View style={styles.contentContainer}>
            <Card
              style={[
                { justifyContent: "center", marginTop: 5 },
                styles.cardSize,
              ]}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardTop}>
                  <View style={styles.circleImage}>
                    <Card.Cover source={require("../assets/artist1.jpg")} />
                  </View>
                  <Card.Title
                    title="Yurik Garcia"
                    titleStyle={styles.cardTitle}
                    subtitle="Blood Gulch Tattoo"
                  />
                </View>
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
                            source={{
                              uri: `https://picsum.photos/700?random=${index}`,
                            }}
                            style={styles.image}
                          />
                        ))}
                      </ScrollView>
                    </View>
                  </PanGestureHandler>
                </Card.Actions>
                <Card.Content style={{ justifyContent: "center" }}>
                  <Button
                    mode="elevated"
                    buttonColor="#504a4b"
                    textColor="#ffffff"
                    style={{ marginTop: 5, marginLeft: 90 }}
                    onPress={() => navigation.navigate("ArtistPage")}
                  >
                    Book Appointment
                  </Button>
                </Card.Content>
              </View>
            </Card>
          </View>
          <View style={styles.contentContainer}>
            <Card
              style={[
                { justifyContent: "center", marginTop: 5 },
                styles.cardSize,
              ]}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardTop}>
                  <View style={styles.circleImage}>
                    <Card.Cover source={require("../assets/artist2.jpg")} />
                  </View>
                  <Card.Title
                    title="Don Francisco"
                    titleStyle={styles.cardTitle}
                    subtitle="Sabado Gigante Tattoo"
                  />
                </View>
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
                            source={{
                              uri: `https://picsum.photos/700?random=${index}`,
                            }}
                            style={styles.image}
                          />
                        ))}
                      </ScrollView>
                    </View>
                  </PanGestureHandler>
                </Card.Actions>
                <Card.Content style={{ justifyContent: "center" }}>
                  <Button
                    mode="elevated"
                    buttonColor="#504a4b"
                    textColor="#ffffff"
                    style={{ marginTop: 5, marginLeft: 90 }}
                    onPress={() => navigation.navigate("ArtistPage")}
                  >
                    Book Appointment
                  </Button>
                </Card.Content>
              </View>
            </Card>
          </View>
          <View style={styles.contentContainer}>
            <Card
              style={[
                { justifyContent: "center", marginTop: 5 },
                styles.cardSize,
              ]}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardTop}>
                  <View style={styles.circleImage}>
                    <Card.Cover source={require("../assets/artist2.jpg")} />
                  </View>
                  <Card.Title
                    title="Cantinflas Garcia"
                    titleStyle={styles.cardTitle}
                    subtitle="Hang 'Em High Tattoo"
                  />
                </View>
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
                            source={{
                              uri: `https://picsum.photos/600?random=${index}`,
                            }}
                            style={styles.image}
                          />
                        ))}
                      </ScrollView>
                    </View>
                  </PanGestureHandler>
                </Card.Actions>
                <Card.Content style={{ justifyContent: "center" }}>
                  <Button
                    mode="elevated"
                    buttonColor="#504a4b"
                    textColor="#ffffff"
                    style={{ marginTop: 5, marginLeft: 90 }}
                    onPress={() => navigation.navigate("ArtistPage")}
                  >
                    Book Appointment
                  </Button>
                </Card.Content>
              </View>
            </Card>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

export default Home;
