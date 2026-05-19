import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Clock, Heart, TrendingUp, Award, Thermometer, CloudRain, Calendar, BarChart3 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAnimatedGradient } from '../hooks/useAnimatedGradient';

const pescadorImage = require('../../assets/icons/pescador.png');

type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

interface CatchCardProps {
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
  onLike: (id: string) => void;
  onClick: (id: string) => void;
}

const rarityColors: Record<Rarity, { bgHex: string; borderHex: string; bgLightHex: string }> = {
  common: {
    bgHex: '#6b7280',
    borderHex: '#6b7280',
    bgLightHex: 'rgba(107, 114, 128, 0.08)', // Muito claro
  },
  uncommon: {
    bgHex: '#52b788',
    borderHex: '#52b788',
    bgLightHex: 'rgba(82, 183, 136, 0.08)', // Muito claro
  },
  rare: {
    bgHex: '#219ebc',
    borderHex: '#219ebc',
    bgLightHex: 'rgba(33, 158, 188, 0.08)', // Muito claro
  },
  epic: {
    bgHex: '#a855f7',
    borderHex: '#a855f7',
    bgLightHex: 'rgba(168, 85, 247, 0.08)', // Muito claro
  },
  legendary: {
    bgHex: '#ffb703',
    borderHex: '#ffb703',
    bgLightHex: 'rgba(255, 183, 3, 0.08)', // Muito claro
  },
};

const rarityLabels: Record<Rarity, string> = {
  common: 'Comum',
  uncommon: 'Incomum',
  rare: 'Raro',
  epic: 'Épico',
  legendary: 'Lendário',
};

export function CatchCard({
  id,
  userName,
  userAvatar,
  userLevel,
  fishSpecies,
  fishImage,
  weight,
  length,
  rarity,
  sizeRating,
  xpGained,
  likes,
  isLiked,
  location,
  date,
  rod,
  line,
  reel,
  bait,
  time,
  isPersonalBest,
  waterTemp,
  weather,
  vsAverage,
  avgWeight,
  avgLength,
  onLike,
  onClick,
}: CatchCardProps) {
  const sizeColors = {
    Average: 'bg-muted text-muted-foreground',
    Big: 'bg-[#219ebc] text-white',
    Trophy: 'bg-[#ffb703] text-white',
  };

  // Validação de rarity
  const validRarity: Rarity = rarity && rarityColors[rarity] ? rarity : 'common';
  const rarityColor = rarityColors[validRarity];
  const gradientColors = useAnimatedGradient(validRarity);
  const shouldAnimate = validRarity !== 'common' && validRarity !== 'uncommon';
  const [imageError, setImageError] = useState(false);
  const [equipmentExpanded, setEquipmentExpanded] = useState(false);

  // Reset image error when userAvatar changes
  useEffect(() => {
    setImageError(false);
  }, [userAvatar]);

  return (
    <Card
      className="overflow-hidden"
      style={{
        backgroundColor: rarityColor.bgLightHex,
        borderWidth: 2,
        borderColor: rarityColor.borderHex,
      }}
    >
      <View className="p-4" style={{ gap: 12 }}>
          {/* Header com usuário */}
          <View className="flex-row items-center gap-3">
            <View className="h-10 w-10 rounded-full overflow-hidden">
              <Image
                source={userAvatar && !imageError ? { uri: userAvatar } : pescadorImage}
                className="w-full h-full"
                style={{ resizeMode: 'cover' }}
                onError={() => setImageError(true)}
              />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center gap-2">
                <Text className="font-medium text-base">{userName}</Text>
                <Badge className="bg-[#52b788] text-white" style={{ paddingHorizontal: 6, paddingVertical: 2 }}>
                  <Text className="text-white" style={{ fontSize: 10, fontWeight: '600' }}>
                    Lvl {userLevel}
                  </Text>
                </Badge>
              </View>
              <Text className="text-sm text-muted-foreground">caught a {fishSpecies}</Text>
            </View>
          </View>

          {/* Imagem do peixe */}
          <TouchableOpacity onPress={() => onClick(id)} activeOpacity={0.7}>
            <View className="relative rounded-lg overflow-hidden" style={{ aspectRatio: 4 / 3 }}>
              <Image
                source={{ uri: fishImage }}
                className="w-full h-full"
                style={{ resizeMode: 'cover' }}
              />
            <View className="absolute top-2 right-2">
              {validRarity === 'common' || validRarity === 'uncommon' ? (
                  <Badge
                    className={
                      validRarity === 'common'
                        ? 'bg-gray-500/90'
                        : 'bg-[#52b788]/90'
                    }
                  >
                    <Text className="text-white" style={{ fontSize: 10, fontWeight: '600' }}>
                      {rarityLabels[validRarity]}
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
                          : [rarityColor.bgHex, rarityColor.bgHex, rarityColor.bgHex]
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
                      {rarityLabels[validRarity]}
                    </Text>
                    </LinearGradient>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>

          {/* Informações do peixe */}
          <View style={{ gap: 8 }}>
            <View className="flex-row items-center justify-between">
              <View style={{ flex: 1 }}>
                <View className="flex-row items-center gap-2 mb-1">
                  <Text className="font-medium text-base">{fishSpecies}</Text>
                  {isPersonalBest && (
                    <View
                      style={{
                        borderRadius: 9999,
                        overflow: 'hidden',
                      }}
                    >
                      <LinearGradient
                        colors={['#ffb703', '#fb8500']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                          paddingHorizontal: 8,
                          paddingVertical: 2,
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        <Award size={12} color="#fff" strokeWidth={2} />
                        <Text className="text-white" style={{ fontSize: 10, fontWeight: '600' }}>
                          PB
                        </Text>
                      </LinearGradient>
                    </View>
                  )}
                </View>
                <View className="flex-row items-center gap-2">
                  <Text className="text-sm font-medium text-foreground">{weight} kg</Text>
                  {length && (
                    <View className="flex-row items-center gap-2">
                      <Text className="text-sm text-muted-foreground">•</Text>
                      <Text className="text-sm text-muted-foreground">{length} cm</Text>
                    </View>
                  )}
                </View>
              </View>
              <View className="flex-row items-center gap-1">
                <TrendingUp size={16} color="#52b788" strokeWidth={2} />
                <Text className="font-medium text-[#52b788]">+{xpGained} XP</Text>
              </View>
            </View>

            {/* Location and Time */}
            {(location || time || date) && (
              <View style={{ gap: 6 }}>
                {location && (
                  <View className="flex-row items-center gap-2">
                    <MapPin size={14} color="#9ca3af" strokeWidth={2} />
                    <Text className="text-sm text-muted-foreground">{location}</Text>
                  </View>
                )}
                {time && (
                  <View className="flex-row items-center gap-2">
                    <Clock size={14} color="#9ca3af" strokeWidth={2} />
                    <Text className="text-sm text-muted-foreground">{time}</Text>
                  </View>
                )}
                {date && (
                  <View className="flex-row items-center gap-2">
                    <Calendar size={14} color="#9ca3af" strokeWidth={2} />
                    <Text className="text-sm text-muted-foreground">{date}</Text>
                  </View>
                )}
              </View>
            )}

            {/* Footer com ações */}
            <View className="flex-row items-center justify-between pt-2 border-t border-border">
              <TouchableOpacity
                onPress={() => onLike(id)}
                className="flex-row items-center gap-2"
                activeOpacity={0.7}
              >
                <Heart
                  size={20}
                  color={isLiked ? '#d4183d' : '#5a7a6b'}
                  fill={isLiked ? '#d4183d' : 'none'}
                  strokeWidth={2}
                />
                <Text className={`text-sm ${isLiked ? 'text-[#d4183d]' : 'text-muted-foreground'}`}>
                  {likes}
                </Text>
              </TouchableOpacity>
              {((rod || line || reel || bait) || (vsAverage !== undefined && avgWeight !== undefined && avgLength !== undefined)) && (
                <TouchableOpacity
                  onPress={() => setEquipmentExpanded(!equipmentExpanded)}
                  className="flex-row items-center gap-1"
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={equipmentExpanded ? 'chevron-up' : 'chevron-down'}
                    size={16}
                    color="#5a7a6b"
                  />
                  <Text className="text-sm text-muted-foreground">Details</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Comparison e Equipment - Escondido por padrão */}
            {equipmentExpanded && (
              <View style={{ gap: 8, marginTop: 8 }}>
                {/* Comparison with Average - PRIMEIRO */}
                {vsAverage !== undefined && avgWeight !== undefined && avgLength !== undefined && (
                  <View
                    className="rounded-lg p-3"
                    style={{
                      backgroundColor: rarityColor.bgLightHex,
                      borderWidth: 1,
                      borderColor: rarityColor.borderHex,
                    }}
                  >
                    <View className="flex-row items-center justify-between">
                      <View style={{ flex: 1 }}>
                        <Text className="text-xs text-muted-foreground mb-1">vs Average</Text>
                        <View className="flex-row items-center gap-1.5">
                          <BarChart3 size={16} color={rarityColor.borderHex} strokeWidth={2} />
                          <Text
                            className={`text-lg font-semibold ${vsAverage >= 50 ? 'text-[#52b788]' : 'text-foreground'}`}
                          >
                            +{vsAverage}%
                          </Text>
                        </View>
                      </View>
                      <View className="text-right">
                        <Text className="text-xs text-muted-foreground mb-1">Species Avg</Text>
                        <Text className="text-xs font-medium text-foreground">
                          {avgWeight} kg • {avgLength} cm
                        </Text>
                      </View>
                    </View>
                  </View>
                )}

                {/* Equipment Info - SEGUNDO */}
                {(rod || line || reel || bait) && (
                  <View
                    className="rounded-lg p-3"
                    style={{
                      backgroundColor: rarityColor.bgLightHex,
                      borderWidth: 1,
                      borderColor: rarityColor.borderHex,
                    }}
                  >
                    <View style={{ gap: 6 }}>
                      <Text className="font-medium text-foreground mb-1" style={{ fontSize: 12 }}>
                        Equipment
                      </Text>
                      {rod && (
                        <View className="flex-row items-start gap-2">
                          <Text className="text-muted-foreground" style={{ fontSize: 11, minWidth: 45 }}>
                            Rod:
                          </Text>
                          <Text className="text-foreground flex-1" style={{ fontSize: 11 }}>
                            {rod}
                          </Text>
                        </View>
                      )}
                      {reel && (
                        <View className="flex-row items-start gap-2">
                          <Text className="text-muted-foreground" style={{ fontSize: 11, minWidth: 45 }}>
                            Reel:
                          </Text>
                          <Text className="text-foreground flex-1" style={{ fontSize: 11 }}>
                            {reel}
                          </Text>
                        </View>
                      )}
                      {line && (
                        <View className="flex-row items-start gap-2">
                          <Text className="text-muted-foreground" style={{ fontSize: 11, minWidth: 45 }}>
                            Line:
                          </Text>
                          <Text className="text-foreground flex-1" style={{ fontSize: 11 }}>
                            {line}
                          </Text>
                        </View>
                      )}
                      {bait && (
                        <View className="flex-row items-start gap-2">
                          <Text className="text-muted-foreground" style={{ fontSize: 11, minWidth: 45 }}>
                            Bait:
                          </Text>
                          <Text className="text-foreground flex-1" style={{ fontSize: 11 }}>
                            {bait}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
    </Card>
  );
}
