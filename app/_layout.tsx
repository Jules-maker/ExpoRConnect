import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';


import { useColorScheme } from '@/components/useColorScheme';
import { useEffect, useState } from 'react';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'begining',
  conected: {
    initialRouteName: '(tabs)',
  },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserLoginStatus = async () => {
      const canUseSecureStore = await SecureStore.isAvailableAsync();
      if(!canUseSecureStore) {
        console.error('SecureStore is not available');
      }
      const token = await SecureStore.getItemAsync('jwtToken');
      console.info(token);
      setIsUserLoggedIn(!!token);
    };

    checkUserLoginStatus();
  }, []);

  if (!loaded) {
    return null;
  }
  console.log('User logged in:', isUserLoggedIn);
  return <RootLayoutNav isUserLoggedIn={isUserLoggedIn} />;
}

function RootLayoutNav({ isUserLoggedIn }: { isUserLoggedIn: boolean}) {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {isUserLoggedIn ? (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
      ) : (
      <Stack>
        <Stack.Screen name="begining" options={{ headerShown: false }} />
      </Stack>
      )}
    </ThemeProvider>
  );
}
