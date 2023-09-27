import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Appbar, Avatar, Card } from "react-native-paper";

function Vouchers() {
  return (
    <View style={{ flex: 0.75, justifyContent: "center", alignItems: "center" }}>
      <View>
        <Text style={styles.textHeading}>You dont have any vouchers</Text>
        <Text style={styles.textSubheading}>Your vouchers will appear hear</Text>
      </View>
    </View>
  );
}

export default Vouchers;

const styles = StyleSheet.create({
  textHeading: {
    fontSize: 20,
    fontWeight: "bold"
  },
  textSubheading: {
    fontSize: 15,
    marginLeft: 20
  },
});