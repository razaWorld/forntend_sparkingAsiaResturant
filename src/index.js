import { StyleSheet, View,Text } from 'react-native';
import React, { Suspense, lazy ,useEffect,useCallback} from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux';
import Splash from './screens/auth/onBoarding/splash';

// Lazy load the Routes component
const Routes = lazy(() => import('./routes'));

const App = () => {
 
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<Splash/>}>

          <Routes />
        
        </Suspense>
      </PersistGate>
    </Provider>
  );
};







export default App;
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
