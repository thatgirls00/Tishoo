import React from 'react';
import Svg, { Path, G, ClipPath, Defs, Rect } from 'react-native-svg';

export default function ExternalLinkIcon3({ width = 17, height = 17, color = '#1E78FF' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 17 17" fill="none">
      <G clipPath="url(#clip0_1_6874)">
        <Path
          d="M10.8053 4.72729H14.8573V8.77932"
          stroke={color}
          strokeWidth="1.13691"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M14.8576 4.72729L9.11726 10.4677L5.74056 7.09098L1.35087 11.4807"
          stroke={color}
          strokeWidth="1.31691"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_6874">
          <Rect width="16.2081" height="16.2081" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

