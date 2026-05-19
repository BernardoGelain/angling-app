import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../src/components/ui/card';
import { Progress } from '../../src/components/ui/progress';
import { Badge } from '../../src/components/ui/badge';
import { Trophy, Star, Target, Fish, Waves, Award, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function Achievements() {
  const router = useRouter();
  const achievements = [
    {
      id: '1',
      icon: Trophy,
      title: 'Pike Master',
      description: 'Catch 5 different pike species',
      progress: 5,
      total: 5,
      unlocked: true,
      color: '#ffb703',
    },
    {
      id: '2',
      icon: Star,
      title: 'Century Club',
      description: 'Log 100 total catches',
      progress: 127,
      total: 100,
      unlocked: true,
      color: '#52b788',
    },
    {
      id: '3',
      icon: Target,
      title: 'Trophy Hunter',
      description: 'Catch 10 trophy-sized fish',
      progress: 7,
      total: 10,
      unlocked: false,
      color: '#ffb703',
    },
    {
      id: '4',
      icon: Fish,
      title: 'Species Collector',
      description: 'Catch 25 different species',
      progress: 18,
      total: 25,
      unlocked: false,
      color: '#219ebc',
    },
    {
      id: '5',
      icon: Waves,
      title: 'Early Bird',
      description: 'Catch 20 fish before 7 AM',
      progress: 12,
      total: 20,
      unlocked: false,
      color: '#2d6a4f',
    },
    {
      id: '6',
      icon: Award,
      title: 'Social Butterfly',
      description: 'Get 100 likes on your catches',
      progress: 89,
      total: 100,
      unlocked: false,
      color: '#d4183d',
    },
    {
      id: '7',
      icon: Trophy,
      title: 'Beginner Angler',
      description: 'Catch your first fish',
      progress: 1,
      total: 1,
      unlocked: true,
      color: '#52b788',
    },
    {
      id: '8',
      icon: Star,
      title: 'Weekend Warrior',
      description: 'Catch 50 fish on weekends',
      progress: 32,
      total: 50,
      unlocked: false,
      color: '#74c69d',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-1 bg-background pb-20">
        <View className="bg-background border-b border-border" style={{ zIndex: 10 }}>
          <View className="p-4">
            <View className="flex-row items-center gap-3 mb-2">
              <TouchableOpacity
                onPress={() => router.back()}
                className="p-2 -ml-2 rounded-lg"
                activeOpacity={0.7}
              >
                <ArrowLeft size={20} color="#1a3329" strokeWidth={2} />
              </TouchableOpacity>
              <Text className="flex-1 text-2xl font-semibold">Achievements</Text>
            </View>
            <Text className="text-sm text-muted-foreground">
              {achievements.filter((a) => a.unlocked).length} of {achievements.length} unlocked
            </Text>
          </View>
        </View>

        <ScrollView 
          className="flex-1" 
          contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            const progressPercent = (achievement.progress / achievement.total) * 100;

            return (
              <Card
                key={achievement.id}
                className={`p-4 ${achievement.unlocked ? 'border-[#2d6a4f]/50' : 'opacity-60'}`}
              >
                <View className="flex-row items-start gap-4">
                  <View
                    className={`w-12 h-12 rounded-lg items-center justify-center flex-shrink-0 ${
                      achievement.unlocked ? '' : 'bg-muted'
                    }`}
                    style={{
                      backgroundColor: achievement.unlocked
                        ? `${achievement.color}20`
                        : undefined,
                    }}
                  >
                    <Icon
                      size={24}
                      color={achievement.unlocked ? achievement.color : '#5a7a6b'}
                      strokeWidth={2}
                    />
                  </View>

                  <View className="flex-1 min-w-0">
                    <View className="flex-row items-start justify-between gap-2 mb-1">
                      <Text className="flex-1 font-medium">{achievement.title}</Text>
                      {achievement.unlocked && (
                        <Badge className="bg-[#52b788] flex-shrink-0">
                          <Text className="text-white text-xs">Unlocked</Text>
                        </Badge>
                      )}
                    </View>
                    <Text className="text-sm text-muted-foreground mb-2">
                      {achievement.description}
                    </Text>

                    {!achievement.unlocked && (
                      <View>
                        <View className="flex-row justify-between mb-1">
                          <Text className="text-muted-foreground text-sm">Progress</Text>
                          <Text className="font-medium text-sm">
                            {achievement.progress}/{achievement.total}
                          </Text>
                        </View>
                        <Progress value={progressPercent} className="h-2" />
                      </View>
                    )}
                  </View>
                </View>
              </Card>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
