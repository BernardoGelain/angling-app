import * as React from 'react';
import { TextInput, View } from 'react-native';
import { cn } from '../../lib/utils';

export interface TextareaProps extends React.ComponentProps<typeof TextInput> {
  className?: string;
  rows?: number;
}

function Textarea({ className, rows = 3, ...props }: TextareaProps) {
  return (
    <View className="relative">
      <TextInput
        multiline
        numberOfLines={rows}
        className={cn(
          'flex min-h-16 w-full rounded-md border border-input bg-[#f3f7f5] px-3 py-2 text-base text-foreground placeholder:text-muted-foreground',
          className
        )}
        placeholderTextColor="#5a7a6b"
        textAlignVertical="top"
        {...props}
      />
    </View>
  );
}

export { Textarea };
