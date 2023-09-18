import React from 'react';
import { Button } from 'react-native-paper';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SegmentedButtons, TextInput } from 'react-native-paper';
import { Switch } from 'react-native-paper';
import { View, Text } from 'react-native';



function Login({ navigation }) {
  const [segButtonValue, setSegButtonValue] = React.useState('login');
  const [isArtistSwitchOn, setIsArtistSwitchOn] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);//state that allows the user to show imputed password
  const primaryColor = '#504a4b';
  const [login, setLogin] = React.useState({
    email: '',
    password: '',
  });
  const [signUp, setSignUp] = React.useState({
    first: '',
    last: '',
    email: '',
    password: '',
    passwordConfirm: '',
    artistCheck: ''
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'start',
      alignItems: 'center',
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 10,
    },
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <SafeAreaView style={styles.container}>
        <Text>TATTED</Text>
        <SegmentedButtons
          value={segButtonValue}
          onValueChange={setSegButtonValue}
          buttons={[
            { value: 'login', label: 'LOG IN' },
            { value: 'sign-up', label: 'SIGN UP' },
          ]}
        />
        {segButtonValue === 'login' ? ( // Conditionally render email and password inputs
          <View style={{ marginTop: 10 }}>
            <TextInput
              mode='outlined'
              label="Email"
              width={300}
              activeOutlineColor= {primaryColor}
              value={login.email}
              onChangeText={(text) => setLogin({ ...login, email: text })} // Update the email in login state
            />
            <TextInput
              mode='outlined'
              label="Password"
              activeOutlineColor= {primaryColor}
              width={300}
              secureTextEntry={!showPassword}
              value={login.password}
              onChangeText={(text) => setLogin({ ...login, password: text })} // Update the password in login state
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
            <Button 
              icon="login" 
              mode="contained" 
              buttonColor={primaryColor}
              style={{ marginTop: 10 }}
              onPress={() => navigation.navigate('Home')}>
                LOG IN
            </Button>
          </View>
        ) : (
          // Conditionally render first name and last name inputs
          <View style={{marginTop: 10}} >
            <TextInput
              activeOutlineColor= {primaryColor}
              mode='outlined'
              label="First Name"
              width={300}
              value={signUp.first}
              onChangeText={(text) => setSignUp({ ...signUp, first: text })} 
            />
            <TextInput
              activeOutlineColor= {primaryColor}
              mode='outlined'
              label="Last Name"
              width={300}
              value={signUp.last}
              onChangeText={(text) => setSignUp({ ...signUp, last: text })} 
            />
            <TextInput
              mode='outlined'
              activeOutlineColor= {primaryColor}
              label="Email"
              width={300}
              value={signUp.email}
              onChangeText={(text) => setSignUp({ ...signUp, email: text })} 
            />
            <TextInput
              mode='outlined'
              label="Password"
              activeOutlineColor= {primaryColor}
              width={300}
              secureTextEntry={!showPassword}
              value={signUp.password}
              onChangeText={(text) => setSignUp({ ...signUp, password: text })} 
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />}
            />
            <TextInput
              mode='outlined'
              label="Confirm Password"
              activeOutlineColor= {primaryColor}
              width={300}
              secureTextEntry={!showPassword}
              value={signUp.passwordConfirm}
              onChangeText={(text) => setSignUp({ ...signUp, passwordConfirm: text })} 
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />}
            />
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
              onPress={() => navigation.navigate('Home')}>
                SIGN UP
            </Button>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

export default Login;
