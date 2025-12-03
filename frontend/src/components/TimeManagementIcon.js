import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function TimeManagementIcon({ width = 20, height = 20, color = '#FFB4C8' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M9.99463 4.99731V9.99463L13.3262 11.6604"
        stroke={color}
        strokeWidth="1.66577"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.99463 18.3235C14.5945 18.3235 18.3235 14.5945 18.3235 9.99463C18.3235 5.39473 14.5945 1.66577 9.99463 1.66577C5.39473 1.66577 1.66577 5.39473 1.66577 9.99463C1.66577 14.5945 5.39473 18.3235 9.99463 18.3235Z"
        stroke={color}
        strokeWidth="1.66577"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

