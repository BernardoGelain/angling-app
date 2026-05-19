import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { cn } from '../../lib/utils';

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

function Tabs({
  value,
  onValueChange,
  className,
  children,
  ...props
}: {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  children: React.ReactNode;
} & React.ComponentProps<typeof View>) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <View className={cn('flex flex-col gap-2', className)} {...props}>
        {children}
      </View>
    </TabsContext.Provider>
  );
}

function TabsList({ className, children, ...props }: React.ComponentProps<typeof View>) {
  return (
    <View
      className={cn('bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px] flex flex-row', className)}
      {...props}
    >
      {children}
    </View>
  );
}

function TabsTrigger({
  value: triggerValue,
  className,
  children,
  ...props
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
} & React.ComponentProps<typeof TouchableOpacity>) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');

  const isActive = context.value === triggerValue;

  return (
    <TouchableOpacity
      onPress={() => context.onValueChange(triggerValue)}
      className={cn(
        'inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors',
        isActive
          ? 'bg-white dark:bg-input/30 border-input text-foreground'
          : 'text-muted-foreground',
        className
      )}
      activeOpacity={0.7}
      {...props}
    >
      <Text
        className={cn(
          'text-sm font-medium',
          isActive ? 'text-foreground' : 'text-muted-foreground'
        )}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

function TabsContent({
  value: contentValue,
  className,
  children,
  ...props
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
} & React.ComponentProps<typeof View>) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');

  if (context.value !== contentValue) return null;

  return (
    <View className={cn('flex-1', className)} {...props}>
      {children}
    </View>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
