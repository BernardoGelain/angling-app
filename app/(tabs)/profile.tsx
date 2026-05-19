import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '../../src/components/ui/card';
import { Progress } from '../../src/components/ui/progress';
import { Badge } from '../../src/components/ui/badge';
import { Button } from '../../src/components/ui/button';
import { BottomNav } from '../../src/components/BottomNav';
import { Settings, Trophy, TrendingUp, ChevronRight, Camera, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAnimatedGradient } from '../../src/hooks/useAnimatedGradient';
import * as ImagePicker from 'expo-image-picker';

const pescadorImage = require('../../assets/icons/pescador.png');

// Ícones disponíveis na pasta icons
const avatarOptions = [
  { id: 1, source: require('../../assets/icons/pescador.png'), label: 'Pescador' },
  { id: 2, source: require('../../assets/icons/fisher.png'), label: 'Fisher' },
  { id: 3, source: require('../../assets/icons/pescador-chapeu.png'), label: 'Pescador Chapéu' },
  { id: 4, source: require('../../assets/icons/pescador-cinza.png'), label: 'Pescador Cinza' },
  { id: 5, source: require('../../assets/icons/pescador-colete.png'), label: 'Pescador Colete' },
  { id: 6, source: require('../../assets/icons/tamboril.png'), label: 'Tamboril' },
];

// Cores baseadas no nível
const getLevelColors = (level: number) => {
  if (level <= 10) {
    return {
      type: 'common' as const,
      staticColor: '#6b7280',
    };
  } else if (level <= 20) {
    return {
      type: 'uncommon' as const,
      staticColor: '#52b788',
    };
  } else if (level <= 30) {
    return {
      type: 'rare' as const,
      staticColor: '#219ebc',
    };
  } else if (level <= 39) {
    return {
      type: 'epic' as const,
      staticColor: '#a855f7',
    };
  } else {
    return {
      type: 'legendary' as const,
      staticColor: '#ffb703',
    };
  }
};

export default function Profile() {
  const router = useRouter();
  const currentXP = 3450;
  const levelXP = 5000;
  const level = 10;
  const xpProgress = (currentXP / levelXP) * 100;
  const [imageError, setImageError] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [customAvatarUri, setCustomAvatarUri] = useState<string | null>(null);
  
  const levelColors = getLevelColors(level);
  const gradientColors = useAnimatedGradient(levelColors.type);
  const shouldAnimate = levelColors.type === 'rare' || levelColors.type === 'epic' || levelColors.type === 'legendary';

  const handleAvatarSelect = (id: number) => {
    setSelectedAvatar(id);
    setCustomAvatarUri(null);
    setShowAvatarPicker(false);
  };

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão para acessar a galeria é necessária!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setCustomAvatarUri(result.assets[0].uri);
      setSelectedAvatar(null);
      setShowAvatarPicker(false);
    }
  };

  const getAvatarSource = () => {
    if (customAvatarUri) {
      return { uri: customAvatarUri };
    }
    if (selectedAvatar !== null) {
      const option = avatarOptions.find(opt => opt.id === selectedAvatar);
      return option ? option.source : pescadorImage;
    }
    return pescadorImage;
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-1 bg-background pb-20">
        <View className="relative" style={{ height: 128 }}>
          <Image
            source={require('../../assets/banner-mar.jpg')}
            style={{ 
              width: '100%', 
              height: '100%', 
              resizeMode: 'cover',
              transform: [{ rotate: '180deg' }]
            }}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: 8,
              borderRadius: 9999,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
              zIndex: 10,
            }}
            activeOpacity={0.7}
          >
            <Settings size={20} color="#1a3329" strokeWidth={2} />
          </TouchableOpacity>
          
          {/* Avatar e nome sobrepostos ao banner - mais acima */}
          <View
            style={{
              position: 'absolute',
              bottom: -30,
              left: 16,
              right: 16,
              flexDirection: 'row',
              alignItems: 'flex-end',
              gap: 16,
              zIndex: 5,
            }}
          >
            <View style={{ position: 'relative' }}>
              <View
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 48,
                  borderWidth: 4,
                  borderColor: levelColors.staticColor,
                  overflow: 'hidden',
                  elevation: 5,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                }}
              >
              {shouldAnimate ? (
                <LinearGradient
                  colors={
                    gradientColors.length >= 3
                      ? (gradientColors as [string, string, string])
                      : [levelColors.staticColor, levelColors.staticColor, levelColors.staticColor]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  locations={gradientColors.length === 3 ? [0, 0.5, 1] : undefined}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 44,
                  }}
                >
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 44,
                      overflow: 'hidden',
             
                      padding: 2,
                    }}
                  >
                    <Image
                      source={getAvatarSource()}
                      defaultSource={pescadorImage}
                      style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 42 }}
                      onError={() => setImageError(true)}
                    />
                  </View>
                </LinearGradient>
              ) : (
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 44,
                    overflow: 'hidden',
                    backgroundColor: levelColors.staticColor,
                  }}
                >
                  <Image
                    source={getAvatarSource()}
                    defaultSource={pescadorImage}
                    style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                    onError={() => setImageError(true)}
                  />
                </View>
              )}
                </View>
              <TouchableOpacity
                onPress={() => setShowAvatarPicker(true)}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: '#2d6a4f',
                  padding: 8,
                  borderRadius: 9999,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  elevation: 5,
                }}
                activeOpacity={0.7}
              >
                <Camera size={16} color="#ffffff" strokeWidth={2} />
              </TouchableOpacity>
            </View>
            <View style={{ paddingBottom: 38, flex: 1 }}>
              <Text className="text-2xl font-semibold">John Doe</Text>
              <Text className="text-muted-foreground">@johndoe</Text>
            </View>
          </View>
        </View>

        <ScrollView className="flex-1 " contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 64 }}>
          <View style={{ marginBottom: 24 }}>

            <Card className="p-4 mb-4">
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center gap-2">
                  <TrendingUp size={20} color="#52b788" strokeWidth={2} />
                  <Text className="font-medium">Level 12</Text>
                </View>
                <Text className="text-sm text-muted-foreground">
                  {currentXP} / {levelXP} XP
                </Text>
              </View>
              <Progress value={xpProgress} className="h-2" />
            </Card>

            <View className="flex-row gap-3 mb-6">
              <Card className="p-4 flex-1" style={{ alignItems: 'center' }}>
                <Text className="text-2xl font-semibold mb-1">127</Text>
                <Text className="text-sm text-muted-foreground">Catches</Text>
              </Card>
              <Card className="p-4 flex-1" style={{ alignItems: 'center' }}>
                <Text className="text-2xl font-semibold mb-1">18</Text>
                <Text className="text-sm text-muted-foreground">Species</Text>
              </Card>
              <Card className="p-4 flex-1" style={{ alignItems: 'center' }}>
                <Text className="text-2xl font-semibold mb-1">5.4kg</Text>
                <Text className="text-sm text-muted-foreground">Biggest</Text>
              </Card>
            </View>

            <Card className="p-4 mb-4">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="font-medium">Active Equipment</Text>
                <Button variant="ghost" size="sm">
                  <Text className="text-sm">Edit</Text>
                </Button>
              </View>

              <View style={{ gap: 12 }}>
                {[
                  { label: 'Current Rod', value: "Pro Pike Master 7'6\"" },
                  { label: 'Current Reel', value: 'Shimano Stradic 3000' },
                  { label: 'Favorite Line', value: 'PowerPro 20lb' },
                ].map((item, index) => (
                  <View
                    key={index}
                    className="flex-row items-center justify-between"
                    style={{
                      paddingVertical: 8,
                      borderBottomWidth: index < 2 ? 1 : 0,
                      borderBottomColor: '#e5e7eb',
                    }}
                  >
                    <Text className="text-sm text-muted-foreground">{item.label}</Text>
                    <Text className="text-sm font-medium">{item.value}</Text>
                  </View>
                ))}
              </View>
            </Card>

            <Card className="p-4">
              <TouchableOpacity
                className="flex-row items-center justify-between mb-4"
                onPress={() => router.push('/(tabs)/achievements')}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center gap-2">
                  <Trophy size={20} color="#ffb703" strokeWidth={2} />
                  <Text className="font-medium">Recent Achievements</Text>
                </View>
                <ChevronRight size={20} color="#9ca3af" strokeWidth={2} />
              </TouchableOpacity>

              <View style={{ gap: 12 }}>
                <View className="flex-row items-center gap-3">
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      backgroundColor: 'rgba(255, 183, 3, 0.1)',
                      borderRadius: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Trophy size={24} color="#ffb703" strokeWidth={2} />
                  </View>
                  <View className="flex-1">
                    <Text className="font-medium">Pike Master</Text>
                    <Text className="text-sm text-muted-foreground">Caught 5 pike species</Text>
                  </View>
                  <Badge className="bg-[#ffb703]">
                    <Text className="text-white text-xs">New</Text>
                  </Badge>
                </View>

                <View className="flex-row items-center gap-3">
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      backgroundColor: 'rgba(82, 183, 136, 0.1)',
                      borderRadius: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TrendingUp size={24} color="#52b788" strokeWidth={2} />
                  </View>
                  <View className="flex-1">
                    <Text className="font-medium">Century Club</Text>
                    <Text className="text-sm text-muted-foreground">100+ total catches</Text>
                  </View>
                </View>
              </View>

              <Button
                variant="outline"
                className="w-full mt-4"
                onPress={() => router.push('/(tabs)/achievements')}
              >
                <Text>Ver Todas as Conquistas</Text>
              </Button>
            </Card>
          </View>
        </ScrollView>
        <BottomNav />
      </View>

      {/* Modal de seleção de avatar */}
      <Modal
        visible={showAvatarPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAvatarPicker(false)}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            justifyContent: 'flex-end',
          }}
          onPress={() => setShowAvatarPicker(false)}
        >
          <Pressable
            style={{
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 24,
            }}
            onPress={(e) => e.stopPropagation()}
          >
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-semibold">Escolher Avatar</Text>
              <TouchableOpacity
                onPress={() => setShowAvatarPicker(false)}
                style={{ padding: 8 }}
                activeOpacity={0.7}
              >
                <X size={20} color="#1a3329" strokeWidth={2} />
              </TouchableOpacity>
            </View>

            <Text className="text-sm text-muted-foreground mb-4">
              Selecione um avatar ou faça upload da sua foto
            </Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
              {avatarOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => handleAvatarSelect(option.id)}
                  style={{
                    width: '30%',
                    aspectRatio: 1,
                    borderRadius: 12,
                    overflow: 'hidden',
                    borderWidth: selectedAvatar === option.id ? 3 : 2,
                    borderColor: selectedAvatar === option.id ? '#52b788' : '#e5e7eb',
                  }}
                  activeOpacity={0.7}
                >
                  <Image
                    source={option.source}
                    style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Button
              variant="outline"
              className="w-full"
              onPress={handleImagePicker}
            >
              <View className="flex-row items-center gap-2">
                <Camera size={16} color="#1a3329" strokeWidth={2} />
                <Text>Fazer Upload de Foto</Text>
              </View>
            </Button>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
