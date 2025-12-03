import React from 'react';
import Svg, { Path, G, ClipPath, Defs, Rect } from 'react-native-svg';

export default function UserIcon2({ width = 10, height = 16, color = '#6A6A6A' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 10 16" fill="none">
      <G clipPath="url(#clip0_1_2384)">
        <Path
          d="M10.6624 13.9944V12.6616C10.6624 11.9546 10.3815 11.2766 9.88162 10.7767C9.38172 10.2768 8.70371 9.99597 7.99675 9.99597H3.99836C3.2914 9.99597 2.6134 10.2768 2.1135 10.7767C1.6136 11.2766 1.33276 11.9546 1.33276 12.6616V13.9944"
          stroke={color}
          strokeWidth="1.3328"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10.6621 2.08398C11.2337 2.23217 11.7399 2.56597 12.1013 3.03298C12.4627 3.49999 12.6588 4.07378 12.6588 4.66428C12.6588 5.25478 12.4627 5.82857 12.1013 6.29558C11.7399 6.7626 11.2337 7.09639 10.6621 7.24458"
          stroke={color}
          strokeWidth="1.3328"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M5.99763 7.33034C7.4698 7.33034 8.66322 6.13691 8.66322 4.66474C8.66322 3.19257 7.4698 1.99915 5.99763 1.99915C4.52546 1.99915 3.33203 3.19257 3.33203 4.66474C3.33203 6.13691 4.52546 7.33034 5.99763 7.33034Z"
          stroke={color}
          strokeWidth="1.3328"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_2384">
          <Rect width="15.9936" height="15.9936" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

