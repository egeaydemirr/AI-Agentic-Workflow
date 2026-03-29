/**
 * Root Navigator
 * Central navigation configuration
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CartScreen from '../features/cart/screens/CartScreen';
import Catalog2Screen from '../features/catalog/screens/Catalog2Screen';
import CatalogScreen from '../features/catalog/screens/CatalogScreen';
import CategoriesScreen from '../features/catalog/screens/CategoriesScreen';
import CategorySelectionScreen from '../features/catalog/screens/CategorySelectionScreen';
import SortByScreen from '../features/catalog/screens/SortByScreen';
import HomeScreen from '../features/home/screens/HomeScreen';
import ProductDetailScreen from '../features/home/screens/ProductDetailScreen';
import { COLORS } from '../theme';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: COLORS.surface,
          },
          headerTintColor: COLORS.primaryDark,
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={({ route }) => ({
            headerShown: true,
            title: route.params.productName,
          })}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{
            headerShown: true,
            title: 'Sepetim',
          }}
        />
        <Stack.Screen
          name="Catalog"
          component={CatalogScreen}
          options={{
            headerShown: true,
            title: 'Katalog',
          }}
        />
        <Stack.Screen
          name="Catalog2"
          component={Catalog2Screen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{
            headerShown: true,
            title: 'Kategoriler',
          }}
        />
        <Stack.Screen
          name="SortBy"
          component={SortByScreen}
          options={{
            headerShown: true,
            title: 'Sırala',
          }}
        />
        <Stack.Screen
          name="CategorySelection"
          component={CategorySelectionScreen}
          options={{
            headerShown: true,
            title: 'Kategori Seçimi',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
