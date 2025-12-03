import React from 'react';
import Svg, { Path, G, ClipPath, Defs, Rect } from 'react-native-svg';

export default function UsersIcon3({ width = 16, height = 16, color = '#9CA3AF' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Defs>
        <ClipPath id="clip0_1_11528">
          <Rect width="15.9936" height="15.9936" fill="white" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#clip0_1_11528)">
        <Path
          d="M10.6624 13.9944V12.6616C10.6624 11.9546 10.3815 11.2766 9.88162 10.7767C9.38172 10.2768 8.70371 9.99597 7.99675 9.99597H3.99836C3.2914 9.99597 2.6134 10.2768 2.1135 10.7767C1.6136 11.2766 1.33276 11.9546 1.33276 12.6616V13.9944"
          stroke={color}
          strokeWidth="1.3328"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10.6624 2.0845C11.234 2.23269 11.7402 2.56649 12.1016 3.0335C12.4629 3.50051 12.659 4.0743 12.659 4.6648C12.659 5.2553 12.4629 5.82909 12.1016 6.2961C11.7402 6.76312 11.234 7.09691 10.6624 7.2451"
          stroke={color}
          strokeWidth="1.3328"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M14.6608 13.9944V12.6616C14.6604 12.071 14.4638 11.4972 14.102 11.0304C13.7401 10.5637 13.2335 10.2303 12.6616 10.0826"
          stroke={color}
          strokeWidth="1.3328"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M5.99763 7.3304C7.4698 7.3304 8.66322 6.13697 8.66322 4.6648C8.66322 3.19263 7.4698 1.99921 5.99763 1.99921C4.52546 1.99921 3.33203 3.19263 3.33203 4.6648C3.33203 6.13697 4.52546 7.3304 5.99763 7.3304Z"
          stroke={color}
          strokeWidth="1.3328"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}

