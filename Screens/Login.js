import React, { useState, useContext, useEffect } from "react";
import AppContext from "../AppContext.js";
import axios from "axios"; 
import { Button } from "react-native-paper";
import { SafeAreaView, StyleSheet, Image, Dimensions } from "react-native";
import { Switch } from "react-native-paper";
import { Tab } from "@rneui/themed";
import { TextInput } from "react-native-paper";
import { View, Text } from "react-native";

const windowWidth = Dimensions.get("window").width;

function Login({ navigation }) {
  const { API } = useContext(AppContext);
  const { primaryColors } = useContext(AppContext);
  const [segButtonValue, setSegButtonValue] = React.useState("login");
  const [isArtistSwitchOn, setIsArtistSwitchOn] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false); //state that allows the user to show imputed password
  const [index, setIndex] = React.useState(0); ///for tabs
  const tabNames = ["login", "sign-up"]; // Names of your tabs
  const primaryColor = "#0DBB80";
  const [login, setLogin] = React.useState({
    email: "",
    password: "",
  });
  const [signUp, setSignUp] = React.useState({
    first: "",
    last: "",
    email: "",
    password: "",
    passwordConfirm: "",
    artistCheck: "false",
  });



  // console.log("API", API);
  // console.log("primaryColors", primaryColors);


  const handleTabChange = (selectedIndex) => {
    setIndex(selectedIndex);

    // Determine the value of segButtonValue based on the selected tab
    const selectedTabValue = tabNames[selectedIndex];
    setSegButtonValue(selectedTabValue);
  };

    // Function to make the Axios GET request to fetch users
    // const fetchUsers = async () => {
    //   try {
    //     const response = await Axios.get(`${API.website}/users`); // Make the GET request
    //     const users = response.data; // Extract the data from the response
    //     // console.log("Fetched users:", users);
    //     // You can now work with the 'users' data as needed
    //   } catch (error) {
    //     console.error("Error fetching users:", error);
    //   }
    // };

        /**
   * adds a new users to the DB based on the state set from the textfields
   */
        const addUser = async () => {
          const newUsers = signUp
          axios.post(`${API.website}/users`, { users: newUsers })
            .then(res => {
              if (res.status === 200) {
                navigation.navigate("Home");
                console.log('NEW USER', newUsers)
              }
            })
            .catch(err => {
              alert('Sorry! Something went wrong. Please try to add User again.')
              console.log('err', err);
            })
        };

    // useEffect(() => {
    //   fetchUsers(); // Call the fetchUsers function when the component mounts
    // }, []); // The empty array [] ensures the effect runs once on mount



  /**
   * verify if the user is logged in
   */
  //check to see if user.user_warehouse is not undefined and console.log"admin" if it is
  //if user.user_warehouse is undefined then console.log "user"

  const loginUser = async () => {
    console.log("LOGIN", login.password)
  axios
  .post(`${API.website}/login`, {
      user_email: login.email,
      user_password: login.password,
    })
    .then((res) => {
      if (res.status === 200) {
        console.log("HELLLO")
        // console.log(res.data.token);
        // const token = res.data.token;
        // localStorage.setItem("authorization", token);
        // const user = res.data.user;
        // console.log("RES.DATA", res.data)
        // console.log("USER",user)
        // localStorage.setItem("user_email", user.user_email);
        // localStorage.setItem("user_first", user.user_first_name);
        // localStorage.setItem("user_name", user.user_first_name + " " + user.user_last_name);
        // localStorage.setItem("user_dod", user.user_dod_id);
        // localStorage.setItem("admin_warehouses", user.admin_warehouses);
        // localStorage.setItem("admin_organization", user.admin_organization);
      }
      // if(localStorage.getItem("authorization") !== undefined && res.data.user.USER_warehouses !== null ) window.location.href = "/home";
      // else if(localStorage.getItem("authorization") !== undefined && res.data.user.USER_warehouses == null) goToUserDetails(res.data.user);
      // if(localStorage.getItem("authorization") !== undefined && res.data.user.USER_warehouses !== null ) console.log("GOOD", localStorage)
      // else if(localStorage.getItem("authorization") !== undefined && res.data.user.USER_warehouses == null) console.log("BAD", localStorage)
    })
    .catch((err) => {
      alert("Sorry! You are not authorized to access this page.");
      console.log("err", err);
      console.log('error', err.response.data.message)
    });
};


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../assets/logoNoBack.png")}
          style={styles.avatarImage}
          resizeMode="contain"
        />
        <Tab
          value={index}
          onChange={handleTabChange}
          indicatorStyle={{
            backgroundColor: primaryColor,
            height: 3,
          }}
          style={styles.tab} // Apply the styles to the tab
        >
          <Tab.Item
            title="Log In"
            titleStyle={{ fontSize: 14, color: "black" }}
            // icon={{ name: "timer", type: "ionicon", color: "black" }}
            style={index === 0 ? styles.tabItemWhite : null}
          />
          <Tab.Item
            title="Sign Up"
            titleStyle={{ fontSize: 14, color: "black" }}
            // icon={{ name: "heart", type: "ionicon", color: "black" }}
            style={index === 1 ? styles.tabItemWhite : null}
          />
        </Tab>
        {segButtonValue === "login" ? ( // Conditionally render email and password inputs
          <View style={{ marginTop: 10 }}>
            <TextInput
              mode="outlined"
              label="Email"
              width={300}
              activeOutlineColor={primaryColor}
              value={login.email}
              onChangeText={(text) => setLogin({ ...login, email: text })} // Update the email in login state
            />
            <TextInput
              mode="outlined"
              label="Password"
              activeOutlineColor={primaryColor}
              width={300}
              secureTextEntry={!showPassword}
              value={login.password}
              onChangeText={(text) => setLogin({ ...login, password: text })} // Update the password in login state
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
            <Button
              icon="login"
              mode="contained"
              buttonColor={primaryColor}
              style={{ marginTop: 10 }}
              onPress={loginUser}
            >
              LOG IN
            </Button>
            <Text style={{ marginTop: 10, marginLeft: 110 }}>
              Forgot Password?
            </Text>
          </View>
        ) : (
          // Conditionally render first name and last name inputs
          <View style={{ marginTop: 10 }}>
            <TextInput
              activeOutlineColor={primaryColor}
              mode="outlined"
              label="First Name"
              width={300}
              value={signUp.first}
              onChangeText={(text) => setSignUp({ ...signUp, first: text })}
            />
            <TextInput
              activeOutlineColor={primaryColor}
              mode="outlined"
              label="Last Name"
              width={300}
              value={signUp.last}
              onChangeText={(text) => setSignUp({ ...signUp, last: text })}
            />
            <TextInput
              mode="outlined"
              activeOutlineColor={primaryColor}
              label="Email"
              width={300}
              value={signUp.email}
              onChangeText={(text) => setSignUp({ ...signUp, email: text })}
            />
            <TextInput
              mode="outlined"
              label="Password"
              activeOutlineColor={primaryColor}
              width={300}
              secureTextEntry={!showPassword}
              value={signUp.password}
              onChangeText={(text) => setSignUp({ ...signUp, password: text })}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
            <TextInput
              mode="outlined"
              label="Confirm Password"
              activeOutlineColor={primaryColor}
              width={300}
              secureTextEntry={!showPassword}
              value={signUp.passwordConfirm}
              onChangeText={(text) =>
                setSignUp({ ...signUp, passwordConfirm: text })
              }
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
            <Text style={{ marginTop: 10 }}>Are You An Artist?</Text>
            <View style={styles.switchContainer}>
              <Text>No</Text>
              <Switch
                color={primaryColor}
                value={isArtistSwitchOn}
                onValueChange={(newValue) => {
                  setIsArtistSwitchOn(newValue);
                  // Set signUp.artistCheck based on the new value of the Switch
                  setSignUp({ ...signUp, artistCheck: newValue });
                }}
              />
              <Text>Yes</Text>
            </View>
            <Button
              mode="contained"
              buttonColor={primaryColor}
              onPress={addUser}
            >
              SIGN UP
            </Button>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

export default Login;

  const styles = StyleSheet.create({
    avatarImage: {
      width: windowWidth / 1,
      height: 125,
      marginHorizontal: 5,
    },
    container: {
      flex: 1,
      justifyContent: "start",
      alignItems: "center",
    },
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
      marginBottom: 10,
    },
    tab: {
      backgroundColor: "#FFFBFE", // Set the background color to white
      height: 40, // Adjust the height as needed
      marginTop: 10,
    },
    tabItemWhite: {
      backgroundColor: "#FFFBFE", // Add a background color for the selected tab
    },
  });
