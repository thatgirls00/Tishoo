import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function IconCalendar({ width = 16, height = 16, color = '#6A6A6A' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M5.33118 1.33276V3.99836"
        stroke={color}
        strokeWidth="1.3328"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.6621 1.33301V3.9986"
        stroke={color}
        strokeWidth="1.3328"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.6614 2.66602H3.33182C2.59574 2.66602 1.99902 3.26273 1.99902 3.99881V13.3284C1.99902 14.0645 2.59574 14.6612 3.33182 14.6612H12.6614C13.3975 14.6612 13.9942 14.0645 13.9942 13.3284V3.99881C13.9942 3.26273 13.3975 2.66602 12.6614 2.66602Z"
        stroke={color}
        strokeWidth="1.3328"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.99915 6.66394H13.9943"
        stroke={color}
        strokeWidth="1.3328"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

