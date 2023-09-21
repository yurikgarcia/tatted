import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Appbar, SegmentedButtons } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import Review from "./Review";




function ArtistPage() {
  const [artistSegvalue, setArtistSegValue] = React.useState("info"); // Initialize with 'info'
  const [column1Images, setColumn1Images] = useState([]);
  const [column2Images, setColumn2Images] = useState([]);

    const navigation = useNavigation();


  useEffect(() => {
    // Fetch random images for column 1
    fetchRandomImages(5).then((images) => setColumn1Images(images));

    // Fetch random images for column 2
    fetchRandomImages(5).then((images) => setColumn2Images(images));
  }, []);

  const fetchRandomImages = async (count) => {
    const images = [];
    for (let i = 0; i < count; i++) {
      const response = await fetch(`https://picsum.photos/700?random=${i}`);
      const imageUrl = response.url;
      images.push(imageUrl);
    }
    return images;
  };


  

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {/* Your avatar circle picture goes here */}
        <View style={styles.avatar}>
          <Image
            source={require("../assets/artist2.jpg")}
            style={styles.avatarImage}
          />
        </View>
        <Text style={styles.name}>Adam Garcia</Text>
      </View>
      {/* Content for the remaining portion of the screen */}
      <SafeAreaView style={styles.content}>
        {/* Your content goes here */}
        <View style={styles.segContainer}>
          <SegmentedButtons
            style= {{ width: 400, justifyContent: 'center', marginLeft: 15}}
            density= 'regular'
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
                  <ScrollView>    
              <View
              // backgroundColor="blue" // Adjust the background color as needed
              style={styles.infoContent} >
              <Appbar style={styles.appbar}>
                <TouchableOpacity style={styles.iconContainer}>
                  <View style={styles.iconTextContainer}>
                    <MaterialCommunityIcons
                      name="account-plus-outline"
                      size={24}
                      color="black"
                    />
                    <Text style={styles.iconText}>ADD</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                  <View style={styles.iconTextContainer}>
                    <MaterialCommunityIcons
                      name="chat-outline"
                      size={24}
                      color="black"
                    />
                    <Text style={styles.iconText}>CHAT</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                  <View style={styles.iconTextContainer}>
                    <MaterialCommunityIcons
                      name="star-outline"
                      size={24}
                      color="black"
                      onPress={() => navigation.navigate("Review")}
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
              </Appbar>
              <Text style={{ color: styles.subHeading, fontWeight: 'bold', marginTop: 10, marginLeft: 5 }}>ABOUT</Text>
              <Text style={styles.bodyText}> Que vuelta acere! Soy tremendo artista paque tu sepas!</Text>
              <Text style={styles.bodyText}> Aqui se hacen tremendos tatuajes y vendemos mejores croquetas!</Text>
              <Text style={{ color: styles.subHeading, fontWeight: 'bold', marginTop: 10, marginLeft: 5 }}>TATTOO SHOP</Text>
              <Text style={styles.bodyText}> La Marca Tatuaje</Text>
              <Text style={styles.bodyText}> 6867 Calle Ocho</Text>
              <Text style={styles.bodyText}> Miami, FL 33144</Text>
              <Text style={{ color: styles.subHeading, fontWeight: 'bold', marginTop: 10, marginLeft: 5 }}>PHOTOS</Text>
              
              <View style={{ flexDirection: 'row', marginLeft: 3}}>
                <FlatList
                  data={column1Images}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.photo} />
                  )}
                />
                <FlatList
                  data={column2Images}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.photo} />
                  )}
                />
              </View>



            </View>
            </ScrollView>

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
  avatarContainer: {
    marginTop: 5,
    justifyContent: "center",
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
  container: {
    flex: 1,
  },
  photosContainer: {
    marginTop: 10, // Adjust the margin as needed
    paddingHorizontal: 10, // Adjust the padding as needed
  },
  photo: {
    width: 200,
    height: 200,
    margin: 5,
  },
  name: {
    marginLeft: "37%",
    marginTop: 5,
    marginBottom: 5,
  },
  boyText: {
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
    marginBottom: 10, // Adjust the bottom margin as needed
  },
  aboutMe: {
    color: "black",
  }
});

export default ArtistPage;
