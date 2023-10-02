import React, { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  Dimensions,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Appbar, Avatar, Card, Button, Divider } from "react-native-paper";
import { FlatList, Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { Tab } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

function ArtistPage() {
  const { API } = useContext(AppContext);
  const primaryColor = "#0DBB80";
  const tabNames = ["info", "reviews"];
  const route = useRoute();
  const followingUUID = route.params.selectedArtistUUID;

  const allFollowedArtists = route.params.followingUUID;
  const navigation = useNavigation();
  const [artistSegvalue, setArtistSegValue] = React.useState("info");
  const [artistUUIDs, setArtistUUIDs] = useState([]);
  const [column1Images, setColumn1Images] = useState([]);
  const [column2Images, setColumn2Images] = useState([]);
  const [isFollowingArtist, setIsFollowingArtist] = useState();
  const [selectedArtist, setSelectedArtist] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [index, setIndex] = React.useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [1, 2, 3, 4, 5];

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

  // Function to make the Axios GET request to fetch the selectedARtist
  const fetchArtist = async () => {
    const artistID = await AsyncStorage.getItem("selectedArtist");
    try {
      const response = await axios.get(`${API.website}/artist/${artistID}`);
      const artist = response.data;
      setSelectedArtist(artist);
    } catch (error) {
      console.error("Error Your Artist:", error);
    }
  };

   // Function to make the Axios GET request to fetch the UUIDs for all the artists following
  //This will be used to render the add/remove icons
  const fetchFollowingUUIDs = async () => {
    const userID = await AsyncStorage.getItem("user_id");
    try {
      const response = await axios.get(`${API.website}/following/${userID}`);
      const artistUUIDs = response.data[0].following;
      setArtistUUIDs(artistUUIDs);
    } catch (error) {
      console.error("Error Your Artist:", error);
    }
  };

  /*** Function that ADDS this artist to the user's favorites list ***/
  const addArtistToFavs = async () => {
    const userID = await AsyncStorage.getItem("user_id");
    const artistID = await AsyncStorage.getItem("selectedArtist");
    axios
      .post(`${API.website}/addToFavs`, { userID, artistID })
      .then((res) => {
        if (res.status === 200) {
          navigation.navigate("ArtistPage");
        }
      })
      .catch((err) => {
        alert("Sorry! Something went wrong. Please try to add Artist again.");
        console.log("err", err);
      });
  };

  /*** Function that REMOVES this artist to the user's favorites list ***/
  const unfollowArtist = async () => {
    const userID = await AsyncStorage.getItem("user_id");
    const artistID = await AsyncStorage.getItem("selectedArtist");
    console.log("userID", userID);
    axios
      .delete(`${API.website}/unfollowArtist/${userID}/${artistID}`,)
      .then((res) => {
        if (res.status === 200) {
          console.log("UNFOLLOWED ARTIST!");
          navigation.navigate("ArtistPage");
        }
      })
      .catch((err) => {
        alert(
          "Sorry! Something went wrong. Please try to Remove this Artist again."
        );
        console.log("err", err);
      });
  };

  useEffect(() => {
    fetchArtist();
    fetchFollowingUUIDs();
    fetchRandomImages(5).then((images) => setColumn1Images(images)); 
    if (refresh) {
      setRefresh(false);
    }
  }, [refresh]);

  const fetchRandomImages = async (count) => {
    const images = [];
    for (let i = 0; i < count; i++) {
      const response = await fetch(`https://picsum.photos/700?random=${i}`);
      const imageUrl = response.url;
      images.push(imageUrl);
    }
    return images;
  };

  const handleTabChange = (selectedIndex) => {
    setIndex(selectedIndex);

    // Determine the value of segButtonValue based on the selected tab
    const selectedTabValue = tabNames[selectedIndex];
    setArtistSegValue(selectedTabValue);
  };

  // Function to render stars
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name="star"
          size={20}
          color="#FFD700"
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  //Functions for the map//
  const [location, setLocation] = useState({
    latitude: 25.76275, // Replace with the actual latitude
    longitude: -80.3047, // Replace with the actual longitude
  });

  // const openAppleMaps = () => {
  //   const { latitude, longitude } = location;
  //   const url = `http://maps.apple.com/?ll=${latitude},${longitude}`;
  //   Linking.openURL(url);
  //   console.log("HIT");
  // };

  const openAppleMaps = () => {
    console.log("Button Pressed"); // Test log
  };

    const getAllAsyncStorageData = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const allData = await AsyncStorage.multiGet(allKeys);

      // Log all key-value pairs
      allData.forEach(([key, value]) => {
        console.log(`${key}:`, value);
      });
    } catch (error) {
      console.error('Error while retrieving data from AsyncStorage:', error);
    }
  };

 // Call getAllAsyncStorageData to log all data stored in AsyncStorage
  // getAllAsyncStorageData();

  // console.log('Selected Artist!!!!:', selectedArtist);

  async function checkIfFollowing() {
    const selectedArtist = await AsyncStorage.getItem("selectedArtist");
    const isFollowingArtist = artistUUIDs.includes(selectedArtist);
    setIsFollowingArtist(isFollowingArtist);
  }
  checkIfFollowing();
  

return (
  <View style={styles.container}>
    <View style={styles.avatarContainer}>
      <View style={styles.avatar}>
        <Image
          source={require("../assets/artist2.jpg")}
          style={styles.avatarImage}
        />
      </View>
      {selectedArtist.length > 0 && (
        <Text style={styles.name}>
          {selectedArtist[0].first_name + " " + selectedArtist[0].last_name}
        </Text>
      )}
    </View>
    <SafeAreaView style={styles.content}>
      <View style={styles.segContainer}>
        <Tab
          value={index}
          onChange={handleTabChange}
          indicatorStyle={{
            backgroundColor: primaryColor,
            height: 3,
          }}
          style={styles.tab}
        >
          <Tab.Item
            title="Information"
            titleStyle={{ fontSize: 14, color: "black" }}
            style={index === 0 ? styles.tabItemWhite : null}
          />
          <Tab.Item
            title="Reviews"
            titleStyle={{ fontSize: 14, color: "black" }}
            style={index === 1 ? styles.tabItemWhite : null}
          />
        </Tab>
      </View>
      <View style={styles.bottomContent}>
        {artistSegvalue === "info" && (
          <ScrollView>
            <View style={styles.infoContent}>
              <Appbar style={styles.appbar}>
                <TouchableOpacity
                  onPress={isFollowingArtist ? unfollowArtist : addArtistToFavs}
                  style={styles.iconContainer}
                >
                  <View style={styles.iconTextContainer}>
                    <MaterialCommunityIcons
                      name={
                        isFollowingArtist
                          ? "account-remove-outline"
                          : "account-plus-outline"
                      }
                      size={24}
                      color="black"
                    />
                    <Text style={styles.iconText}>
                      {isFollowingArtist ? "REMOVE" : "ADD"}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Chat")}
                  style={styles.iconContainer}
                >
                  <View style={styles.iconTextContainer}>
                    <MaterialCommunityIcons
                      name="chat-outline"
                      size={24}
                      color="black"
                    />
                    <Text style={styles.iconText}>CHAT</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Review")}
                  style={styles.iconContainer}
                >
                  <View style={styles.iconTextContainer}>
                    <MaterialCommunityIcons
                      name="star-outline"
                      size={24}
                      color="black"
                    />
                    <Text style={styles.iconText}>REVIEW</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                  <View style={styles.iconTextContainer}>
                    <MaterialCommunityIcons
                      name="share-outline"
                      size={24}
                      color="black"
                    />
                    <Text style={styles.iconText}>SHARE</Text>
                  </View>
                </TouchableOpacity>
              </Appbar>

              <Text
                style={{
                  fontWeight: "bold",
                  marginLeft: 5,
                }}
              >
                ABOUT
              </Text>
              <Text style={styles.bodyText}>
                {selectedArtist.length > 0 && selectedArtist[0].description}
              </Text>
              <Divider style={{ marginTop: 5 }} />
              <Text
                style={{
                  fontWeight: "bold",
                  marginTop: 5,
                  marginLeft: 5,
                }}
              >
                TATTOO SHOP
              </Text>

              <View style={styles.mapContainer}>
                <View style={{ marginLeft: 2, marginRight: 5, marginTop: 5 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 15.5 }}>
                    {" "}
                    La Marca Tatuaje
                  </Text>
                  <Text> 6867 Calle Ocho</Text>
                  <Text> Miami, FL 33144</Text>
                  <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}> Monday </Text>
                    <Text> 11am - 8pm</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}> Tuesday </Text>
                    <Text> 11am - 8pm</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}> Wednesday </Text>
                    <Text> 11am - 8pm</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}> Thursday </Text>
                    <Text> 11am - 8pm</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}> Friday </Text>
                    <Text> 11am - 8pm</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}> Saturday </Text>
                    <Text> 11am - 8pm</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.leftHalf}
                  onPress={openAppleMaps}
                >
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
                  {/* <View style={styles.gradientOverlay} /> */}
                </TouchableOpacity>
              </View>
              <Divider style={{ marginTop: 5 }} />
              <Text
                style={{
                  fontWeight: "bold",
                  marginTop: 5,
                  marginLeft: 5,
                }}
              >
                PHOTOS
              </Text>
              <View style={{ flexDirection: "row", marginLeft: 3 }}>
                <FlatList
                  data={[...column1Images, ...column2Images]} // Combine the data sources
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={2} // Set the number of columns to 2
                  renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.photo} />
                  )}
                />
              </View>
            </View>
          </ScrollView>
        )}
        {artistSegvalue === "reviews" && (
          <View style={styles.reviewsContent}>
            <View style={styles.contentContainer}>
              <Card
                style={[
                  { justifyContent: "center", marginTop: 5 },
                  styles.cardSize,
                ]}
              >
                <View style={{ flexDirection: "row", marginLeft: 310 }}>
                  {renderStars()}
                </View>
                <View style={styles.cardContent}>
                  <View style={styles.cardTop}>
                    <View style={styles.circleImage}>
                      <Avatar.Text
                        label="YG"
                        size={50}
                        style={{ backgroundColor: "#0DBB" }}
                        labelStyle={{ fontSize: 24 }}
                      />
                    </View>
                    <Card.Title
                      title="Yurik Garcia"
                      subtitle="May 13, 2023 4:30 PM"
                      titleStyle={styles.cardTitle}
                    />
                  </View>
                  <Card.Content>
                    <Text>
                      {" "}
                      Estes tipo es tremenda fula. La verdad que me hizo
                      tremenda mierdo. No puedo creer le gran pinga que me
                      hizo. Tremendo artista.
                    </Text>
                  </Card.Content>
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
                </View>
              </Card>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  </View>
);
}

export default ArtistPage;

const styles = StyleSheet.create({
  aboutMe: {
    color: "black",
  },
  appbar: {
    alignItems: "center", // Center the icons vertically
    height: 60, // Adjust the app bar height as needed
    justifyContent: "space-around", // Space around the icons
    marginBottom: 10, // Adjust the bottom margin as needed
  },
  avatar: {
    alignItems: "center",
    borderRadius: 60,
    height: 120,
    justifyContent: "center",
    marginLeft: "35%",
    overflow: "hidden",
    width: 120,
  },
  avatarContainer: {
    justifyContent: "center",
    marginTop: 5,
    // Styles for the avatar container
  },
  avatarImage: {
    height: "100%",
    width: "100%",
  },
  bodyText: {
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 5,
  },
  bottomContent: {
    backgroundColor: "white", // Adjust the background color as needed
    bottom: 0,
    height: "95%",
    left: 0,
    position: "absolute",
    right: 0,
  },
  cardContent: {
    alignItems: "flex-start", // Align items to the top of the Card
  },
  cardSize: {
    height: 400,
    width: windowWidth - 10,
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
    overflow: "hidden",
    width: 50,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    // Styles for content section
  },
  contentContainer: {
    alignItems: "center",
  },
  gradientOverlay: {
    position: "absolute",
    left: "35%", // Cover 25% of the map's width
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor:
      "linear-gradient(90deg, rgba(0, 0, 0, 0.7) 35%, rgba(0, 0, 0, 0) 35%)",
  },
  iconText: {
    fontSize: 12,
  },
  iconTextContainer: {
    alignItems: "center",
  },
  image: {
    height: 200,
    marginHorizontal: 5,
    width: windowWidth / 2,
  },
  imageAccordion: {
    alignItems: "center",
  },
  infoContent: {
    flex: 1,
    // Styles for info content
  },
  leftHalf: {
    flex: 1, // Take up half of the available width
    backgroundColor: "transparent",
    marginBottom: 5,
  },
  map: {
    flex: 1,
  },
  mapContainer: {
    flex: 0.75,
    flexDirection: "row", // Make the parent container a row to split the screen in half
  },
  name: {
    marginLeft: "36%",
    marginBottom: 5,
    marginTop: 5,
    fontSize: 20,
  },
  photosContainer: {
    marginTop: 10, // Adjust the margin as needed
    paddingHorizontal: 10, // Adjust the padding as needed
  },
  photo: {
    height: 200,
    margin: 5,
    width: 200,
  },
  reviewsContent: {
    flex: 1,
    // Styles for reviews content
  },
  starContainer: {
    position: "absolute",
    top: 10, // Adjust the top position as needed
    right: 10, // Adjust the right position as needed
    flexDirection: "row",
  },
  tab: {
    backgroundColor: "#FFFBFE", // Set the background color to white
    height: 40, // Adjust the height as needed
    marginTop: 10,
  },
  tabItemWhite: {
    backgroundColor: "#FFFBFE", // Add a background color for the selected tab
  },
});
