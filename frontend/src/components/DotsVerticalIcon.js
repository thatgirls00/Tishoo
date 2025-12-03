import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function DotsVerticalIcon({ width = 24, height = 24, color = '#666666' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M11.998 12.998C12.5503 12.998 12.998 12.5503 12.998 11.998C12.998 11.4458 12.5503 10.998 11.998 10.998C11.4458 10.998 10.998 11.4458 10.998 11.998C10.998 12.5503 11.4458 12.998 11.998 12.998Z"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.998 5.99927C12.5503 5.99927 12.998 5.55155 12.998 4.99927C12.998 4.44698 12.5503 3.99927 11.998 3.99927C11.4458 3.99927 10.998 4.44698 10.998 4.99927C10.998 5.55155 11.4458 5.99927 11.998 5.99927Z"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.998 19.9968C12.5503 19.9968 12.998 19.5491 12.998 18.9968C12.998 18.4445 12.5503 17.9968 11.998 17.9968C11.4458 17.9968 10.998 18.4445 10.998 18.9968C10.998 19.5491 11.4458 19.9968 11.998 19.9968Z"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}


