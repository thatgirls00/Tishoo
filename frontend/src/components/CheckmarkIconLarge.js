import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function CheckmarkIconLarge({ width = 64, height = 64, color = '#1E78FF' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 64 64" fill="none">
      <Path
        d="M31.9999 58.6667C46.7275 58.6667 58.6666 46.7276 58.6666 32C58.6666 17.2724 46.7275 5.33337 31.9999 5.33337C17.2723 5.33337 5.33325 17.2724 5.33325 32C5.33325 46.7276 17.2723 58.6667 31.9999 58.6667Z"
        stroke={color}
        strokeWidth="5.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M24 32L29.3333 37.3333L40 26.6666"
        stroke={color}
        strokeWidth="5.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

