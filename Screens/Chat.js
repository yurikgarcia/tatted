import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Appbar, Avatar, Card } from "react-native-paper";

function Chat() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={styles.circleImage}>
        <Avatar.Text
          label="YG"
          size={50}
          style={{ backgroundColor: "#0DBB" }}
          labelStyle={{ fontSize: 24 }}
        />
      </View>
    </View>
  );
}

export default Chat;

const styles = StyleSheet.create({
  circleImage: {
    borderRadius: 50,
    height: 50,
    marginLeft: 10,
    overflow: "hidden",
    width: 50,
  },
});
