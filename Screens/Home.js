import React, { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext.js";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar, Button, Card, ActivityIndicator } from "react-native-paper";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [followingUUID, setFollowingUUID] = useState([]);
  const [artistFollowing, setArtistFollowing] = useState([]);
  const { API } = useContext(AppContext);
  const { primaryColors } = useContext(AppContext);
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

  // function that gets the artists that the user is following
  const fetchFollowingAndArtistFollowing = async () => {
    const userID = await AsyncStorage.getItem("user_id");
    try {
      const response = await axios.get(`${API.website}/following/${userID}`);
      const followers = response.data;
      const followingUUIDs = followers[0].following;

      if (
        !followingUUIDs ||
        !Array.isArray(followingUUIDs) ||
        followingUUIDs.length === 0
      ) {
        console.error("Invalid or empty followingUUIDs");
        return;
      }

      const followingData = await Promise.all(
        followingUUIDs.map(async (artistUUID) => {
          try {
            const res = await axios.get(
              `${API.website}/artistFollowing/${artistUUID}`
            );
            setArtistFollowing((prevArtistFollowing) => [
              ...prevArtistFollowing,
              res.data,
            ]);
            return res.data;
          } catch (error) {
            console.error(`Error fetching artist ${artistUUID}:`, error);
            return null; // Handle the error gracefully, you can skip or handle it accordingly
          }
        })
      );
      setFollowingUUID(followingUUIDs);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  useEffect(() => {
    fetchFollowingAndArtistFollowing();
  }, []);

  const totalCardHeight = artistFollowing.length * 450;

  console.log(artistFollowing);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ minHeight: totalCardHeight }}>
        <View style={styles.container}>
          <Image
            source={require("../assets/logoNoBack.png")}
            style={styles.avatarImage}
            resizeMode="contain"
          />
          <View style={styles.contentContainer}>
            {artistFollowing.length > 0 ? (
              artistFollowing.map((artist, index) => (
                <Card
                  key={index}
                  style={[
                    {
                      justifyContent: "center",
                      marginTop: 5,
                      // backgroundColor: "#ffffff",
                    },
                    styles.cardSize,
                  ]}
                >
                  <View style={styles.cardContent}>
                    <View style={styles.cardTop}>
                      <View style={styles.circleImage}>
                        <Card.Cover source={require("../assets/artist1.jpg")} />
                      </View>
                      {artist[0] && (
                        <Card.Title
                          title={artist[0].first_name + " " + artist[0].last_name}
                          titleStyle={styles.cardTitle}
                          subtitle={artist[0].tattoo_shop}
                        />
                      )}
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
                            {images.map((imageIndex) => (
                              <Image
                                key={imageIndex}
                                source={{
                                  uri: `https://picsum.photos/700?random=${imageIndex}`,
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
                        onPress={async () => {
                          await AsyncStorage.setItem(
                            "selectedArtist",
                            artist[0].user_id
                          );
                          await AsyncStorage.setItem(
                            "selectedArtistName",
                            artist[0].first_name + " " + artist[0].last_name
                          );
                          navigation.navigate("ArtistPage", {
                          });
                        }}
                      >
                        Book Appointment
                      </Button>
                    </Card.Content>
                  </View>
                </Card>
              ))
            ) : (
              <ActivityIndicator size="large" color={primaryColors.primary} /> 
            )}
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

export default Home;

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    size: 'large'
  },
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
  image: {
    height: 200,
    marginHorizontal: 5,
    width: windowWidth / 1,
  },
  imageAccordion: {
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
});
