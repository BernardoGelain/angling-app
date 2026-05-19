import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../../src/components/ui/button';
import { Input } from '../../src/components/ui/input';
import { Label } from '../../src/components/ui/label';
import { Textarea } from '../../src/components/ui/textarea';
import { Card } from '../../src/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../src/components/ui/select';
import { ArrowLeft, Camera } from 'lucide-react-native';
import { FishingHook } from '../../src/components/FishingHook';

export default function AddCatch() {
  const router = useRouter();
  const [species, setSpecies] = useState('');
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [bait, setBait] = useState('');
  const [rod, setRod] = useState('');
  const [line, setLine] = useState('');
  const [reel, setReel] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão para acessar a galeria é necessária!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    // Handle save
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View className="bg-background border-b border-border" style={{ zIndex: 10 }}>
          <View className="p-4 flex-row items-center gap-3">
            <TouchableOpacity 
              onPress={() => router.back()} 
              className="p-2 -ml-2 rounded-full"
              activeOpacity={0.7}
            >
              <ArrowLeft size={20} color="#1a3329" strokeWidth={2} />
            </TouchableOpacity>
            <Text className="text-2xl font-semibold">Log a Catch</Text>
          </View>
        </View>

        <ScrollView 
          className="flex" 
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16, width: '100%' }}
          showsVerticalScrollIndicator={false}
        >
          <View 
            className="mb-4 bg-card rounded-xl border border-border"
            style={{ 
              padding: 8,
       
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity 
              onPress={handleImagePicker}
              className="rounded-lg items-center justify-center"
              style={{ 
                aspectRatio: 16 / 9, 
                minHeight: 200,
                backgroundColor: '#e8f5e9',
                borderWidth: 1,
                borderColor: '#ffffff',
                borderRadius: 8,
              }}
              activeOpacity={0.7}
            >
              {image ? (
                <Image 
                  source={{ uri: image }} 
                  style={{ width: '100%', height: '100%', borderRadius: 8 }}
                  resizeMode="cover"
                />
              ) : (
                <>
                  <Camera size={48} color="#52b788" strokeWidth={2} />
                  <Text className="text-sm mt-2" style={{ color: '#2d6a4f' }}>Add Photo</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View style={{ gap: 16, marginBottom: 16 }}>
            <View>
              <Label className="text-sm text-muted-foreground mb-1.5">Fish Species *</Label>
              <Select value={species} onValueChange={setSpecies}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select species" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bass">Largemouth Bass</SelectItem>
                  <SelectItem value="pike">Northern Pike</SelectItem>
                  <SelectItem value="trout">Rainbow Trout</SelectItem>
                  <SelectItem value="walleye">Walleye</SelectItem>
                  <SelectItem value="catfish">Channel Catfish</SelectItem>
                  <SelectItem value="crappie">Black Crappie</SelectItem>
                </SelectContent>
              </Select>
            </View>

            <View>
              <Label className="text-sm text-muted-foreground mb-1.5">Weight (kg) *</Label>
              <Input
                placeholder="0.0"
                value={weight}
                onChangeText={setWeight}
                keyboardType="decimal-pad"
                className="mt-1.5"
              />
            </View>

            <View>
              <Label className="text-sm text-muted-foreground mb-1.5">Date & Time *</Label>
              <Input
                placeholder="Select date and time"
                value={date}
                onChangeText={setDate}
                className="mt-1.5"
              />
            </View>

            <View>
              <Label className="text-sm text-muted-foreground mb-1.5">Location *</Label>
              <Input
                placeholder="Lake name or spot"
                value={location}
                onChangeText={setLocation}
                className="mt-1.5"
              />
            </View>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text className="font-medium mb-4 text-foreground">Equipment</Text>
            <View style={{ gap: 16 }}>
              <View>
                <Label className="text-sm text-muted-foreground mb-1.5">Rod</Label>
                <Select value={rod} onValueChange={setRod}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select rod" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rod1">Pro Pike Master 7'6"</SelectItem>
                    <SelectItem value="rod2">UltraLight Spinner 6'</SelectItem>
                    <SelectItem value="rod3">Heavy Action 8'</SelectItem>
                  </SelectContent>
                </Select>
              </View>

              <View>
                <Label className="text-sm text-muted-foreground mb-1.5">Line</Label>
                <Select value={line} onValueChange={setLine}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select line" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="line1">PowerPro 20lb</SelectItem>
                    <SelectItem value="line2">Fluorocarbon 12lb</SelectItem>
                    <SelectItem value="line3">Monofilament 15lb</SelectItem>
                  </SelectContent>
                </Select>
              </View>

              <View>
                <Label className="text-sm text-muted-foreground mb-1.5">Reel</Label>
                <Select value={reel} onValueChange={setReel}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select reel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reel1">Shimano Stradic 3000</SelectItem>
                    <SelectItem value="reel2">Penn Battle II 4000</SelectItem>
                    <SelectItem value="reel3">Daiwa BG 2500</SelectItem>
                  </SelectContent>
                </Select>
              </View>
            </View>
          </View>

          <View style={{ marginBottom: 16, width: '100%' }}>
            <Label className="text-sm text-muted-foreground mb-1.5">Bait (optional)</Label>
            <Textarea
              placeholder="What bait or lure did you use?"
              value={bait}
              onChangeText={setBait}
              className="mt-1.5"
              numberOfLines={3}
            />
          </View>

          <Button onPress={handleSubmit} className="w-full pb-1" >

              <Text className="text-white font-medium">Save Catch</Text>
              <FishingHook size={20} color="#ffffff" strokeWidth={2} />
   
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
