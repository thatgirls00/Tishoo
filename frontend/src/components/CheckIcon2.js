import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function CheckIcon2({ width = 20, height = 20, color = '#FFFFFF' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M16.6577 4.99731L7.49597 14.1591L3.33154 9.99463"
        stroke={color}
        strokeWidth="1.66577"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

