import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './Login';
import UserHome from './UserHome';

const AppNavigator = createStackNavigator(
  {
    Login: { screen: Login },
    UserHome: { screen: UserHome },
  },
  {
    initialRouteName: 'Login', // Set the initial screen
  }
);

export default createAppContainer(AppNavigator);
