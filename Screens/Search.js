import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import { Searchbar, Chip, Card, Button } from "react-native-paper";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

function CustomBottomDrawer({ isVisible, onClose, onSelect }) {
  const options = ["Distance", "Star Rating"]; // Add more options as needed
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <Modal
      isVisible={isVisible}
      swipeDirection={["down"]} // Enable swipe-down to close the drawer
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      style={{
        justifyContent: "flex-end", // Change this to 'flex-end'
        margin: 0, // Change this to 0
      }}
    >
      <View
        style={{
          flex: 1,
          maxHeight: 200, // Set the maximum height for the modal
          backgroundColor: "white", // Background color of the view
        }}
      >
        <ScrollView>
          <View
            style={{
              backgroundColor: "lightgray", // Background color of the header
              paddingVertical: 10,
              paddingLeft: 16,
              flexDirection: "row",
              justifyContent: "space-between", // Align items to the right
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 170 }}>
              SORT
            </Text>
          </View>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => {
                setSelectedOption(option.toLowerCase()); // Set the selected option
                onSelect(option.toLowerCase());
                onClose();
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between", // Align items to the right
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                }}
              >
                <Text style={{ fontSize: 16 }}>{option}</Text>
                {selectedOption === option.toLowerCase() && (
                  <Icon name="check" size={16} color="green" /> // Display a checkmark for the selected option
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [sortBy, setSortBy] = useState(""); // Selected sorting criteria
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

  const onChangeSearch = (query) => setSearchQuery(query);

  const handleSortByChange = (value) => {
    // Handle the sort by change here, e.g., trigger sorting logic
    setSortBy(value);
    setDrawerVisible(false); // Close the drawer
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Search bar */}
      <Searchbar
        placeholder="Search"
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
        style={{
          fontSize: 16,
          marginTop: 16,
        }}
        inputStyle={{
          textAlign: "left", // Left-justify the text
          marginLeft: 10, // Add some left margin for better alignment
        }}
      />

      {/* Sort chip */}
      <TouchableOpacity onPress={() => setDrawerVisible(true)}>
        <Chip
          mode="outlined"
          icon="sort-variant"
          style={{
            marginTop: 5,
            marginLeft: 5,
            width: 170, // Adjust the width as needed
            borderRadius: 20, // Make corners rounder
          }}
        >
          Sort: ({sortBy || "Select"})
        </Chip>
      </TouchableOpacity>

      {/* Cards Scroll */}
      <ScrollView>
        {/* Card 1 */}
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

        {/* Card 2 */}
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

        {/* Add more cards here as needed */}
      </ScrollView>
    </GestureHandlerRootView>
  );
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  contentContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  avatarImage: {
    width: windowWidth / 1,
    height: 75,
    marginHorizontal: 5,
  },
  image: {
    width: windowWidth / 1,
    height: 200,
    marginHorizontal: 5,
  },
  text: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardSize: {
    height: 400,
    width: windowWidth - 20,
  },
  cardTitle: {
    fontWeight: "bold",
    textAlign: "left",
  },
  cardContent: {
    alignItems: "flex-start", // Align items to the top of the Card
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  circleImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: "hidden",
    marginLeft: 10,
    marginBottom: 0,
  },
  imageAccordion: {
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
});
