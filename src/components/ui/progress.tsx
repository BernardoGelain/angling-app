import * as React from 'react';
import { View } from 'react-native';
import { cn } from '../../lib/utils';

export interface ProgressProps extends React.ComponentProps<typeof View> {
  value?: number;
}

function Progress({ className, value = 0, ...props }: ProgressProps) {
  const percentage = Math.min(Math.max(value, 0), 100);

  return (
    <View
      className={cn('bg-[#2d6a4f]/20 relative h-2 w-full overflow-hidden rounded-full', className)}
      {...props}
    >
      <View
        className="bg-[#2d6a4f] h-full transition-all rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </View>
  );
}

export { Progress };
