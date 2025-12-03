import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function ExpandIcon({ width = 20, height = 20, color = '#9B9BAA' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M13.3262 14.9917L18.3235 9.99438L13.3262 4.99707"
        stroke={color}
        strokeWidth="1.66577"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.66308 4.99707L1.66577 9.99438L6.66308 14.9917"
        stroke={color}
        strokeWidth="1.66577"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}


