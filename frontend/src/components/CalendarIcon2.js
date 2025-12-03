import React from 'react';
import Svg, { Path, G, ClipPath, Defs, Rect } from 'react-native-svg';

export default function CalendarIcon2({ width = 16, height = 16, color = '#9CA3AF' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Defs>
        <ClipPath id="clip0_1_11536">
          <Rect width="15.9936" height="15.9936" fill="white" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#clip0_1_11536)">
        <Path
          d="M5.3313 1.33279V3.99839"
          stroke={color}
          strokeWidth="1.3328"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10.6624 1.33279V3.99839"
          stroke={color}
          strokeWidth="1.3328"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12.6617 2.66559H3.33207C2.59598 2.66559 1.99927 3.2623 1.99927 3.99839V13.328C1.99927 14.0641 2.59598 14.6608 3.33207 14.6608H12.6617C13.3977 14.6608 13.9945 14.0641 13.9945 13.328V3.99839C13.9945 3.2623 13.3977 2.66559 12.6617 2.66559Z"
          stroke={color}
          strokeWidth="1.3328"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M1.99927 6.664H13.9945"
          stroke={color}
          strokeWidth="1.3328"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}
