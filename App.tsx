import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { EstabsProvider } from './src/contexts/EstabsContext';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { EstabsList } from './src/screens/EstabsList';

export default function App() {
  return (
    <NavigationContainer>
      <EstabsProvider>
        <StatusBar style="auto" />
        <Routes />
      </EstabsProvider>
    </NavigationContainer>
  );
}
