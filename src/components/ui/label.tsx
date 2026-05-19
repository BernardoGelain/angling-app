import * as React from 'react';
import { Text } from 'react-native';
import { cn } from '../../lib/utils';

export interface LabelProps extends React.ComponentProps<typeof Text> {
  children: React.ReactNode;
}

function Label({ className, children, ...props }: LabelProps) {
  return (
    <Text
      className={cn('text-sm font-medium leading-none', className)}
      {...props}
    >
      {children}
    </Text>
  );
}

export { Label };
