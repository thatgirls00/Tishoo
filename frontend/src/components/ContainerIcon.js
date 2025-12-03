import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';

export default function ContainerIcon({ width = 80, height = 80 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 80 80" fill="none">
      <G clipPath="url(#clip0_1_3692)">
        <Path
          d="M26.6565 6.6641V19.9921"
          stroke="#5D5D7A"
          strokeWidth="1.3328"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M53.312 6.6641V19.9921"
          stroke="#5D5D7A"
          strokeWidth="1.3328"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M63.3085 13.3279H16.6604C12.9799 13.3279 9.99635 16.3115 9.99635 19.992V66.64C9.99635 70.3205 12.9799 73.304 16.6604 73.304H63.3085C66.9889 73.304 69.9725 70.3205 69.9725 66.64V19.992C69.9725 16.3115 66.9889 13.3279 63.3085 13.3279Z"
          stroke="#5D5D7A"
          strokeWidth="1.3328"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9.99635 33.32H69.9725"
          stroke="#5D5D7A"
          strokeWidth="1.3328"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_3692">
          <Rect width="79.968" height="79.968" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}


