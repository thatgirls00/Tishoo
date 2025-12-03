import React from 'react';
import Svg, { Path, G, ClipPath, Defs, Rect } from 'react-native-svg';

export default function CreateProjectIcon2({ width = 20, height = 20, color = '#9B9BAA' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Defs>
        <ClipPath id="clip0_1_10619">
          <Rect width="19.9893" height="19.9893" fill="white" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#clip0_1_10619)">
        <Path
          d="M6.66309 1.66577V4.99731"
          stroke={color}
          strokeWidth="1.66577"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M13.3262 1.66577V4.99731"
          stroke={color}
          strokeWidth="1.66577"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M15.8247 3.33154H4.16431C3.24433 3.33154 2.49854 4.07733 2.49854 4.99731V16.6577C2.49854 17.5777 3.24433 18.3235 4.16431 18.3235H15.8247C16.7447 18.3235 17.4905 17.5777 17.4905 16.6577V4.99731C17.4905 4.07733 16.7447 3.33154 15.8247 3.33154Z"
          stroke={color}
          strokeWidth="1.66577"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M2.49854 8.32886H17.4905"
          stroke={color}
          strokeWidth="1.66577"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}

