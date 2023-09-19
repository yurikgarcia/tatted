import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Screens/Home";
import Settings from "./Screens/Settings";
import ArtistPage from "./Screens/ArtistPage";
import Search from "./Screens/Search";
import Login from "./Screens/Login";
import Review from "./Screens/Review";
import { Provider, Appbar, useTheme } from "react-native-paper";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

const AppbarWithNavigation = () => {
  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.navigate("Home");
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };
  const navigateToSearch = () => {
    navigation.navigate("Search");
  };
  const navigateToSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={styles.appbarContainer}>
      <Appbar style={styles.appbar}>
        <TouchableOpacity onPress={navigateToHome} style={styles.iconContainer}>
          <View style={styles.iconTextContainer}>
            <MaterialCommunityIcons name="home" size={24} color="#0DBB80" />
            <Text style={styles.iconText}>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToLogin}
          style={styles.iconContainer}
        >
          <View style={styles.iconTextContainer}>
            <MaterialCommunityIcons name="login" size={24} color="#0DBB80" />
            <Text style={styles.iconText}>Login</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToSearch}
          style={styles.iconContainer}
        >
          <View style={styles.iconTextContainer}>
            <MaterialCommunityIcons
              name="artstation"
              size={24}
              color="#0DBB80"
            />
            <Text style={styles.iconText}>Artist</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToSettings}
          style={styles.iconContainer}
        >
          <View style={styles.iconTextContainer}>
            <MaterialCommunityIcons name="cog" size={24} color="#0DBB80" />
            <Text style={styles.iconText}>Settings</Text>
          </View>
        </TouchableOpacity>
      </Appbar>
    </View>
  );
};

const App = () => {
  const theme = useTheme();
  const [backgroundColor, setBackgroundColor] = useState("white");

  // Function to toggle background color
  const toggleBackgroundColor = () => {
    setBackgroundColor(backgroundColor === "white" ? "black" : "white");
  };

  console.log("backgroundColor: ", backgroundColor);

  return (
    <Provider theme={theme}>
      <View style={styles.container}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ArtistPage" component={ArtistPage} />
            <Stack.Screen name="Search">
              {(props) => (
                <Search
                  {...props}
                  toggleBackgroundColor={toggleBackgroundColor}
                  backgroundColor={backgroundColor}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Review" component={Review} />
          </Stack.Navigator>
          <AppbarWithNavigation />
        </NavigationContainer>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  appbarContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  appbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80, // Adjust the height as needed
    backgroundColor: "#000",
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
  },
  iconTextContainer: {
    alignItems: "center",
  },
  iconText: {
    fontSize: 12,
    color: '#0DBB80'
  },
  container: {
    flex: 1,
  },
});

export default App;
