import { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../../src/components/ui/button';
import { Input } from '../../src/components/ui/input';
import { Label } from '../../src/components/ui/label';
import { Fish, Mail, Lock, User as UserIcon } from 'lucide-react-native';
import { FishingHook } from '../../src/components/FishingHook';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await SecureStore.setItemAsync('auth_token', 'fake-token-123');
      router.replace('/(tabs)/feed');
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  const handleSwitchToLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, position: 'relative' }}>
          {/* Background Image with Overlay */}
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1646492062457-3431b4452311?w=600' }}
              style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
            />
            <LinearGradient
              colors={['rgba(2, 48, 71, 0.9)', 'rgba(33, 158, 188, 0.85)', 'rgba(45, 106, 79, 0.95)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />
          </View>

          <ScrollView 
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Header Section */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24, paddingTop: 48, paddingBottom: 32 }}>
              <View className="mb-6">
                <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                  <View 
                    style={{ 
                      position: 'absolute',
                      width: 96,
                      height: 96,
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: 48,
                      opacity: 0.2,
                    }} 
                  />
                  <View 
                    style={{
                      width: 96,
                      height: 96,
                      backgroundColor: '#ffffff',
                      borderRadius: 24,
                      alignItems: 'center',
                      justifyContent: 'center',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 8 },
                      shadowOpacity: 0.3,
                      shadowRadius: 16,
                      elevation: 8,
                    }}
                  >
                    <Fish size={48} color="#2d6a4f" strokeWidth={2} />
                  </View>
                </View>
              </View>

              <Text className="text-white text-4xl mb-3 font-bold">FishQuest</Text>
              <Text className="text-white/90 text-lg text-center" style={{ maxWidth: 300 }}>
                Start your fishing adventure today
              </Text>
            </View>

            {/* Form Section */}
            <View 
              style={{
                backgroundColor: '#ffffff',
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
                paddingHorizontal: 24,
                paddingTop: 32,
                paddingBottom: 48,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.1,
                shadowRadius: 16,
                elevation: 8,
              }}
            >
              <Text className="text-2xl font-semibold mb-6">Create Account</Text>

              <View style={{ gap: 16 }}>
                <View>
                  <Label className="text-sm text-muted-foreground mb-1.5">Full Name</Label>
                  <View style={{ position: 'relative' }}>
                    <View style={{ position: 'absolute', left: 12, top: '50%', marginTop: -10, zIndex: 10 }}>
                      <UserIcon size={20} color="#9ca3af" strokeWidth={2} />
                    </View>
                    <Input
                      placeholder="Your name"
                      value={name}
                      onChangeText={setName}
                      className="pl-11 h-12"
                    />
                  </View>
                </View>

                <View>
                  <Label className="text-sm text-muted-foreground mb-1.5">Email</Label>
                  <View style={{ position: 'relative' }}>
                    <View style={{ position: 'absolute', left: 12, top: '50%', marginTop: -10, zIndex: 10 }}>
                      <Mail size={20} color="#9ca3af" strokeWidth={2} />
                    </View>
                    <Input
                      placeholder="your@email.com"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      className="pl-11 h-12"
                    />
                  </View>
                </View>

                <View>
                  <Label className="text-sm text-muted-foreground mb-1.5">Password</Label>
                  <View style={{ position: 'relative' }}>
                    <View style={{ position: 'absolute', left: 12, top: '50%', marginTop: -10, zIndex: 10 }}>
                      <Lock size={20} color="#9ca3af" strokeWidth={2} />
                    </View>
                    <Input
                      placeholder="Create a strong password"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      className="pl-11 h-12"
                    />
                  </View>
                </View>

                <Button onPress={handleRegister} className="w-full h-12 text-base mt-6">
                  <View className="flex-row items-center justify-center">
                    <Text className="text-white font-medium">Start Fishing</Text>
                    <View style={{ marginLeft: 8 }}>
                      <FishingHook size={20} color="#ffffff" strokeWidth={2} />
                    </View>
                  </View>
                </Button>
              </View>

              <View className="mt-6">
                <Text className="text-xs text-center text-muted-foreground">
                  By creating an account, you agree to our Terms and Privacy Policy
                </Text>
              </View>

              <View className="mt-8">
                <Text className="text-sm text-muted-foreground mb-3 text-center">
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={handleSwitchToLogin} activeOpacity={0.7}>
                  <Text className="text-[#2d6a4f] font-medium text-center">Login</Text>
                </TouchableOpacity>
              </View>

              {/* Social proof */}
              <View 
                className="mt-8 pt-6"
                style={{ borderTopWidth: 1, borderTopColor: '#e5e7eb' }}
              >
                <Text className="text-xs text-muted-foreground text-center">
                  Join <Text className="font-semibold text-[#2d6a4f]">10,000+</Text> anglers worldwide
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
