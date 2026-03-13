module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@reduxjs/toolkit|immer|react-native-paper|react-native-safe-area-context|react-native-screens|react-native-gesture-handler|react-native-vector-icons)/)',
  ],
};
