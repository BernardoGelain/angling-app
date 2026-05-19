import { View, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../src/components/ui/card';
import { BottomNav } from '../../src/components/BottomNav';
import { Calendar, TrendingUp, Trophy } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BarChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function Stats() {
  const monthlyData = [
    { month: 'Jan', catches: 8, xp: 640 },
    { month: 'Feb', catches: 12, xp: 960 },
    { month: 'Mar', catches: 15, xp: 1200 },
    { month: 'Apr', catches: 18, xp: 1440 },
    { month: 'May', catches: 22, xp: 1760 },
    { month: 'Jun', catches: 25, xp: 2100 },
  ];

  const speciesData = [
    { name: 'Bass', value: 35, color: '#2d6a4f' },
    { name: 'Trout', value: 28, color: '#52b788' },
    { name: 'Pike', value: 20, color: '#74c69d' },
    { name: 'Walleye', value: 12, color: '#219ebc' },
    { name: 'Other', value: 5, color: '#8ecae6' },
  ];

  const maxCatches = Math.max(...monthlyData.map((d) => d.catches));
  const totalSpecies = speciesData.reduce((sum, s) => sum + s.value, 0);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-1 bg-background pb-20">
        <View className="sticky top-0 bg-background z-10 border-b border-border">
          <View className="p-4">
            <Text className="text-2xl font-semibold">Statistics</Text>
          </View>
        </View>

        <ScrollView className="flex-1" contentContainerStyle={{ padding: 16, gap: 16 }}>
          {/* Monthly Summary Card */}
          <Card className="p-4" style={{ overflow: 'hidden' }}>
            <LinearGradient
              colors={['#2d6a4f', '#219ebc']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ 
                padding: 16,
                borderRadius: 12,
                margin: -16,
              }}
            >
              <View className="flex-row items-center gap-2 mb-2">
                <Calendar size={20} color="#ffffff" strokeWidth={2} />
                <Text className="text-white font-medium" style={{ fontSize: 16 }}>Monthly Summary</Text>
              </View>
              <Text className="text-white/90 mb-3" style={{ fontSize: 14 }}>
                In June you caught more Bass than any other month!
              </Text>
              <View className="flex-row gap-4">
                <View style={{ flex: 1 }}>
                  <Text className="text-2xl font-semibold text-white">25</Text>
                  <Text className="text-sm text-white/80" style={{ fontSize: 12 }}>Catches</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text className="text-2xl font-semibold text-white">2.1k</Text>
                  <Text className="text-sm text-white/80" style={{ fontSize: 12 }}>XP Gained</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text className="text-2xl font-semibold text-white">3</Text>
                  <Text className="text-sm text-white/80" style={{ fontSize: 12 }}>Trophies</Text>
                </View>
              </View>
            </LinearGradient>
          </Card>

          {/* Catches Over Time Chart */}
          <Card className="p-4">
            <View className="flex-row items-center gap-2 mb-4">
              <TrendingUp size={20} color="#52b788" strokeWidth={2} />
              <Text className="font-medium" style={{ fontSize: 16 }}>Catches Over Time</Text>
            </View>
            <BarChart
              data={{
                labels: monthlyData.map((d) => d.month),
                datasets: [
                  {
                    data: monthlyData.map((d) => d.catches),
                  },
                ],
              }}
              width={screenWidth - 64}
              height={200}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(45, 106, 79, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                barPercentage: 0.7,
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              showValuesOnTopOfBars
              withInnerLines={false}
              withVerticalLabels={true}
              withHorizontalLabels={true}
            />
          </Card>

          {/* Species Breakdown */}
          <Card className="p-4">
            <Text className="font-medium mb-4" style={{ fontSize: 16 }}>Species Breakdown</Text>
            <View style={{ alignItems: 'center', marginBottom: 16 }}>
              <PieChart
                data={speciesData.map((species) => ({
                  name: species.name,
                  population: species.value,
                  color: species.color,
                  legendFontColor: '#6b7280',
                  legendFontSize: 12,
                }))}
                width={screenWidth - 64}
                height={200}
                chartConfig={{
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </View>
            {/* Legend - Grid 2 colunas */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
              {speciesData.map((species, index) => (
                <View key={index} className="flex-row items-center gap-2" style={{ width: '48%' }}>
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: species.color,
                    }}
                  />
                  <Text className="text-sm" style={{ fontSize: 14 }}>
                    {species.name} ({species.value})
                  </Text>
                </View>
              ))}
            </View>
          </Card>

          {/* Record Catches */}
          <Card className="p-4">
            <View className="flex-row items-center gap-2 mb-4">
              <Trophy size={20} color="#ffb703" strokeWidth={2} />
              <Text className="font-medium" style={{ fontSize: 16 }}>Record Catches</Text>
            </View>
            <View style={{ gap: 12 }}>
              {[
                { name: 'Northern Pike', location: 'Crystal Lake', weight: '5.4 kg', rating: 'Trophy', ratingColor: '#ffb703' },
                { name: 'Largemouth Bass', location: 'Miller Pond', weight: '3.8 kg', rating: 'Big', ratingColor: '#219ebc' },
                { name: 'Rainbow Trout', location: 'Mountain Stream', weight: '2.3 kg', rating: 'Big', ratingColor: '#219ebc' },
              ].map((catchItem, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 12,
                    borderBottomWidth: index < 2 ? 1 : 0,
                    borderBottomColor: '#e5e7eb',
                  }}
                >
                  <View>
                    <Text className="font-medium" style={{ fontSize: 15 }}>{catchItem.name}</Text>
                    <Text className="text-sm text-muted-foreground" style={{ fontSize: 13 }}>
                      {catchItem.location}
                    </Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text className="font-semibold" style={{ fontSize: 15 }}>{catchItem.weight}</Text>
                    <Text style={{ fontSize: 13, color: catchItem.ratingColor }}>
                      {catchItem.rating}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </Card>
        </ScrollView>
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}
