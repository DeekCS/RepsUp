import Svg, { Path } from 'react-native-svg';

interface LocationIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function LocationIcon({ 
  width = 16, 
  height = 16, 
  color = '#F99043' 
}: LocationIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path 
        d="M3 6.83956C3 4.02867 5.23857 1.75 8 1.75C10.7614 1.75 13 4.02867 13 6.83956C13 9.62844 11.4042 12.8828 8.91431 14.0465C8.33394 14.3178 7.66606 14.3178 7.08569 14.0465C4.59583 12.8828 3 9.62844 3 6.83956Z" 
        stroke={color}
      />
      <Path 
        d="M6.125 6.75C6.125 7.24728 6.32254 7.72419 6.67417 8.07583C7.02581 8.42746 7.50272 8.625 8 8.625C8.49728 8.625 8.97419 8.42746 9.32583 8.07583C9.67746 7.72419 9.875 7.24728 9.875 6.75C9.875 6.25272 9.67746 5.77581 9.32583 5.42417C8.97419 5.07254 8.49728 4.875 8 4.875C7.50272 4.875 7.02581 5.07254 6.67417 5.42417C6.32254 5.77581 6.125 6.25272 6.125 6.75Z" 
        stroke={color}
      />
    </Svg>
  );
}
