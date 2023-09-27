import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Appbar, Avatar, Card, TextInput } from "react-native-paper";

function Support() {
  const primaryColor = "#0DBB80";

  const [userInput, setUserInput] = useState(""); // Initialize review to empty string

  console.log(userInput);

  return (
    <View>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="bodyMedium">
            If you encounter issues or have questions about our app, our support
            team is here to help. Don't hesitate to reach out; we're here for
            you!
          </Text>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="bodyMedium">EMAIL</Text>
          <Text variant="bodyMedium">yurikgarcia13@gmial.com</Text>
        </Card.Content>
      </Card>
      <TextInput
        activeOutlineColor={primaryColor}
        mode="outlined"
        label="Description"
        value={userInput}
        onChangeText={(text) => setUserInput(text)}
        multiline={true}
        style={{ width: 420, marginLeft: 5, marginTop: 3 }}
      />

      <Text style={{ fontSize: 12, marginTop: 1, marginLeft: 5, width: 400}}>
        Please provide a detailed description of what you are experiencing or
        any question you may have so that we can best assist you!{" "}
      </Text>
    </View>
  );
}

export default Support;

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    width: 420,
    marginLeft: 5,
    marginTop: 5
  },
  textHeading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textSubheading: {
    fontSize: 15,
    marginLeft: 20,
  },
});
