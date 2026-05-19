import * as React from 'react';
import { Pressable, Text, ActivityIndicator, View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex flex-row items-center justify-center gap-2 rounded-md font-medium transition-all disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[#2d6a4f] active:opacity-90',
        destructive: 'bg-[#d4183d] active:opacity-90',
        outline: 'border border-border bg-transparent active:bg-muted',
        secondary: 'bg-[#52b788] active:opacity-80',
        ghost: 'active:bg-muted',
        link: 'bg-transparent',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 py-1.5',
        lg: 'h-12 px-6 py-2.5',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva('text-sm font-medium', {
  variants: {
    variant: {
      default: 'text-white',
      destructive: 'text-white',
      outline: 'text-foreground',
      secondary: 'text-white',
      ghost: 'text-foreground',
      link: 'text-[#2d6a4f]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  textClassName?: string;
  loading?: boolean;
}

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ className, variant, size, children, textClassName, loading, disabled, ...props }, ref) => {
  const getIndicatorColor = () => {
    if (variant === 'default' || variant === 'destructive' || variant === 'secondary') {
      return 'white';
    }
    return '#2d6a4f';
  };

  return (
    <Pressable
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getIndicatorColor()} />
      ) : typeof children === 'string' ? (
        <Text className={cn(buttonTextVariants({ variant }), textClassName)}>
          {children}
        </Text>
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, height: '100%', position: 'absolute', bottom: 8 }}>
          {children}
        </View>
      )}
    </Pressable>
  );
});

Button.displayName = 'Button';

export { Button, buttonVariants };
