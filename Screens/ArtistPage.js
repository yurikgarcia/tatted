import React, { useEffect, useState } from "react";
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Appbar,
  Avatar,
  Card,
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import { Tab } from "@rneui/themed";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

function ArtistPage() {
  const [artistSegvalue, setArtistSegValue] = React.useState("info");
  const [column1Images, setColumn1Images] = useState([]);
  const [column2Images, setColumn2Images] = useState([]);
  const primaryColor = "#0DBB80";
  const [index, setIndex] = React.useState(0);
  const tabNames = ["info", "reviews"];

  const navigation = useNavigation();

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

  useEffect(() => {
    // Fetch random images for column 1
    fetchRandomImages(5).then((images) => setColumn1Images(images));

    // Fetch random images for column 2
    fetchRandomImages(5).then((images) => setColumn2Images(images));
  }, []);

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

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Image
            source={require("../assets/artist2.jpg")}
            style={styles.avatarImage}
          />
        </View>
        <Text style={styles.name}>Adam Garcia</Text>
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
            variant="primary"
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
                  <TouchableOpacity style={styles.iconContainer}>
                    <View style={styles.iconTextContainer}>
                      <MaterialCommunityIcons
                        name="account-plus-outline"
                        size={24}
                        color="black"
                      />
                      <Text style={styles.iconText}>ADD</Text>
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
                    color: styles.subHeading,
                    fontWeight: "bold",
                    marginTop: 10,
                    marginLeft: 5,
                  }}
                >
                  ABOUT
                </Text>
                <Text style={styles.bodyText}>
                  {" "}
                  Que vuelta acere! Soy tremendo artista paque tu sepas!
                </Text>
                <Text style={styles.bodyText}>
                  {" "}
                  Aqui se hacen tremendos tatuajes y vendemos mejores croquetas!
                </Text>
                <Text
                  style={{
                    color: styles.subHeading,
                    fontWeight: "bold",
                    marginTop: 10,
                    marginLeft: 5,
                  }}
                >
                  TATTOO SHOP
                </Text>
                <Text style={styles.bodyText}> La Marca Tatuaje</Text>
                <Text style={styles.bodyText}> 6867 Calle Ocho</Text>
                <Text style={styles.bodyText}> Miami, FL 33144</Text>
                <Text
                  style={{
                    color: styles.subHeading,
                    fontWeight: "bold",
                    marginTop: 10,
                    marginLeft: 5,
                  }}
                >
                  PHOTOS
                </Text>
                <View style={{ flexDirection: "row", marginLeft: 3 }}>
                  <FlatList
                    data={column1Images}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <Image source={{ uri: item }} style={styles.photo} />
                    )}
                  />
                  <FlatList
                    data={column2Images}
                    keyExtractor={(item, index) => index.toString()}
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
                    <View style={{ flexDirection: 'row', marginLeft: 310}}>{renderStars()}</View>
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
  boyText: {
    marginBottom: 5,
    marginTop: 5,
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
  name: {
    marginLeft: "40%",
    marginBottom: 5,
    marginTop: 5,
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

export default ArtistPage;
