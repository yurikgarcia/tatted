import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Appbar, Avatar, Card } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

function Feedback() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.settingsText}>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Support")}>
        <View style={styles.settingsText}>
          <MaterialCommunityIcons name="email-outline" size={24} color="black" />
          <Text style={styles.textStyle}>Contact Support</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Feedback")}>
        <View style={styles.settingsText}>
          <MaterialCommunityIcons
            name="thumbs-up-down-outline"
            size={24}
            color="black"
          />
          <Text style={styles.textStyle}> Send Feedback</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.settingsText}>
        <MaterialCommunityIcons name="star-outline" size={28} />
        <Text style={styles.textStyle}>Rated the Tatted App</Text>
      </View>
    </View>
  );
}

export default Feedback;


const styles = StyleSheet.create({
  container: {
    marginLeft: 5
  },
  textHeading: {
    fontSize: 20,
    fontWeight: "bold"
  },
  userInfoText: {
    flexDirection: "column",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  settingsText: {
    marginTop: 20,
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