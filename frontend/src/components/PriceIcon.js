import React from 'react';
import Svg, { Path, G, ClipPath, Defs, Rect } from 'react-native-svg';

export default function PriceIcon({ width = 20, height = 20, color = '#9B9BAA' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Defs>
        <ClipPath id="clip0_1_10959">
          <Rect width="19.9893" height="19.9893" fill="white" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#clip0_1_10959)">
        <Path
          d="M9.99463 1.66577V18.3235"
          stroke={color}
          strokeWidth="1.66577"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M14.1591 4.16431H7.91241C7.13928 4.16431 6.39781 4.47143 5.85113 5.01812C5.30444 5.56481 4.99731 6.30627 4.99731 7.07941C4.99731 7.85254 5.30444 8.594 5.85113 9.14069C6.39781 9.68738 7.13928 9.9945 7.91241 9.9945H12.0768C12.85 9.9945 13.5914 10.3016 14.1381 10.8483C14.6848 11.395 14.9919 12.1365 14.9919 12.9096C14.9919 13.6827 14.6848 14.4242 14.1381 14.9709C13.5914 15.5176 12.85 15.8247 12.0768 15.8247H4.99731"
          stroke={color}
          strokeWidth="1.66577"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}

