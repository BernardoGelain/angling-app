import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Home, BarChart3, Trophy, User, BookOpen } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FishingHook } from './FishingHook';

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { id: 'feed', icon: Home, label: 'Feed', path: '/(tabs)/feed' },
    { id: 'species', icon: BookOpen, label: 'Espécies', path: '/(tabs)/species' },
    { id: 'add', icon: FishingHook, label: 'Add', path: '/(tabs)/add', special: true },
    { id: 'stats', icon: BarChart3, label: 'Stats', path: '/(tabs)/stats' },
    { id: 'profile', icon: User, label: 'Perfil', path: '/(tabs)/profile' },
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <View 
      className="absolute bottom-0 left-0 right-0 bg-card/95 border-t shadow-lg"
      style={{ 
        zIndex: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderTopColor: '#e5e7eb',
        borderTopWidth: 1,
      }}
    >
      <View 
        className="flex-row items-center justify-around px-4 py-3"
        style={{ maxWidth: 400, marginHorizontal: 'auto', gap: 8 }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.path);

          if (tab.special) {
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => router.push(tab.path as any)}
                className="flex flex-col items-center justify-center"
                style={{ marginTop: -32 }}
                activeOpacity={0.9}
              >
                <View
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    overflow: 'hidden',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 8,
                    borderWidth: 4,
                    borderColor: '#ffffff',
                  }}
                >
                  <LinearGradient
                    colors={['#2d6a4f', '#52b788']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      width: '100%',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {tab.id === 'add' ? (
                      <FishingHook size={32} color="#ffffff" strokeWidth={2.5} />
                    ) : (
                      <Icon size={32} color="#ffffff" strokeWidth={2.5} />
                    )}
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => router.push(tab.path as any)}
              className="flex flex-col items-center justify-center"
              style={{ 
                minWidth: 70,
                paddingVertical: 4,
                paddingHorizontal: 8,
                borderRadius: 12,
                backgroundColor: active ? 'rgba(45, 106, 79, 0.08)' : 'transparent',
              }}
              activeOpacity={0.7}
            >
              <View
                className="rounded-xl"
                style={{
                  padding: 8,
                }}
              >
                <Icon
                  size={24}
                  color={active ? '#2d6a4f' : '#9ca3af'}
                  strokeWidth={active ? 2.5 : 2}
                />
              </View>
              <Text
                className="font-medium"
                style={{
                  fontSize: 10,
                  marginTop: 4,
                  color: active ? '#2d6a4f' : '#9ca3af',
                }}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
