import React from 'react';
import Svg, { Path, G, ClipPath, Defs, Rect } from 'react-native-svg';

export default function DifficultyLevelIcon({ width = 16, height = 16, color = '#6a6a6a' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <G clipPath="url(#clip0_1_2559)">
        <Path
          d="M10.3139 8.58984L11.3235 14.2716C11.3348 14.3385 11.3254 14.4072 11.2965 14.4687C11.2677 14.5301 11.2208 14.5812 11.1621 14.6153C11.1034 14.6493 11.0358 14.6647 10.9681 14.6592C10.9005 14.6538 10.8361 14.6278 10.7837 14.5848L8.39796 12.7942C8.28279 12.7081 8.14288 12.6616 7.99912 12.6616C7.85536 12.6616 7.71545 12.7081 7.60028 12.7942L5.21057 14.5841C5.15814 14.627 5.09386 14.653 5.02631 14.6584C4.95876 14.6639 4.89115 14.6486 4.8325 14.6147C4.77385 14.5807 4.72695 14.5297 4.69806 14.4684C4.66917 14.4071 4.65965 14.3384 4.67079 14.2716L5.67972 8.58984"
          stroke={color}
          strokeWidth="1.3328"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M7.99669 9.32955C10.2049 9.32955 11.9951 7.53941 11.9951 5.33116C11.9951 3.12291 10.2049 1.33276 7.99669 1.33276C5.78843 1.33276 3.99829 3.12291 3.99829 5.33116C3.99829 7.53941 5.78843 9.32955 7.99669 9.32955Z"
          stroke={color}
          strokeWidth="1.3328"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_2559">
          <Rect width="15.9936" height="15.9936" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}


