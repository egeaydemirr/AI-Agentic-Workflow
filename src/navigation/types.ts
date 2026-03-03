/**
 * Navigation Route Types
 * Strongly typed navigation parameters
 */

export type RootStackParamList = {
  Home: undefined;
  // Add more routes here with their parameters
  // Example: Profile: { userId: string };
};

export type ScreenNames = keyof RootStackParamList;

export default RootStackParamList;
