import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Fish } from 'lucide-react-native';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useAnimatedGradient } from '../hooks/useAnimatedGradient';


type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

interface SpeciesCardProps {
  id: string;
  name: string;
  rarity: Rarity;
  isCaught: boolean;
  photoUrl?: string;
  onClick?: (id: string) => void;
}

const rarityColors: Record<Rarity, { bg: string; border: string; text: string; bgHex: string; borderHex: string; textHex: string }> = {
  common: {
    bg: 'bg-gray-400/30',
    border: 'border-gray-400/40',
    text: 'text-gray-100',
    bgHex: 'rgba(156, 163, 175, 0.5)', // gray-400/50 - mais escuro
    borderHex: 'rgba(156, 163, 175, 0.6)', // gray-400/60
    textHex: '#f3f4f6', // gray-100
  },
  uncommon: {
    bg: 'bg-[#52b788]/30',
    border: 'border-[#52b788]/40',
    text: 'text-white',
    bgHex: 'rgba(82, 183, 136, 0.5)', // #52b788/50 - mais escuro
    borderHex: 'rgba(82, 183, 136, 0.6)', // #52b788/60
    textHex: '#ffffff',
  },
  rare: {
    bg: 'bg-[#219ebc]/30',
    border: 'border-[#219ebc]/40',
    text: 'text-white',
    bgHex: 'rgba(33, 158, 188, 0.5)', // #219ebc/50 - mais escuro
    borderHex: 'rgba(33, 158, 188, 0.6)', // #219ebc/60
    textHex: '#ffffff',
  },
  epic: {
    bg: 'bg-purple-500/30',
    border: 'border-purple-500/40',
    text: 'text-white',
    bgHex: 'rgba(168, 85, 247, 0.5)', // purple-500/50 - mais escuro
    borderHex: 'rgba(168, 85, 247, 0.6)', // purple-500/60
    textHex: '#ffffff',
  },
  legendary: {
    bg: 'bg-[#ffb703]',
    border: 'border-[#ffb703]/40',
    text: 'text-white',
    bgHex: 'rgba(255, 183, 3, 0.5)', // #ffb703/50 - mais escuro
    borderHex: 'rgba(255, 183, 3, 0.6)', // #ffb703/60
    textHex: '#ffffff',
  },
};

const rarityLabels: Record<Rarity, string> = {
  common: 'Comum',
  uncommon: 'Incomum',
  rare: 'Raro',
  epic: 'Épico',
  legendary: 'Lendário',
};

export function SpeciesCard({ id, name, rarity, isCaught, photoUrl, onClick }: SpeciesCardProps) {
  const colors = rarityColors[rarity];
  const { width } = useWindowDimensions();
  const gradientColors = useAnimatedGradient(rarity);
  
  // Responsive card dimensions maintaining 4:5 ratio
  // Calculate based on screen width: (width - padding*2 - gap) / 2
  const padding = 12 * 2; // 24px total padding
  const gap = 8; // gap between cards
  const availableWidth = width - padding - gap;
  const cardWidth = availableWidth / 2;
  const cardHeight = cardWidth * 1.25; // 4:5 ratio (width * 1.25 = height)
  const imageHeight = cardWidth; // Square image area
  const iconSize = Math.max(cardWidth * 0.25, 35); // 25% of width, min 35px
  const fontSize = cardWidth < 140 ? 11 : 12; // Responsive font size

  return (
    <TouchableOpacity 
      onPress={() => onClick?.(id)} 
      activeOpacity={0.7}
      style={{ 
        width: cardWidth, 
        height: cardHeight, 
        flex: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3, // Android shadow
      }}
    >
      <Card
        className="overflow-hidden"
        style={{ 
          width: cardWidth, 
          height: cardHeight, 
          flex: 0,
          borderRadius: 12,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          backgroundColor: colors.bgHex,
          borderWidth: 2,
          borderColor: colors.borderHex,
        }}
      >
        {/* Image Area - Fixed height */}
        <View 
          className="relative overflow-hidden" 
          style={{ 
            width: '100%', 
            height: imageHeight,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        >
          {isCaught && photoUrl ? (
            <>
              <Image
                source={{ uri: photoUrl }}
                className="w-full h-full"
                style={{ resizeMode: 'cover' }}
              />
              {/* Rarity Badge (only for caught fish) */}
              <View className="absolute top-2 right-2">
                {rarity === 'common' || rarity === 'uncommon' ? (
                  <Badge
                    className={
                      rarity === 'common'
                        ? 'bg-gray-500/90'
                        : 'bg-[#52b788]/90'
                    }
                  >
                    <Text className="text-white" style={{ fontSize: 10, fontWeight: '600' }}>
                      {rarityLabels[rarity]}
                    </Text>
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
                          : [colors.bgHex, colors.bgHex, colors.bgHex]
                      }
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      locations={gradientColors.length === 3 ? [0, 0.5, 1] : undefined}
                      style={{
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text className="text-white" style={{ fontSize: 10, fontWeight: '600' }}>
                        {rarityLabels[rarity]}
                      </Text>
                    </LinearGradient>
                  </View>
                )}
              </View>
            </>
          ) : (
            <>
              <View 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  backgroundColor: colors.bgHex,
                  justifyContent: 'center', 
                  alignItems: 'center',
                }}
              >
                <View style={{ alignItems: 'center', gap: 8 }}>
                  <View style={{ opacity: 0.5 }}>
                    <Fish 
                      size={iconSize}
                      stroke={colors.textHex}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: fontSize - 1,
                      fontWeight: '600',
                      color: colors.textHex,
                      opacity: 0.6,
                    }}
                  >
                    {rarityLabels[rarity]}
                  </Text>
                </View>
              </View>
              {/* Gradiente de transparente (topo) para cinza muito claro (parte inferior) */}
              <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'rgba(120, 120, 120, 0.3)']}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />
            </>
          )}
        </View>

        {/* Name Section - Fixed height to match total card height */}
        {isCaught ? (
          <View 
            className="p-2"
            style={{ 
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
              backgroundColor: colors.bgHex,
              height: cardHeight - imageHeight,
              justifyContent: 'center',
            }}
          >
            <Text
              className="font-medium text-center"
              style={{
                fontSize,
                color: colors.textHex,
              }}
              numberOfLines={1}
            >
              {name}
            </Text>
          </View>
        ) : (
          <View 
            className="p-2"
            style={{ 
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
              backgroundColor: colors.bgHex,
              height: cardHeight - imageHeight,
              justifyContent: 'center',
            }}
          >
            <Text
              className="font-medium text-center"
              style={{
                fontSize,
                color: colors.textHex,
              }}
              numberOfLines={1}
            >
              {name}
            </Text>
            <Text 
              className="text-center mt-0.5"
              style={{ 
                fontSize: fontSize - 2,
                color: colors.textHex,
                opacity: 0.6 
              }}
            >
              Não pescado
            </Text>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
}
