import React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

export default function ExternalLinkIcon({ width = 11.998, height = 11.998, color = '#9B9BAA' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 15 15" fill="none">
      <Defs>
        <ClipPath id="clip0_1_8598">
          <Rect width="11.9979" height="11.9979" fill="white" transform="translate(0 3.10547) rotate(-15)"/>
        </ClipPath>
      </Defs>
      <G clipPath="url(#clip0_1_8598)">
        <Path 
          d="M11.5192 5.53397L12.5988 9.56311C12.6674 9.81924 12.6315 10.0922 12.4989 10.3218C12.3663 10.5514 12.1479 10.719 11.8918 10.7876L5.13151 12.5991C4.87538 12.6677 4.60247 12.6318 4.37283 12.4992C4.14318 12.3666 3.97561 12.1482 3.90698 11.8921L2.09557 5.13177C2.02693 4.87564 2.06286 4.60273 2.19545 4.37309C2.32803 4.14344 2.54641 3.97587 2.80255 3.90724L8.7632 2.31009" 
          stroke={color} 
          strokeWidth="0.999825" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <Path 
          d="M5.76917 7.25222L7.60597 8.3127L11.1409 2.19004" 
          stroke={color} 
          strokeWidth="0.999825" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}

