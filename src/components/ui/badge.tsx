import * as React from 'react';
import { View, Text } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-[#2d6a4f] text-white',
        secondary: 'border-transparent bg-[#52b788] text-white',
        destructive: 'border-transparent bg-[#d4183d] text-white',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.ComponentProps<typeof View>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <View className={cn(badgeVariants({ variant }), className)} {...props}>
      <Text
        className={cn(
          'text-xs font-medium',
          variant === 'default' || variant === 'secondary' || variant === 'destructive'
            ? 'text-white'
            : 'text-foreground'
        )}
      >
        {children}
      </Text>
    </View>
  );
}

export { Badge, badgeVariants };
