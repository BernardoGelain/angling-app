import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SpeciesCard } from '../../src/components/SpeciesCard';
import { Input } from '../../src/components/ui/input';
import { Badge } from '../../src/components/ui/badge';
import { BottomNav } from '../../src/components/BottomNav';
import { Ionicons } from '@expo/vector-icons';

type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
type Habitat = 'river' | 'lake' | 'ocean' | 'pond';

interface Species {
  id: string;
  name: string;
  rarity: Rarity;
  habitat: Habitat;
  isCaught: boolean;
  photoUrl?: string;
}

export default function Species() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<Rarity | 'all'>('all');
  const [selectedHabitat, setSelectedHabitat] = useState<Habitat | 'all'>('all');
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  const allSpecies: Species[] = [
    {
      id: '1',
      name: 'Largemouth Bass',
      rarity: 'uncommon',
      habitat: 'lake',
      isCaught: true,
      photoUrl: 'https://images.unsplash.com/photo-1763047327227-3483a4b28096?w=400',
    },
    {
      id: '2',
      name: 'Rainbow Trout',
      rarity: 'common',
      habitat: 'river',
      isCaught: true,
      photoUrl: 'https://images.unsplash.com/photo-1635712291708-7afe9e037503?w=400',
    },
    {
      id: '3',
      name: 'Northern Pike',
      rarity: 'rare',
      habitat: 'lake',
      isCaught: true,
      photoUrl: 'https://images.unsplash.com/photo-1606902921678-deae69104d65?w=400',
    },
    {
      id: '4',
      name: 'Channel Catfish',
      rarity: 'common',
      habitat: 'river',
      isCaught: true,
      photoUrl: 'https://images.unsplash.com/photo-1624971035938-64e503e44985?w=400',
    },
    {
      id: '5',
      name: 'Muskellunge',
      rarity: 'legendary',
      habitat: 'lake',
      isCaught: false,
    },
    {
      id: '6',
      name: 'Bluefin Tuna',
      rarity: 'legendary',
      habitat: 'ocean',
      isCaught: false,
    },
    {
      id: '7',
      name: 'Walleye',
      rarity: 'uncommon',
      habitat: 'lake',
      isCaught: false,
    },
    {
      id: '8',
      name: 'Brook Trout',
      rarity: 'common',
      habitat: 'river',
      isCaught: false,
    },
    {
      id: '9',
      name: 'Striped Bass',
      rarity: 'rare',
      habitat: 'ocean',
      isCaught: false,
    },
    {
      id: '10',
      name: 'King Salmon',
      rarity: 'epic',
      habitat: 'river',
      isCaught: false,
    },
    {
      id: '11',
      name: 'Black Crappie',
      rarity: 'common',
      habitat: 'pond',
      isCaught: false,
    },
    {
      id: '12',
      name: 'Peacock Bass',
      rarity: 'epic',
      habitat: 'lake',
      isCaught: false,
    },
    {
      id: '13',
      name: 'Redfish',
      rarity: 'uncommon',
      habitat: 'ocean',
      isCaught: false,
    },
    {
      id: '14',
      name: 'Yellow Perch',
      rarity: 'common',
      habitat: 'lake',
      isCaught: true,
      photoUrl: 'https://images.unsplash.com/photo-1569058833425-f64d72c33627?w=400',
    },
    {
      id: '15',
      name: 'Arapaima',
      rarity: 'legendary',
      habitat: 'river',
      isCaught: false,
    },
    {
      id: '16',
      name: 'Tarpon',
      rarity: 'epic',
      habitat: 'ocean',
      isCaught: false,
    },
  ];

  const filteredSpecies = allSpecies.filter((species) => {
    const matchesSearch = species.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRarity = selectedRarity === 'all' || species.rarity === selectedRarity;
    const matchesHabitat = selectedHabitat === 'all' || species.habitat === selectedHabitat;
    return matchesSearch && matchesRarity && matchesHabitat;
  });

  const caughtCount = allSpecies.filter((s) => s.isCaught).length;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-1 bg-background pb-20">
        <View className="sticky top-0 bg-background z-10 border-b border-border">
        <View className="p-4" style={{ gap: 16 }}>
          <View>
            <Text className="text-2xl font-semibold mb-2">Espécies</Text>
            <Text className="text-sm text-muted-foreground">
              {caughtCount} de {allSpecies.length} pescadas
            </Text>
          </View>

          {/* Search */}
          <View className="relative">
            <View style={{ position: 'absolute', left: 12, top: '50%', marginTop: -8, zIndex: 10 }}>
              <Ionicons name="search" size={16} color="#5a7a6b" />
            </View>
            <Input
              placeholder="Buscar peixe..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="pl-10"
            />
          </View>

          {/* Filters - Collapsible */}
          <TouchableOpacity
            onPress={() => setFiltersExpanded(!filtersExpanded)}
            className="flex-row items-center justify-between"
            activeOpacity={0.7}
          >
            <View className="flex-row items-center gap-2">
              <Ionicons name="filter" size={16} color="#5a7a6b" />
              <Text className="text-sm font-medium text-foreground">Filtros</Text>
              {(selectedRarity !== 'all' || selectedHabitat !== 'all') && (
                <View className="w-2 h-2 bg-primary rounded-full" />
              )}
            </View>
            <Ionicons
              name={filtersExpanded ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#5a7a6b"
            />
          </TouchableOpacity>

          {filtersExpanded && (
            <View style={{ gap: 12 }}>
              {/* Rarity Filter */}
              <View style={{ gap: 8 }}>
                <Text className="text-sm text-muted-foreground">Raridade:</Text>
                <View className="flex-row gap-2 flex-wrap">
                  {(['all', 'common', 'uncommon', 'rare', 'epic', 'legendary'] as const).map((rarity) => (
                    <TouchableOpacity
                      key={rarity}
                      onPress={() => setSelectedRarity(rarity)}
                      activeOpacity={0.7}
                    >
                      <Badge
                        variant={selectedRarity === rarity ? 'default' : 'outline'}
                      >
                        <Text className={selectedRarity === rarity ? 'text-white' : 'text-foreground'}>
                          {rarity === 'all'
                            ? 'Todas'
                            : rarity === 'common'
                            ? 'Comum'
                            : rarity === 'uncommon'
                            ? 'Incomum'
                            : rarity === 'rare'
                            ? 'Raro'
                            : rarity === 'epic'
                            ? 'Épico'
                            : 'Lendário'}
                        </Text>
                      </Badge>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Habitat Filter */}
              <View style={{ gap: 8 }}>
                <Text className="text-sm text-muted-foreground">Habitat:</Text>
                <View className="flex-row gap-2 flex-wrap">
                  {(['all', 'river', 'lake', 'ocean', 'pond'] as const).map((habitat) => (
                    <TouchableOpacity
                      key={habitat}
                      onPress={() => setSelectedHabitat(habitat)}
                      activeOpacity={0.7}
                    >
                      <Badge
                        variant={selectedHabitat === habitat ? 'default' : 'outline'}
                      >
                        <Text className={selectedHabitat === habitat ? 'text-white' : 'text-foreground'}>
                          {habitat === 'all'
                            ? 'Todos'
                            : habitat === 'river'
                            ? 'Rio'
                            : habitat === 'lake'
                            ? 'Lago'
                            : habitat === 'ocean'
                            ? 'Mar'
                            : 'Açude'}
                        </Text>
                      </Badge>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Grid de Espécies */}
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 12 }}>
        <View style={{ 
          flexDirection: 'row', 
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
          {filteredSpecies.map((species) => (
            <View 
              key={species.id} 
              style={{ 
                width: '48%',
                marginBottom: 16,
                alignSelf: 'flex-start',
              }}
            >
              <SpeciesCard
                id={species.id}
                name={species.name}
                rarity={species.rarity}
                isCaught={species.isCaught}
                photoUrl={species.photoUrl}
                onClick={(id) => router.push(`/species/${id}`)}
              />
            </View>
          ))}
        </View>

        {filteredSpecies.length === 0 && (
          <View className="items-center py-12">
            <Text className="text-muted-foreground">Nenhuma espécie encontrada</Text>
          </View>
        )}
      </ScrollView>
      <BottomNav />
      </View>
    </SafeAreaView>
  );
}
