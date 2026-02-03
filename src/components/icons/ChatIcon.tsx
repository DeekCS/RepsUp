import Svg, { Path } from 'react-native-svg';

interface ChatIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function ChatIcon({ 
  width = 20, 
  height = 20, 
  color = '#362D26' 
}: ChatIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path 
        d="M6.875 10H6.88203M9.99297 10H10M13.118 10H13.125" 
        stroke={color} 
        strokeWidth="1.25" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M10 17.8125C14.3147 17.8125 17.8125 14.3147 17.8125 10C17.8125 5.68527 14.3147 2.1875 10 2.1875C5.68527 2.1875 2.1875 5.68527 2.1875 10C2.1875 11.2498 2.48095 12.4309 3.0027 13.4785C3.14136 13.7569 3.18751 14.0751 3.10713 14.3755L2.6418 16.1146C2.4398 16.8695 3.13048 17.5602 3.88543 17.3582L5.62452 16.8929C5.92495 16.8125 6.24313 16.8587 6.52151 16.9973C7.56904 17.5191 8.75023 17.8125 10 17.8125Z" 
        stroke={color} 
        strokeWidth="1.25"
      />
    </Svg>
  );
}
