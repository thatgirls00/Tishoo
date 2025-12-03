import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SearchIcon({ width = 24, height = 24, color = '#9B9BAA' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.9971 20.997L16.6571 16.657"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.9981 18.9967C15.4156 18.9967 18.9967 15.4156 18.9967 10.9981C18.9967 6.58061 15.4156 2.99951 10.9981 2.99951C6.58061 2.99951 2.99951 6.58061 2.99951 10.9981C2.99951 15.4156 6.58061 18.9967 10.9981 18.9967Z"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}


