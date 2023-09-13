import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-native-paper';
import Artists from './Screens/Artists';
import Home from './Screens/Home';
import Login from "./Screens/Login";
import Settings from './Screens/Settings';
import { createStackNavigator } from '@react-navigation/stack'; 
import { View, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';



const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function App() {
  return (
    <Provider >
      <NavigationContainer>
      <View style={styles.container}>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Login"
            component={Login}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="login" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Artists"
            component={Artists}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="artstation" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="cog" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
        </View>
      </NavigationContainer>
    </Provider>
  );
}
