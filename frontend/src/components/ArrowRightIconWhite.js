import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function ArrowRightIconWhite({ width = 20, height = 20, color = 'white' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M7.49585 14.9919L12.4932 9.99462L7.49585 4.99731"
        stroke={color}
        strokeWidth="1.66577"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

