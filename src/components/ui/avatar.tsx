import * as React from 'react';
import { View, Image, Text } from 'react-native';
import { cn } from '../../lib/utils';

function Avatar({ className, children, ...props }: React.ComponentProps<typeof View>) {
  return (
    <View
      className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    >
      {children}
    </View>
  );
}

function AvatarImage({ className, src, alt, ...props }: { className?: string; src?: string; alt?: string } & React.ComponentProps<typeof Image>) {
  return (
    <Image
      source={{ uri: src }}
      className={cn('aspect-square h-full w-full', className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, children, ...props }: React.ComponentProps<typeof View>) {
  return (
    <View
      className={cn('bg-muted flex h-full w-full items-center justify-center rounded-full', className)}
      {...props}
    >
      <Text className="text-sm font-medium text-muted-foreground">{children}</Text>
    </View>
  );
}

export { Avatar, AvatarImage, AvatarFallback };
