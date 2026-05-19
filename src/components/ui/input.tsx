import * as React from 'react';
import { TextInput, View } from 'react-native';
import { cn } from '../../lib/utils';

export interface InputProps extends React.ComponentProps<typeof TextInput> {
  className?: string;
}

function Input({ className, ...props }: InputProps) {
  return (
    <View className="relative">
      <TextInput
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-[#f3f7f5] px-3 py-2 text-base text-foreground placeholder:text-muted-foreground',
          className
        )}
        placeholderTextColor="#5a7a6b"
        {...props}
      />
    </View>
  );
}

export { Input };
