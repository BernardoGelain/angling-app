import * as React from 'react';
import { View, Text, ViewProps, TextProps } from 'react-native';
import { cn } from '../../lib/utils';

function Card({ className, children, style, ...props }: ViewProps & { className?: string }) {
  return (
    <View
      className={cn(
        'bg-card text-card-foreground rounded-xl border border-border',
        className
      )}
      style={[{ flexShrink: 0 }, style]}
      {...props}
    >
      {children}
    </View>
  );
}

function CardHeader({ className, style, children, ...props }: ViewProps & { className?: string }) {
  return (
    <View
      className={cn(
        'grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6',
        className
      )}
      style={[{ flexDirection: 'column', gap: 6 }, style]}
      {...props}
    >
      {children}
    </View>
  );
}

function CardTitle({ className, style, children, ...props }: TextProps & { className?: string }) {
  return (
    <Text
      className={cn('leading-none font-semibold', className)}
      style={style}
      {...props}
    >
      {children}
    </Text>
  );
}

function CardDescription({ className, style, children, ...props }: TextProps & { className?: string }) {
  return (
    <Text
      className={cn('text-muted-foreground', className)}
      style={style}
      {...props}
    >
      {children}
    </Text>
  );
}

function CardAction({ className, style, children, ...props }: ViewProps & { className?: string }) {
  return (
    <View
      className={cn(
        'self-start justify-self-end',
        className
      )}
      style={[{ alignSelf: 'flex-end' }, style]}
      {...props}
    >
      {children}
    </View>
  );
}

function CardContent({ className, style, children, ...props }: ViewProps & { className?: string }) {
  return (
    <View
      className={cn('px-6', className)}
      style={style}
      {...props}
    >
      {children}
    </View>
  );
}

function CardFooter({ className, style, children, ...props }: ViewProps & { className?: string }) {
  return (
    <View
      className={cn('flex items-center px-6 pb-6', className)}
      style={[{ flexDirection: 'row', alignItems: 'center' }, style]}
      {...props}
    >
      {children}
    </View>
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
