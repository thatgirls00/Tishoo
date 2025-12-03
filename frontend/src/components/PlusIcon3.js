import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function PlusIcon3({ width = 20, height = 20, color = 'white' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M4.16443 9.99463H15.8248"
        stroke={color}
        strokeWidth="1.66577"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.99463 4.16431V15.8247"
        stroke={color}
        strokeWidth="1.66577"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

