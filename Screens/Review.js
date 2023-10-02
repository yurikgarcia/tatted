import React, { useEffect, useContext, useState } from "react";
import AppContext from "../AppContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

function Review() {
  const { API } = useContext(AppContext);
  const navigation = useNavigation();
  const [artistName, setArtistName] = useState("");
  const [starReviews, setStarReviews] = useState(1); // Initialize starReviews to 0
  const [fullReview, setFullReview] = useState({
    review: "",
    date: "",
  });

  const primaryColor = "#0DBB80";

  // Set the starReviews variable to the selected rating
  const handleStarClick = (rating) => {
    setStarReviews(rating);
  };

  /*** Function that adds a user ater filing out the Sign Up form */
  const addReview = async () => {
    const userID = await AsyncStorage.getItem("user_id");
    const artistID = await AsyncStorage.getItem("selectedArtist");
    const reviewerFirstName = await AsyncStorage.getItem("user_first_name");
    const reviewerLastName = await AsyncStorage.getItem("user_last_name");
    axios
      .post(`${API.website}/reviews`, {
        userID: userID,
        artistID: artistID,
        review: fullReview,
        reviewerFirstName: reviewerFirstName,
        reviewerLastName: reviewerLastName,
        starReviews: starReviews,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("ADDED REVIEW!");
          navigation.navigate("ArtistPage");
        }
      })
      .catch((err) => {
        alert("Sorry! Something went wrong. Please try to add REVIEW again.");
        console.log("err", err);
      });
  };

  // Function that sets the current date on fullReview.date
  function setCurrentDate() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentDate = new Date();
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;

    setFullReview({ ...fullReview, date: formattedDate });
  }

  //function that pull   const artistName = AsyncStorage.getItem("selectedArtistName");
  async function artistNameSetter() {
    const artistName = await AsyncStorage.getItem("selectedArtistName");
    setArtistName(artistName);
  }

  useEffect(() => {
    setCurrentDate();
    artistNameSetter();
  }, []);


  return (
    <View>
      <View style={styles.buttonContainer}>
        <Button
          mode="text"
          labelStyle={{ color: "black" }}
          onPress={() => navigation.navigate("ArtistPage")}
        >
          CANCEL
        </Button>
        <Button
          mode="text"
          labelStyle={{ color: "black" }}
          style={{ marginLeft: 265 }}
          onPress={() => addReview()}
        >
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
          label={`Leave a Review for ${artistName}`}
          width={400}
          value={fullReview.review}
          onChangeText={(text) =>
            setFullReview({ ...fullReview, review: text })
          }
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
