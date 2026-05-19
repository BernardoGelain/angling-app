import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter, useSegments, usePathname } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [hasRedirected, setHasRedirected] = useState(false);
  const router = useRouter();
  const segments = useSegments();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
      const token = await SecureStore.getItemAsync('auth_token');
      setIsAuthenticated(token !== null);
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === null || hasRedirected) return;

    const currentSegment = segments[0];
    const isInAuth = pathname?.startsWith('/(auth)');
    const isInTabs = pathname?.startsWith('/(tabs)');

    // Se já está na rota correta, não redireciona
    if (isAuthenticated && isInTabs) {
      setHasRedirected(true);
      return;
    }
    if (!isAuthenticated && isInAuth) {
      setHasRedirected(true);
      return;
    }

    // Redireciona apenas se necessário
    if (isAuthenticated && !isInTabs) {
      router.replace('/(tabs)/feed');
      setHasRedirected(true);
    } else if (!isAuthenticated && !isInAuth) {
      router.replace('/(auth)/login');
      setHasRedirected(true);
    }
  }, [isAuthenticated, segments, pathname, hasRedirected]);

  // Mostra loading apenas enquanto verifica auth
  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8faf9' }}>
        <ActivityIndicator size="large" color="#2d6a4f" />
      </View>
    );
  }

  // Após redirecionar, não renderiza nada (deixa a rota renderizar)
  return null;
}
