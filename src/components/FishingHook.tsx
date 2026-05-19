import Svg, { Path, Circle } from 'react-native-svg';

interface FishingHookProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function FishingHook({ 
  size = 24, 
  color = '#ffffff', 
  strokeWidth = 2 
}: FishingHookProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="m17.586 11.414-5.93 5.93a1 1 0 0 1-8-8l3.137-3.137a.707.707 0 0 1 1.207.5V10"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.414 8.586 22 7"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx="19"
        cy="10"
        r="2"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
