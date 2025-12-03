import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Icon11({ width = 28, height = 28, color = '#FFFFFF' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" fill="none">
      <Path
        d="M5.83154 13.9957H22.1599"
        stroke={color}
        strokeWidth="2.33262"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.9956 5.83157V22.1599"
        stroke={color}
        strokeWidth="2.33262"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

