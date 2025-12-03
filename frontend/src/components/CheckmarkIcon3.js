import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function CheckmarkIcon3({ width = 12, height = 12, color = '#1E78FF' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 12 12" fill="none">
      <Path
        d="M9.99836 2.99951L4.49932 8.49855L1.99976 5.99899"
        stroke={color}
        strokeWidth="0.999825"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

