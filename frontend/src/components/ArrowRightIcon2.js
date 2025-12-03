import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function ArrowRightIcon2({ width = 20, height = 20, color = '#9B9BAA' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M7.49609 14.9919L12.4934 9.99463L7.49609 4.99731"
        stroke={color}
        strokeWidth="1.66577"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

