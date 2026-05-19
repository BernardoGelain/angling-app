import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, MapPin, Info, TrendingUp, Award, Calendar, Weight, Fish } from 'lucide-react-native';
import { Badge } from '../../src/components/ui/badge';
import { Card } from '../../src/components/ui/card';
import { useAnimatedGradient } from '../../src/hooks/useAnimatedGradient';

type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
type Habitat = 'river' | 'lake' | 'ocean' | 'pond';

const rarityColors: Record<Rarity, { bg: string; text: string; label: string; bgHex: string; gradient?: string[] }> = {
  common: { bg: 'bg-gray-500', text: 'text-white', label: 'Comum', bgHex: '#6b7280' },
  uncommon: { bg: 'bg-[#52b788]', text: 'text-white', label: 'Incomum', bgHex: '#52b788' },
  rare: { bg: 'bg-[#219ebc]', text: 'text-white', label: 'Raro', bgHex: '#219ebc' },
  epic: { bg: 'bg-purple-500', text: 'text-white', label: 'Épico', bgHex: '#a855f7', gradient: ['#a855f7', '#ec4899'] },
  legendary: { bg: 'bg-[#ffb703]', text: 'text-white', label: 'Lendário', bgHex: '#ffb703', gradient: ['#ffb703', '#fb8500'] },
};

const habitatLabels: Record<Habitat, string> = {
  river: 'Rio',
  lake: 'Lago',
  ocean: 'Mar',
  pond: 'Açude',
};

// Mock data - would come from API/database in real app
const speciesDatabase: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Largemouth Bass',
    scientificName: 'Micropterus salmoides',
    description: 'O Black Bass é uma espécie de peixe esportivo muito procurado, conhecido por sua agressividade e força na pesca. Originário da América do Norte, foi introduzido no Brasil e se adaptou muito bem.',
    habitatType: 'lake' as Habitat,
    isExotic: true,
    rarity: 'uncommon' as Rarity,
    states: ['SP', 'MG', 'PR', 'SC', 'RS', 'RJ'],
    avgWeightKg: 2.5,
    minTypicalWeightKg: 0.5,
    maxTypicalWeightKg: 5.0,
    baseXp: 25,
    photo: 'https://images.unsplash.com/photo-1763047327227-3483a4b28096?w=800',
  },
  '2': {
    id: '2',
    name: 'Rainbow Trout',
    scientificName: 'Oncorhynchus mykiss',
    description: 'Truta arco-íris é uma espécie de água fria, muito apreciada tanto na pesca esportiva quanto na culinária. Requer águas limpas e bem oxigenadas.',
    habitatType: 'river' as Habitat,
    isExotic: true,
    rarity: 'common' as Rarity,
    states: ['SC', 'PR', 'RS', 'SP'],
    avgWeightKg: 1.2,
    minTypicalWeightKg: 0.3,
    maxTypicalWeightKg: 3.0,
    baseXp: 15,
    photo: 'https://images.unsplash.com/photo-1635712291708-7afe9e037503?w=800',
  },
  '3': {
    id: '3',
    name: 'Northern Pike',
    scientificName: 'Esox lucius',
    description: 'O Lúcio é um predador voraz, conhecido por seu corpo alongado e dentes afiados. É um peixe extremamente agressivo que ataca iscas com velocidade impressionante.',
    habitatType: 'lake' as Habitat,
    isExotic: true,
    rarity: 'rare' as Rarity,
    states: ['RS', 'SC'],
    avgWeightKg: 4.5,
    minTypicalWeightKg: 1.0,
    maxTypicalWeightKg: 10.0,
    baseXp: 40,
    photo: 'https://images.unsplash.com/photo-1606902921678-deae69104d65?w=800',
  },
  '4': {
    id: '4',
    name: 'Channel Catfish',
    scientificName: 'Ictalurus punctatus',
    description: 'Bagre americano é uma espécie introduzida no Brasil, muito resistente e de fácil criação. É apreciado pela sua carne e pela luta que proporciona na pesca.',
    habitatType: 'river' as Habitat,
    isExotic: true,
    rarity: 'common' as Rarity,
    states: ['SP', 'MG', 'PR', 'MS', 'GO'],
    avgWeightKg: 2.0,
    minTypicalWeightKg: 0.5,
    maxTypicalWeightKg: 6.0,
    baseXp: 20,
    photo: 'https://images.unsplash.com/photo-1624971035938-64e503e44985?w=800',
  },
  '5': {
    id: '5',
    name: 'Muskellunge',
    scientificName: 'Esox masquinongy',
    description: 'O Muskie é considerado o peixe dos mil lançamentos. É o maior membro da família dos lúcios e um dos troféus mais cobiçados pelos pescadores.',
    habitatType: 'lake' as Habitat,
    isExotic: true,
    rarity: 'legendary' as Rarity,
    states: ['RS'],
    avgWeightKg: 8.0,
    minTypicalWeightKg: 3.0,
    maxTypicalWeightKg: 20.0,
    baseXp: 100,
    photo: undefined,
  },
  '6': {
    id: '6',
    name: 'Bluefin Tuna',
    scientificName: 'Thunnus thynnus',
    description: 'O Atum Azul é um dos peixes mais valiosos e procurados do mundo. Conhecido por sua velocidade impressionante e tamanho gigantesco, é um verdadeiro troféu dos mares.',
    habitatType: 'ocean' as Habitat,
    isExotic: false,
    rarity: 'legendary' as Rarity,
    states: ['RJ', 'ES', 'BA', 'SC', 'RS'],
    avgWeightKg: 150.0,
    minTypicalWeightKg: 50.0,
    maxTypicalWeightKg: 300.0,
    baseXp: 150,
    photo: undefined,
  },
  '7': {
    id: '7',
    name: 'Walleye',
    scientificName: 'Sander vitreus',
    description: 'O Walleye é um peixe esportivo muito popular na América do Norte, conhecido por sua carne saborosa e olhos reflexivos característicos que lhe dão o nome.',
    habitatType: 'lake' as Habitat,
    isExotic: true,
    rarity: 'uncommon' as Rarity,
    states: ['RS', 'PR'],
    avgWeightKg: 1.8,
    minTypicalWeightKg: 0.5,
    maxTypicalWeightKg: 4.5,
    baseXp: 25,
    photo: undefined,
  },
  '8': {
    id: '8',
    name: 'Brook Trout',
    scientificName: 'Salvelinus fontinalis',
    description: 'A Truta Brook é uma espécie de água fria extremamente bela, com padrões de cores vibrantes. Requer águas pristinas e temperaturas baixas para sobreviver.',
    habitatType: 'river' as Habitat,
    isExotic: true,
    rarity: 'common' as Rarity,
    states: ['SC', 'PR', 'RS'],
    avgWeightKg: 0.8,
    minTypicalWeightKg: 0.2,
    maxTypicalWeightKg: 2.0,
    baseXp: 15,
    photo: undefined,
  },
  '9': {
    id: '9',
    name: 'Striped Bass',
    scientificName: 'Morone saxatilis',
    description: 'O Bass listrado é um peixe anádromo que pode viver tanto em água doce quanto salgada. É conhecido por sua força e resistência, proporcionando lutas épicas.',
    habitatType: 'ocean' as Habitat,
    isExotic: true,
    rarity: 'rare' as Rarity,
    states: ['RJ', 'ES', 'BA', 'SP'],
    avgWeightKg: 5.0,
    minTypicalWeightKg: 2.0,
    maxTypicalWeightKg: 15.0,
    baseXp: 45,
    photo: undefined,
  },
  '10': {
    id: '10',
    name: 'King Salmon',
    scientificName: 'Oncorhynchus tshawytscha',
    description: 'O Salmão Rei, também conhecido como Chinook, é o maior de todas as espécies de salmão. Altamente migratório e extremamente poderoso, é um dos maiores desafios da pesca esportiva.',
    habitatType: 'river' as Habitat,
    isExotic: true,
    rarity: 'epic' as Rarity,
    states: ['SC', 'PR'],
    avgWeightKg: 10.0,
    minTypicalWeightKg: 5.0,
    maxTypicalWeightKg: 25.0,
    baseXp: 75,
    photo: undefined,
  },
  '11': {
    id: '11',
    name: 'Black Crappie',
    scientificName: 'Pomoxis nigromaculatus',
    description: 'O Crappie preto é um panfish popular, conhecido por viajar em cardumes e ser relativamente fácil de pescar. É muito apreciado por sua carne delicada.',
    habitatType: 'pond' as Habitat,
    isExotic: true,
    rarity: 'common' as Rarity,
    states: ['SP', 'MG', 'PR', 'MS'],
    avgWeightKg: 0.5,
    minTypicalWeightKg: 0.2,
    maxTypicalWeightKg: 1.5,
    baseXp: 10,
    photo: undefined,
  },
};

// Mock user stats - would come from API/database in real app
const userStatsDatabase: Record<string, any> = {
  '1': { totalCaught: 12, biggestWeightKg: 3.8, firstCaughtDate: '15 Jan 2025', lastCaughtDate: '20 Jan 2025', totalXpEarned: 300 },
  '2': { totalCaught: 8, biggestWeightKg: 2.1, firstCaughtDate: '10 Jan 2025', lastCaughtDate: '18 Jan 2025', totalXpEarned: 120 },
  '3': { totalCaught: 3, biggestWeightKg: 6.5, firstCaughtDate: '05 Jan 2025', lastCaughtDate: '22 Jan 2025', totalXpEarned: 120 },
  '4': { totalCaught: 15, biggestWeightKg: 4.2, firstCaughtDate: '01 Jan 2025', lastCaughtDate: '24 Jan 2025', totalXpEarned: 300 },
  '5': { totalCaught: 0, biggestWeightKg: 0, firstCaughtDate: undefined, lastCaughtDate: undefined, totalXpEarned: 0 },
  '6': { totalCaught: 0, biggestWeightKg: 0, firstCaughtDate: undefined, lastCaughtDate: undefined, totalXpEarned: 0 },
  '7': { totalCaught: 0, biggestWeightKg: 0, firstCaughtDate: undefined, lastCaughtDate: undefined, totalXpEarned: 0 },
  '8': { totalCaught: 0, biggestWeightKg: 0, firstCaughtDate: undefined, lastCaughtDate: undefined, totalXpEarned: 0 },
  '9': { totalCaught: 0, biggestWeightKg: 0, firstCaughtDate: undefined, lastCaughtDate: undefined, totalXpEarned: 0 },
  '10': { totalCaught: 0, biggestWeightKg: 0, firstCaughtDate: undefined, lastCaughtDate: undefined, totalXpEarned: 0 },
  '11': { totalCaught: 0, biggestWeightKg: 0, firstCaughtDate: undefined, lastCaughtDate: undefined, totalXpEarned: 0 },
};

export default function SpeciesDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id || !speciesDatabase[id]) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-muted-foreground mb-4">Espécie não encontrada</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="px-4 py-2 bg-primary rounded-lg"
        >
          <Text className="text-white">Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const species = speciesDatabase[id];
  const userStats = userStatsDatabase[id] || { totalCaught: 0, biggestWeightKg: 0, totalXpEarned: 0 };
  const rarityColor = rarityColors[species.rarity];
  const isCaught = userStats.totalCaught > 0;

  // Animação do gradiente com efeito wave (apenas para rare, epic, legendary)
  const gradientColors = useAnimatedGradient(species.rarity);
  const shouldAnimate = species.rarity !== 'common' && species.rarity !== 'uncommon';

  // Calcular porcentagem da barra de progresso
  const progressPercentage = Math.min(
    ((species.avgWeightKg - species.minTypicalWeightKg) /
      (species.maxTypicalWeightKg - species.minTypicalWeightKg)) *
      100,
    100
  );

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Header with Image */}
        <View className="relative">
          {species.photo ? (
            <View className="relative" style={{ height: 256 }}>
              <Image
                source={{ uri: species.photo }}
                className="w-full h-full"
                style={{ resizeMode: 'cover' }}
              />
              {/* Overlay escuro sobre toda a foto quando não pescado */}
              {!isCaught && (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  }}
                />
              )}
              {/* Gradiente para legibilidade do texto (apenas quando pescado) */}
              {isCaught && (
                <LinearGradient
                  colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 120,
                  }}
                />
              )}
              {/* Ícone e pontos de interrogação quando não pescado */}
              {!isCaught && (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Fish size={128} color="#fff" strokeWidth={1.5} style={{ opacity: 0.5 }} />
                    <Text
                      className="font-bold text-white/90"
                      style={{
                        fontSize: 48,
                        position: 'absolute',
                        textShadowColor: 'rgba(0, 0, 0, 0.5)',
                        textShadowOffset: { width: 0, height: 2 },
                        textShadowRadius: 4,
                      }}
                    >
                      ???
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ) : (
            <View className="relative" style={{ height: 256, overflow: 'hidden' }}>
              {/* Gradiente animado com efeito wave (apenas para rare, epic, legendary) */}
              <LinearGradient
                colors={
                  shouldAnimate && gradientColors.length >= 3
                    ? (gradientColors as [string, string, string])
                    : [rarityColor.bgHex, rarityColor.bgHex, rarityColor.bgHex]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={shouldAnimate && gradientColors.length === 3 ? [0, 0.5, 1] : undefined}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              />
              {/* Fish icon and ??? for uncaught fish */}
              {!isCaught ? (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Fish size={128} color="#fff" strokeWidth={1.5}  />
                    <Text
                      className="font-bold text-white/90"
                      style={{
                        fontSize: 48,
                        position: 'absolute',
                        textShadowColor: 'rgba(0, 0, 0, 0.5)',
                        textShadowOffset: { width: 0, height: 2 },
                        textShadowRadius: 4,
                      }}
                    >
                      ???
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Fish size={128} color="#fff" strokeWidth={1.5} style={{ opacity: 0.5 }} />
                </View>
              )}
            </View>
          )}

          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-4 p-2 bg-black/40 rounded-full"
            style={{ top: 60 }}
          >
            <ArrowLeft size={20} color="#fff" strokeWidth={2} />
          </TouchableOpacity>

          {/* Rarity Badge */}
          <View className="absolute right-4" style={{ top: 60 }}>
            {species.rarity === 'common' || species.rarity === 'uncommon' ? (
              <Badge className={`${rarityColor.bg} ${rarityColor.text}`}>
                <Text className={rarityColor.text}>{rarityColor.label}</Text>
              </Badge>
            ) : (
              <View
                style={{
                  borderRadius: 9999,
                  overflow: 'hidden',
                }}
              >
                <LinearGradient
                  colors={
                    gradientColors.length >= 3
                      ? (gradientColors as [string, string, string])
                      : [rarityColor.bgHex, rarityColor.bgHex, rarityColor.bgHex]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  locations={gradientColors.length === 3 ? [0, 0.5, 1] : undefined}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text className="text-white text-xs font-medium">{rarityColor.label}</Text>
                </LinearGradient>
              </View>
            )}
          </View>

          {/* Species Name */}
          <View className="absolute bottom-4 left-4 right-4">
            <Text className="text-white text-3xl font-bold mb-1" style={{ textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 4 }}>
              {species.name}
            </Text>
            <Text className="text-white/90 text-base italic" style={{ textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 4 }}>
              {species.scientificName}
            </Text>
          </View>
        </View>

        <View className="px-4 mt-4" style={{ gap: 16, paddingBottom: 24 }}>
          {/* User Stats Card (if caught) */}
          {isCaught && (
            <View
              style={{
                borderRadius: 12,
                borderWidth: 1,
                borderColor: 'rgba(82, 183, 136, 0.3)',
                overflow: 'hidden',
              }}
            >
              <LinearGradient
                colors={['rgba(82, 183, 136, 0.1)', 'rgba(33, 158, 188, 0.1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ padding: 16 }}
              >
                <View className="flex-row items-center mb-3" style={{ gap: 8 }}>
                  <Award size={20} color="#52b788" strokeWidth={2} />
                  <Text className="text-sm font-medium">Suas Estatísticas</Text>
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                  <View style={{ width: '47%', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 8, padding: 12 }}>
                    <Text className="text-2xl font-bold" style={{ color: '#52b788' }}>{userStats.totalCaught}</Text>
                    <Text className="text-xs text-muted-foreground">Pescados</Text>
                  </View>
                  <View style={{ width: '47%', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 8, padding: 12 }}>
                    <Text className="text-2xl font-bold" style={{ color: '#219ebc' }}>{userStats.biggestWeightKg}kg</Text>
                    <Text className="text-xs text-muted-foreground">Maior Captura</Text>
                  </View>
                  <View style={{ width: '47%', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 8, padding: 12 }}>
                    <Text className="text-2xl font-bold" style={{ color: '#ffb703' }}>{userStats.totalXpEarned}</Text>
                    <Text className="text-xs text-muted-foreground">XP Total</Text>
                  </View>
                  <View style={{ width: '47%', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 8, padding: 12 }}>
                    <Text className="text-sm font-semibold">{userStats.lastCaughtDate || '-'}</Text>
                    <Text className="text-xs text-muted-foreground">Última Pesca</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          )}

          {/* Not Caught Yet */}
          {!isCaught && (
            <Card className="p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
              <View className="items-center py-3">
                <Text className="text-muted-foreground text-center">
                  Você ainda não pescou esta espécie. Seja o primeiro a capturar!
                </Text>
              </View>
            </Card>
          )}

          {/* Description */}
          <Card className="p-4">
            <View className="flex-row items-center mb-3" style={{ gap: 8 }}>
              <Info size={20} color="#1a3329" strokeWidth={2} />
              <Text className="text-lg font-semibold">Sobre</Text>
            </View>
            <Text className="text-sm text-muted-foreground leading-6 mb-3">
              {species.description}
            </Text>

            {species.isExotic && (
              <View style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', borderWidth: 1, borderColor: 'rgba(245, 158, 11, 0.3)', borderRadius: 8, padding: 8, marginTop: 12 }}>
                <Text className="text-xs" style={{ color: '#92400e' }}>
                  ⚠️ Espécie exótica/introduzida
                </Text>
              </View>
            )}
          </Card>

          {/* Habitat & Location */}
          <Card className="p-4">
            <View className="flex-row items-center mb-3" style={{ gap: 8 }}>
              <MapPin size={20} color="#1a3329" strokeWidth={2} />
              <Text className="text-lg font-semibold">Habitat & Distribuição</Text>
            </View>

            <View style={{ gap: 12 }}>
              <View>
                <Text className="text-sm text-muted-foreground mb-2">Tipo de Habitat</Text>
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                    borderRadius: 9999,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    alignSelf: 'flex-start',
                  }}
                >
                  <Text className="text-foreground">{habitatLabels[species.habitatType]}</Text>
                </View>
              </View>

              <View>
                <Text className="text-sm text-muted-foreground mb-2">Estados</Text>
                <View className="flex-row flex-wrap" style={{ gap: 8 }}>
                  {species.states.map((state) => (
                    <Badge key={state} variant="secondary">
                      <Text className="text-xs">{state}</Text>
                    </Badge>
                  ))}
                </View>
              </View>
            </View>
          </Card>

          {/* Size & Weight */}
          <Card className="p-4">
            <View className="flex-row items-center mb-3" style={{ gap: 8 }}>
              <Weight size={20} color="#1a3329" strokeWidth={2} />
              <Text className="text-lg font-semibold">Tamanho & Peso</Text>
            </View>

            <View style={{ gap: 16 }}>
              <View>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-sm text-muted-foreground">Peso Típico</Text>
                  <Text className="text-sm font-medium">
                    {species.minTypicalWeightKg}kg - {species.maxTypicalWeightKg}kg
                  </Text>
                </View>
                <View style={{ height: 8, backgroundColor: '#e5e7eb', borderRadius: 4, overflow: 'hidden' }}>
                  <LinearGradient
                    colors={['#52b788', '#219ebc']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      width: `${progressPercentage}%`,
                      height: '100%',
                    }}
                  />
                </View>
              </View>

              <View style={{ flexDirection: 'row', gap: 12 }}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: 8, padding: 12 }}>
                  <Text className="text-lg font-bold">{species.avgWeightKg}kg</Text>
                  <Text className="text-xs text-muted-foreground">Peso Médio</Text>
                </View>

                {isCaught && (
                  <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: 8, padding: 12 }}>
                    <Text className="text-lg font-bold" style={{ color: '#52b788' }}>{userStats.biggestWeightKg}kg</Text>
                    <Text className="text-xs text-muted-foreground">Seu Recorde</Text>
                  </View>
                )}
              </View>
            </View>
          </Card>

          {/* XP Info */}
          <Card className="p-4">
            <View className="flex-row items-center mb-3" style={{ gap: 8 }}>
              <TrendingUp size={20} color="#1a3329" strokeWidth={2} />
              <Text className="text-lg font-semibold">Experiência</Text>
            </View>

            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-sm text-muted-foreground mb-1">XP Base por Captura</Text>
                <Text className="text-2xl font-bold" style={{ color: '#52b788' }}>{species.baseXp} XP</Text>
              </View>

              {isCaught && (
                <View className="items-end">
                  <Text className="text-sm text-muted-foreground mb-1">XP Total Ganho</Text>
                  <Text className="text-xl font-bold">{userStats.totalXpEarned} XP</Text>
                </View>
              )}
            </View>
          </Card>

          {/* First Caught (if applicable) */}
          {isCaught && userStats.firstCaughtDate && (
            <Card className="p-4" style={{ backgroundColor: 'rgba(26, 51, 41, 0.05)' }}>
              <View className="flex-row items-center" style={{ gap: 12 }}>
                <Calendar size={20} color="#1a3329" strokeWidth={2} />
                <View>
                  <Text className="text-sm text-muted-foreground">Primeira Captura</Text>
                  <Text className="font-medium">{userStats.firstCaughtDate}</Text>
                </View>
              </View>
            </Card>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
