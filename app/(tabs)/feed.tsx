import { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { CatchCard } from '../../src/components/CatchCard';
import { Tabs, TabsList, TabsTrigger } from '../../src/components/ui/tabs';
import { Input } from '../../src/components/ui/input';
import { BottomNav } from '../../src/components/BottomNav';
import { Ionicons } from '@expo/vector-icons';

type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

interface Catch {
  id: string;
  userName: string;
  userAvatar: string;
  userLevel: number;
  fishSpecies: string;
  fishImage: string;
  weight: number;
  length?: number;
  rarity: Rarity;
  sizeRating: 'Average' | 'Big' | 'Trophy';
  xpGained: number;
  likes: number;
  isLiked: boolean;
  location?: string;
  date?: string;
  rod?: string;
  line?: string;
  reel?: string;
  bait?: string;
  time?: string;
  isPersonalBest?: boolean;
  waterTemp?: string;
  weather?: string;
  vsAverage?: number;
  avgWeight?: number;
  avgLength?: number;
}

const allCatches: Catch[] = [
  {
    id: '1',
    userName: 'Mike Rivers',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    userLevel: 15,
    fishSpecies: 'Largemouth Bass',
    fishImage: 'https://images.unsplash.com/photo-1623340130253-62b52ff52b96?w=600',
    weight: 3.2,
    length: 45,
    rarity: 'uncommon',
    sizeRating: 'Big',
    xpGained: 150,
    likes: 24,
    isLiked: false,
    location: 'Lake Superior',
    rod: 'Shimano Stradic 7ft Medium',
    reel: 'Daiwa BG 4000',
    line: 'Braid 20lb',
    bait: 'Soft Plastic Worm',
    time: '06:30 AM',
    isPersonalBest: true,
    vsAverage: 60,
    avgWeight: 2.0,
    avgLength: 35,
  },
  {
    id: '2',
    userName: 'Sarah Lake',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    userLevel: 8,
    fishSpecies: 'Rainbow Trout',
    fishImage: 'https://images.unsplash.com/photo-1635712291708-7afe9e037503?w=600',
    weight: 1.8,
    length: 30,
    rarity: 'common',
    sizeRating: 'Average',
    xpGained: 80,
    likes: 18,
    isLiked: true,
    location: 'River Valley',
    rod: 'Ugly Stik 6ft Light',
    reel: 'Pflueger President 25',
    line: 'Monofilament 6lb',
    bait: 'PowerBait Rainbow',
    time: '05:15 AM',
    isPersonalBest: false,
    vsAverage: 10,
    avgWeight: 1.5,
    avgLength: 28,
  },
  {
    id: '3',
    userName: 'John Angler',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    userLevel: 32,
    fishSpecies: 'Northern Pike',
    fishImage: 'https://images.unsplash.com/photo-1606902921678-deae69104d65?w=600',
    weight: 5.4,
    length: 80,
    rarity: 'rare',
    sizeRating: 'Trophy',
    xpGained: 300,
    likes: 89,
    isLiked: false,
    location: 'Deep Lake',
    rod: 'Abu Garcia Veritas 7.5ft Heavy',
    reel: 'Shimano Curado 200',
    line: 'Fluorocarbon 30lb',
    bait: 'Large Spinnerbait',
    time: '07:45 AM',
    isPersonalBest: true,
    vsAverage: 80,
    avgWeight: 4.0,
    avgLength: 70,
  },
  {
    id: '4',
    userName: 'Emma Waters',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    userLevel: 12,
    fishSpecies: 'Brook Trout',
    fishImage: 'https://images.unsplash.com/photo-1635712291708-7afe9e037503?w=600',
    weight: 2.1,
    length: 32,
    rarity: 'common',
    sizeRating: 'Big',
    xpGained: 120,
    likes: 32,
    isLiked: false,
    location: 'Mountain Stream',
    rod: 'Fenwick HMG 5.5ft Ultra Light',
    reel: 'Okuma Ceymar C-10',
    line: 'Monofilament 4lb',
    bait: 'Dry Fly - Royal Wulff',
    time: '06:00 AM',
    isPersonalBest: false,
    vsAverage: 30,
    avgWeight: 1.5,
    avgLength: 25,
  },
  {
    id: '5',
    userName: 'Carlos Fisher',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    userLevel: 28,
    fishSpecies: 'Channel Catfish',
    fishImage: 'https://images.unsplash.com/photo-1624971035938-64e503e44985?w=600',
    weight: 4.8,
    length: 60,
    rarity: 'epic',
    sizeRating: 'Trophy',
    xpGained: 280,
    likes: 156,
    isLiked: true,
    location: 'River Bend',
    rod: 'Catfish Pro 8ft Heavy',
    reel: 'Penn Battle II 6000',
    line: 'Braid 50lb',
    bait: 'Chicken Liver',
    time: '08:30 PM',
    isPersonalBest: true,
    vsAverage: 75,
    avgWeight: 3.0,
    avgLength: 50,
  },
  {
    id: '6',
    userName: 'Lisa Angler',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    userLevel: 19,
    fishSpecies: 'Walleye',
    fishImage: 'https://images.unsplash.com/photo-1606902921678-deae69104d65?w=600',
    weight: 2.5,
    length: 40,
    rarity: 'legendary',
    sizeRating: 'Big',
    xpGained: 140,
    likes: 67,
    isLiked: false,
    location: 'Crystal Lake',
    rod: 'St. Croix Premier 7ft Medium',
    reel: 'Pflueger Supreme 35',
    line: 'Fluorocarbon 10lb',
    bait: 'Jig Head with Minnow',
    time: '07:00 AM',
    isPersonalBest: false,
    vsAverage: 40,
    avgWeight: 2.0,
    avgLength: 38,
  },
];

export default function Feed() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'following' | 'explore'>('following');
  const [searchQuery, setSearchQuery] = useState('');
  const [catches, setCatches] = useState<Catch[]>(allCatches);

  // Filtrar catches baseado na busca e tab ativa
  const filteredCatches = useMemo(() => {
    let filtered = catches;

    // Filtrar por tab (Following mostra apenas os primeiros 3, Explore mostra todos)
    if (activeTab === 'following') {
      filtered = catches.slice(0, 3);
    }

    // Filtrar por busca
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.fishSpecies.toLowerCase().includes(query) ||
          c.userName.toLowerCase().includes(query) ||
          c.location?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [catches, activeTab, searchQuery]);

  const handleLike = (id: string) => {
    setCatches(
      catches.map((c) =>
        c.id === id
          ? {
              ...c,
              isLiked: !c.isLiked,
              likes: c.isLiked ? c.likes - 1 : c.likes + 1,
            }
          : c
      )
    );
  };

  const handleCatchClick = (id: string) => {
    router.push(`/(tabs)/catch/${id}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-1 bg-background pb-20">
        {/* Header com busca e tabs */}
        <View className="bg-background border-b border-border">
          <View className="p-4" style={{ gap: 16 }}>
            <Text className="text-2xl font-semibold">Feed</Text>

            {/* Search Bar */}
            <View className="relative">
              <View
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  marginTop: -8,
                  zIndex: 10,
                }}
              >
                <Ionicons name="search" size={16} color="#5a7a6b" />
              </View>
              <Input
                placeholder="Buscar capturas..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="pl-10"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    marginTop: -8,
                    zIndex: 10,
                  }}
                  activeOpacity={0.7}
                >
                  <Ionicons name="close-circle" size={18} color="#5a7a6b" />
                </TouchableOpacity>
              )}
            </View>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'following' | 'explore')}>
              <TabsList className="w-full">
                <TabsTrigger value="following" className="flex-1">
                  <Text className="text-sm font-medium">Seguindo</Text>
                </TabsTrigger>
                <TabsTrigger value="explore" className="flex-1">
                  <Text className="text-sm font-medium">Explorar</Text>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </View>
        </View>

        {/* Lista de Capturas */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >
          {filteredCatches.length > 0 ? (
            filteredCatches.map((catchData) => (
              <CatchCard
                key={catchData.id}
                {...catchData}
                onLike={handleLike}
                onClick={handleCatchClick}
              />
            ))
          ) : (
            <View className="items-center justify-center py-12">
              <Ionicons name="fish-outline" size={48} color="#9ca3af" />
              <Text className="text-muted-foreground mt-4 text-center">
                {searchQuery
                  ? 'Nenhuma captura encontrada'
                  : activeTab === 'following'
                  ? 'Você ainda não está seguindo ninguém'
                  : 'Nenhuma captura disponível'}
              </Text>
              {searchQuery && (
                <TouchableOpacity
                  onPress={() => setSearchQuery('')}
                  className="mt-4"
                  activeOpacity={0.7}
                >
                  <Text className="text-primary font-medium">Limpar busca</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </ScrollView>
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}
