import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

function Review() {
  const navigation = useNavigation();
  const [starReviews, setStarReviews] = useState(0); // Initialize starReviews to 0
  const [review, setReview] = useState(""); // Initialize review to empty string

  const primaryColor = "#0DBB80";
  // Set the starReviews variable to the selected rating
  const handleStarClick = (rating) => {
    setStarReviews(rating);
  };

  return (
    <View>
      <View style={styles.buttonContainer}>
        <Button mode="text" labelStyle={{ color: 'black' }}  onPress={() => navigation.navigate("ArtistPage")}>
          CANCEL
        </Button>
        <Button mode="text" labelStyle={{ color: 'black' }} style={{ marginLeft: 265, }}>
          SUBMIT
        </Button>
      </View>
      <View style={styles.contentContainer}>
        {/* Star Rating */}
        <View style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <FontAwesome
              key={rating}
              name={rating <= starReviews ? "star" : "star-o"} // Solid star for selected, outline for unselected
              size={30}
              color={rating <= starReviews ? "gold" : "gray"} // Color the selected stars gold
              onPress={() => handleStarClick(rating)} // Handle star click
            />
          ))}
        </View>
        <TextInput
          activeOutlineColor={primaryColor}
          mode="outlined"
          label="Leave Cantinflas A Review!"
          width={400}
          value={review}
          onChangeText={(text) => setReview(text)}
          multiline={true}
          style={{ marginTop: 10 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row", // Aligns items horizontally
  },
  buttonContainer: {
    justifyContent: "flex-start", // Aligns button to the left
    alignItems: "flex-start", // Aligns button to the top
    flexDirection: "row", // Aligns items horizontally
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  starContainer: {
    flexDirection: "row",
  },
});

export default Review;
