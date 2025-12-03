import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function ChartIcon2({ width = 24, height = 24, color = '#1E78FF' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M13.3262 5.83008H18.3235V10.8274"
        stroke={color}
        strokeWidth="1.66577"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.3235 5.83008L11.244 12.9096L7.07953 8.74518L1.66577 14.1589"
        stroke={color}
        strokeWidth="1.66577"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

