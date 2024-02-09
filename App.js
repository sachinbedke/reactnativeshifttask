import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { useGetShiftsQuery } from './redux/shiftsApi';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import reduxStore from './redux/store';
import Home from './screens/Home';


const Stack = createNativeStackNavigator()



export default function App() {


  return <NavigationContainer>
    <Provider store={reduxStore}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="myshifts" component={Home} />
      </Stack.Navigator>

    </Provider>
  </NavigationContainer>
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
