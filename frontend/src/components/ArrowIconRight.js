import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function ArrowIconRight({ width = 20, height = 20, color = '#FB23CB' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M7.5 15L12.5 10L7.5 5"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

