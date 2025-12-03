import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Icon4({ width = 20, height = 20, color = '#9C9C9C' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M14.9917 4.99731L4.99707 14.9919"
        stroke={color}
        strokeWidth="1.66577"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.99707 4.99731L14.9917 14.9919"
        stroke={color}
        strokeWidth="1.66577"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

