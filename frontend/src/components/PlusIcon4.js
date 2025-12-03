import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function PlusIcon4({ width = 16, height = 16, color = '#FFFFFF' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M3.33203 7.99683H12.6616"
        stroke={color}
        strokeWidth="1.3328"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.99683 3.33203V12.6616"
        stroke={color}
        strokeWidth="1.3328"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

