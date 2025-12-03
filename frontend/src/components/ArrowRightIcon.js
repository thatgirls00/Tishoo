import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function ArrowRightIcon({ width = 16, height = 16, color = '#666666' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M5.99756 11.9951L9.99595 7.99669L5.99756 3.99829"
        stroke={color}
        strokeWidth="1.3328"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

