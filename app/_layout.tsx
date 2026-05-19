import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { queryClient } from '../src/lib/query-client';
import '../global.css';

export default function RootLayout() {
  console.log('ROOT LAYOUT MOUNT');
  
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Stack 
          screenOptions={{ headerShown: false }}
          screenListeners={{
            state: () => {
              console.log('NAV STATE CHANGE');
            },
          }}
        />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
