import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function LinkIcon2({ width = 12, height = 12, color = '#6a6a6a' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 12 12" fill="none">
      <Path
        d="M7.49878 1.49951H10.4983V4.49899"
        stroke={color}
        strokeWidth="0.999825"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.99902 6.99855L10.4981 1.49951"
        stroke={color}
        strokeWidth="0.999825"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.99845 6.4989V9.49838C8.99845 9.76355 8.89311 10.0179 8.7056 10.2054C8.5181 10.3929 8.26379 10.4982 7.99862 10.4982H2.49958C2.23441 10.4982 1.9801 10.3929 1.7926 10.2054C1.60509 10.0179 1.49976 9.76355 1.49976 9.49838V3.99934C1.49976 3.73417 1.60509 3.47986 1.7926 3.29235C1.9801 3.10485 2.23441 2.99951 2.49958 2.99951H5.49906"
        stroke={color}
        strokeWidth="0.999825"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

