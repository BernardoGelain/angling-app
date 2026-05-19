import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from '../../src/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '../../src/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../src/components/ui/avatar';
import { Badge } from '../../src/components/ui/badge';
import { BottomNav } from '../../src/components/BottomNav';
import { Ionicons } from '@expo/vector-icons';

export default function Rankings() {
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');

  const weeklyRankings = [
    { rank: 1, name: 'Sarah Lake', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', xp: 2450, level: 15 },
    { rank: 2, name: 'Mike Rivers', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', xp: 2340, level: 14 },
    { rank: 3, name: 'John Angler', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', xp: 2180, level: 14 },
    { rank: 4, name: 'Emma Waters', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', xp: 1920, level: 13 },
    { rank: 5, name: 'Chris Fisher', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris', xp: 1850, level: 13 },
    { rank: 6, name: 'Alex Stream', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', xp: 1720, level: 12 },
    { rank: 7, name: 'You (John Doe)', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User', xp: 1680, level: 12, isCurrentUser: true },
    { rank: 8, name: 'Lisa Bay', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa', xp: 1590, level: 12 },
  ];

  const monthlyRankings = [
    { rank: 1, name: 'Mike Rivers', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', xp: 8450, level: 14 },
    { rank: 2, name: 'Sarah Lake', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', xp: 8240, level: 15 },
    { rank: 3, name: 'Emma Waters', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', xp: 7920, level: 13 },
    { rank: 4, name: 'John Angler', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', xp: 7580, level: 14 },
    { rank: 5, name: 'Chris Fisher', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris', xp: 7120, level: 13 },
    { rank: 6, name: 'You (John Doe)', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User', xp: 6850, level: 12, isCurrentUser: true },
    { rank: 7, name: 'Alex Stream', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', xp: 6720, level: 12 },
    { rank: 8, name: 'Lisa Bay', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa', xp: 6490, level: 12 },
  ];

  const rankings = period === 'weekly' ? weeklyRankings : monthlyRankings;

  const getRankColor = (rank: number) => {
    if (rank === 1) return '#ffb703';
    if (rank === 2) return '#8ecae6';
    if (rank === 3) return '#74c69d';
    return '#5a7a6b';
  };

  return (
    <View className="flex-1 bg-background pb-20">
      <View className="sticky top-0 bg-background z-10 border-b border-border">
        <View className="p-4">
          <Text className="text-2xl font-semibold mb-4">Rankings</Text>
          <Tabs value={period} onValueChange={(v) => setPeriod(v as 'weekly' | 'monthly')}>
            <TabsList className="w-full">
              <TabsTrigger value="weekly" className="flex-1">
                Weekly
              </TabsTrigger>
              <TabsTrigger value="monthly" className="flex-1">
                Monthly
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        <Card className="p-4 mb-4 bg-gradient-to-r from-[#52b788]/10 to-[#74c69d]/10">
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 bg-[#2d6a4f] rounded-full items-center justify-center">
              <Ionicons name="trending-up" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-sm text-muted-foreground">Your Rank</Text>
              <Text className="text-xl font-semibold">
                #{rankings.find((r) => r.isCurrentUser)?.rank || '-'}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-sm text-muted-foreground">Total XP</Text>
              <Text className="text-xl font-semibold text-[#52b788]">
                {rankings.find((r) => r.isCurrentUser)?.xp || 0}
              </Text>
            </View>
          </View>
        </Card>

        <View className="gap-2">
          {rankings.map((user) => (
            <Card
              key={user.rank}
              className={`p-4 ${user.isCurrentUser ? 'border-[#2d6a4f] bg-[#2d6a4f]/5' : ''}`}
            >
              <View className="flex-row items-center gap-4">
                <View className="w-8 items-center">
                  {user.rank <= 3 ? (
                    <Ionicons name="trophy" size={24} color={getRankColor(user.rank)} />
                  ) : (
                    <Text className={`text-lg font-semibold`} style={{ color: getRankColor(user.rank) }}>
                      {user.rank}
                    </Text>
                  )}
                </View>

                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>

                <View className="flex-1">
                  <View className="flex-row items-center gap-2">
                    <Text className="font-medium flex-1" numberOfLines={1}>{user.name}</Text>
                    {user.isCurrentUser && (
                      <Badge variant="secondary">
                        <Text className="text-white text-xs">You</Text>
                      </Badge>
                    )}
                  </View>
                  <Text className="text-sm text-muted-foreground">Level {user.level}</Text>
                </View>

                <View className="items-end">
                  <Text className="font-semibold text-[#52b788]">{user.xp}</Text>
                  <Text className="text-xs text-muted-foreground">XP</Text>
                </View>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
      <BottomNav />
    </View>
  );
}
