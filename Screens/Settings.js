import React from "react";
import { View, Text, Share, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function Settings() {
  const shareWithFriends = async () => {
    try {
      const result = await Share.share({
        message: "Check out this cool app I use to find new tattoo artists!", // Your sharing message
        url: "https://tatted.io", // URL to your app or any specific content
      });

      if (result.action === Share.sharedAction) {
        // Sharing was successful
        console.log("Shared successfully");
      } else if (result.action === Share.dismissedAction) {
        // Sharing was dismissed
        console.log("Sharing dismissed");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const shareWithArtists = async () => {
    try {
      const result = await Share.share({
        message: "Check out this cool app for connecting artists with clients!", // Your sharing message
        url: "https://tatted.io", // URL to your app or any specific content
      });

      if (result.action === Share.sharedAction) {
        // Sharing was successful
        console.log("Shared successfully");
      } else if (result.action === Share.dismissedAction) {
        // Sharing was dismissed
        console.log("Sharing dismissed");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.circleImage}>
          <Avatar.Text
            label="YG"
            size={50}
            style={{ backgroundColor: "#0DBB" }}
            labelStyle={{ fontSize: 24 }}
          />
        </View>
        <View style={styles.userInfoText}>
          <Text style={styles.heading}>Yurik Garcia</Text>
          <Text>EDIT ACCOUNT</Text>
        </View>
      </View>
      <View style={styles.settingsText}>
        <TouchableOpacity
          style={styles.settingsText}
          onPress={shareWithFriends} // Call the sharing function when pressed
        >
          <MaterialCommunityIcons name="share-all" size={24} color="black" />
          <Text style={styles.textStyle}>Share With Friends</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={shareWithArtists} // Call the sharing function when pressed
      >
        <View style={styles.settingsText}>
          <MaterialCommunityIcons
            name="account-arrow-right"
            size={24}
            color="black"
          />
          <Text style={styles.textStyle}>Invite An Artist</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.settingsText}>
        <MaterialCommunityIcons name="ticket" size={24} color="black" />
        <Text style={styles.textStyle}>Vouchers</Text>
      </View>
      <View style={styles.settingsText}>
        <MaterialCommunityIcons
          name="email-newsletter"
          size={24}
          color="black"
        />
        <Text style={styles.textStyle}>Feedback</Text>
      </View>
      <View style={styles.settingsText}>
        <MaterialCommunityIcons name="logout" size={28} color="red" />
        <Text style={styles.logoutStyle}>Log Out</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 10,
    marginTop: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  circleImage: {
    borderRadius: 50,
    height: 50,
    width: 50,
    backgroundColor: "#0DBB",
    marginRight: 10,
  },
  userInfoText: {
    flexDirection: "column",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  settingsText: {
    marginTop: 20, // Adjust the spacing as needed
    flexDirection: "row",
  },
  textStyle: {
    marginLeft: 5,
    marginTop: 2,
    fontSize: 16,
  },
  logoutStyle: {
    marginLeft: 5,
    marginTop: 3,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Settings;
