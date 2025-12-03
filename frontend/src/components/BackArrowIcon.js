import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function BackArrowIcon({ width = 24, height = 24, color = '#5D5D7A' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14.9974 17.9969L8.99841 11.998L14.9974 5.99902"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}


