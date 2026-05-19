import { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Button } from '../../src/components/ui/button';
import { Input } from '../../src/components/ui/input';
import { Label } from '../../src/components/ui/label';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await SecureStore.setItemAsync('auth_token', 'fake-token-123');
      router.replace('/(tabs)/feed');
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  const handleSwitchToRegister = () => {
    router.push('/(auth)/register');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 bg-background" contentContainerStyle={{ flexGrow: 1 }}>
          <View className="min-h-screen bg-background relative overflow-hidden">
          {/* Background Image with Overlay */}
          <View className="absolute inset-0 z-0">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1646492062457-3431b4452311?w=600' }}
              className="w-full h-full"
              style={{ resizeMode: 'cover' }}
            />
            <View 
              className="absolute inset-0" 
              style={{ 
                backgroundColor: 'rgba(2, 48, 71, 0.9)',
                // Simulando gradiente com overlay
              }} 
            />
          </View>

          {/* Content */}
          <View className="relative z-10 min-h-screen flex flex-col">
            {/* Header Section */}
            <View className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-8">
              <View className="mb-6">
                <View className="relative">
                  <View className="absolute inset-0 bg-white/20 rounded-full" style={{ opacity: 0.2 }} />
                  <View className="relative inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl shadow-2xl">
                    <Ionicons name="water" size={48} color="#2d6a4f" />
                  </View>
                </View>
              </View>

              <Text className="text-white text-4xl mb-3 font-bold">FishQuest</Text>
              <Text className="text-white/90 text-lg text-center max-w-xs">
                Track your catches, compete with friends, and become a fishing legend
              </Text>
            </View>

            {/* Form Section */}
            <View className="bg-white rounded-t-[2rem] px-6 py-8 shadow-2xl">
              <Text className="text-2xl font-semibold mb-6">Welcome Back</Text>

              <View style={{ gap: 16 }}>
                <View>
                  <Label className="text-sm text-muted-foreground mb-1.5">Email</Label>
                  <View className="relative">
                    <View style={{ position: 'absolute', left: 12, top: '50%', marginTop: -10, zIndex: 10 }}>
                      <Ionicons name="mail" size={20} color="#5a7a6b" />
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
                  <View className="relative">
                    <View style={{ position: 'absolute', left: 12, top: '50%', marginTop: -10, zIndex: 10 }}>
                      <Ionicons name="lock-closed" size={20} color="#5a7a6b" />
                    </View>
                    <Input
                      placeholder="Enter your password"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      className="pl-11 h-12"
                    />
                  </View>
                </View>

                <TouchableOpacity>
                  <Text className="text-sm text-[#2d6a4f] mt-2">Forgot password?</Text>
                </TouchableOpacity>

                <Button onPress={handleLogin} className="w-full h-12 text-base mt-6">
                  <View className="flex-row items-center justify-center">
                    <Text className="text-white font-medium">Login</Text>
                    <Ionicons name="arrow-forward" size={20} color="white" style={{ marginLeft: 8 }} />
                  </View>
                </Button>
              </View>

              <View className="mt-8">
                <Text className="text-sm text-muted-foreground mb-3 text-center">
                  Don't have an account?
                </Text>
                <TouchableOpacity onPress={handleSwitchToRegister}>
                  <Text className="text-[#2d6a4f] font-medium text-center">Create Account</Text>
                </TouchableOpacity>
              </View>

              {/* Social proof */}
              <View className="mt-8 pt-6 border-t border-border">
                <Text className="text-xs text-muted-foreground text-center">
                  Join <Text className="font-semibold text-[#2d6a4f]">10,000+</Text> anglers worldwide
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
