
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import HomeScreen from "./src/pages/homeScreen/HomeScreen";
import ProductDetailsScreen from "./src/pages/productDetailsScreen/ProductDetailsScreen";
import FavouritesScreen from "./src/pages/favouritesScreen/FavouritesScreen";
import { JSX, Suspense } from "react";
import { ActivityIndicator, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CartScreen from './src/pages/cartScreen/CartScreen';

const Stack = createNativeStackNavigator();

const StackBarScreen = [
  { name: "HomeScreen", screenComponent: HomeScreen },
  { name: "ProductDetailsScreen", screenComponent: ProductDetailsScreen },
  { name: "FavouritesScreen", screenComponent: FavouritesScreen },
  { name: "CartScreen", screenComponent: CartScreen },
]

const Loader = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <ActivityIndicator size="large" />
  </View>
);

export const StackNavigation = (): JSX.Element => {


  return (
    <Suspense fallback={<Loader />}>
      <Stack.Navigator
        initialRouteName={"HomeScreen"}
        screenOptions={{ headerShown: false }}
      >
        {StackBarScreen.map((el) => {
          return (
            <Stack.Screen
              key={String(el.name)}
              name={el.name}
              component={el.screenComponent}
              options={{ headerShown: false }}
            />
          );
        })}
      </Stack.Navigator>
    </Suspense>
  );
};


const App = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  )
}
export default App