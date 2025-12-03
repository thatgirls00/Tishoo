import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SearchIcon2({ width = 20, height = 20, color = '#9CA3AF' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M19.5 0.5V19.5H0.5V0.5H19.5Z"
        stroke="#E6E6EA"
      />
      <Path
        d="M17.5005 17.4995L13.8838 13.8828"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}


