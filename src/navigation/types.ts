/**
 * Navigation Route Types
 * Strongly typed navigation parameters
 */

export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { productId: string; productName: string };
  Cart: undefined;
};

export type ScreenNames = keyof RootStackParamList;

export default RootStackParamList;
