import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function PlusIcon2({ width = 28, height = 28, color = 'white' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" fill="none">
      <Path
        d="M5.83156 13.9958H22.1599"
        stroke={color}
        strokeWidth="2.33262"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.9957 5.83154V22.1599"
        stroke={color}
        strokeWidth="2.33262"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

