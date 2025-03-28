import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '@/screens/HomeScreen';
import {HOME_SCREEN} from './constant';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
