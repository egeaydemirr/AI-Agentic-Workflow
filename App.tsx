/**
 * Main App Component
 * Root component with all providers
 */

import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RootNavigator } from './src/navigation';
import { Loading } from './src/shared/ui';
import { persistor, store } from './src/store';
import { theme } from './src/theme';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StoreProvider store={store}>
        <PersistGate
          loading={<Loading fullScreen message="Loading..." />}
          persistor={persistor}
        >
          <PaperProvider theme={theme}>
            <SafeAreaProvider>
              <StatusBar
                barStyle="dark-content"
                backgroundColor={theme.colors.background}
              />
              <RootNavigator />
            </SafeAreaProvider>
          </PaperProvider>
        </PersistGate>
      </StoreProvider>
    </GestureHandlerRootView>
  );
}

export default App;
