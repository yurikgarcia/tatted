import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Appbar, Avatar, Card, TextInput } from "react-native-paper";

function SendFeedback() {
  const primaryColor = "#0DBB80";

  const [userFeedback, setUserFeedback] = useState(""); // Initialize review to empty string



  return (
    <View>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="bodyMedium">
          We value your opinion! 📱✨ Could you please take a moment to share your feedback on our app? 
          Your insights help us improve and provide you with an even better experience. Thank you! 🙌 #AppFeedback
          </Text>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="bodyMedium">EMAIL</Text>
          <Text variant="bodyMedium">yurikgarcia13@gmail.com</Text>
        </Card.Content>
      </Card>
      <TextInput
        activeOutlineColor={primaryColor}
        mode="outlined"
        label="Feedback"
        value={userFeedback}
        onChangeText={(text) => setUserFeedback(text)}
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

export default SendFeedback;

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
