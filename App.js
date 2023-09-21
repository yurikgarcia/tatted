import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Chat from "./Screens/Chat";
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
  const [selectedScreen, setSelectedScreen] = useState("Home"); // Default selected screen

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
    setSelectedScreen(screenName);
  };

  const renderAppBarItem = (iconName, screenName) => (
    <TouchableOpacity
      onPress={() => navigateToScreen(screenName)}
      style={styles.iconContainer}
    >
      <View style={styles.iconTextContainer}>
        <MaterialCommunityIcons
          name={iconName}
          size={24}
          color={selectedScreen === screenName ? "#0DBB80" : "white"}
        />
        <Text
          style={[
            styles.iconText,
            { color: selectedScreen === screenName ? "#0DBB80" : "white" },
          ]}
        >
          {screenName}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.appbarContainer}>
      <Appbar style={styles.appbar}>
        {renderAppBarItem("home", "Home")}
        {renderAppBarItem("login", "Login")}
        {renderAppBarItem("account-search", "Search")}
        {renderAppBarItem("chat", "Chat")}
        {renderAppBarItem("account-circle", "Settings")}
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

  return (
    <Provider theme={theme}>
      <View style={styles.container}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ArtistPage" component={ArtistPage} />
            <Stack.Screen name="Chat" component={Chat} />
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
  },
  container: {
    flex: 1,
  },
});

export default App;

