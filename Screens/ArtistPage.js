import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Appbar, SegmentedButtons } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function ArtistPage() {
  const [artistSegvalue, setArtistSegValue] = React.useState("info"); // Initialize with 'info'

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {/* Your avatar circle picture goes here */}
        <View style={styles.avatar}>
          <Image
            source={{ uri: "https://picsum.photos/700" }}
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
            value={artistSegvalue}
            onValueChange={setArtistSegValue}
            buttons={[
              {
                value: "info",
                label: "Information",
              },
              {
                value: "reviews",
                label: "Reviews",
              },
            ]}
          />
        </View>
        {/* Content takes up the bottom 50% of the screen */}
        <View style={styles.bottomContent}>
          {artistSegvalue === "info" && (
            <View style={styles.infoContent}>
              <Appbar style={styles.appbar}>
                <TouchableOpacity style={styles.iconContainer}>
                  <View style={styles.iconTextContainer}>
                    <MaterialCommunityIcons
                      name="account-remove-outline"
                      size={24}
                      color="black"
                    />
                    <Text style={styles.iconText}>REMOVE</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                  <View style={styles.iconTextContainer}>
                    <MaterialCommunityIcons
                      name="calendar"
                      size={24}
                      color="black"
                    />
                    <Text style={styles.iconText}>BOOK</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
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
                {/* <Appbar.Action
                  icon="account-remove-outline"
                  label="Remove Account"
                  onPress={() => {}}
                />
                <Appbar.Action
                  icon="calendar"
                  label="Calendar"
                  onPress={() => {}}
                />
                <Appbar.Action
                  icon="star-outline"
                  label="Star"
                  onPress={() => {}}
                />
                <Appbar.Action
                  icon="share-outline"
                  label="Share"
                  onPress={() => {}}
                /> */}
              </Appbar>
            </View>
          )}
          {artistSegvalue === "reviews" && (
            <View style={styles.reviewsContent}>
              <Text>Review content goes here</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    marginTop: 5,
    // Styles for the avatar container
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "35%",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  name: {
    marginLeft: "37%",
    marginTop: 5,
    marginBottom: 5,
  },
  iconText: {
    fontSize: 12,
  },
  iconTextContainer: {
    alignItems: "center",
  },
  content: {
    flex: 1,
    // Styles for content section
  },
  segContainer: {
    // Styles for segmented buttons container
  },
  bottomContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "99%",
    backgroundColor: "white", // Adjust the background color as needed
  },
  infoContent: {
    flex: 1,
    // Styles for info content
  },
  reviewsContent: {
    flex: 1,
    // Styles for reviews content
  },
  appbar: {
    height: 60, // Adjust the app bar height as needed
    justifyContent: "space-around", // Space around the icons
    alignItems: "center", // Center the icons vertically
  },
});

export default ArtistPage;
