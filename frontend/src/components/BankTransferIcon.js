import React from 'react';
import Svg, { Path, G, ClipPath, Rect } from 'react-native-svg';

export default function BankTransferIcon({ width = 24, height = 24, isSelected = false }) {
  const color = isSelected ? '#1E78FF' : '#5D5D7A';
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <G clipPath="url(#clip0_1_3700)">
        <Path
          d="M10.3139 8.5899L11.3235 14.2716C11.3348 14.3385 11.3254 14.4073 11.2965 14.4687C11.2677 14.5301 11.2208 14.5813 11.1621 14.6153C11.1034 14.6494 11.0358 14.6647 10.9681 14.6593C10.9005 14.6538 10.8361 14.6278 10.7837 14.5848L8.39796 12.7942C8.28279 12.7082 8.14288 12.6617 7.99912 12.6617C7.85536 12.6617 7.71545 12.7082 7.60028 12.7942L5.21057 14.5842C5.15814 14.6271 5.09386 14.653 5.02631 14.6585C4.95876 14.664 4.89115 14.6487 4.8325 14.6147C4.77385 14.5808 4.72695 14.5297 4.69806 14.4684C4.66917 14.4071 4.65965 14.3385 4.67079 14.2716L5.67972 8.5899"
          stroke={color}
          strokeWidth="1.3328"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M7.99669 9.32961C10.2049 9.32961 11.9951 7.53947 11.9951 5.33122C11.9951 3.12297 10.2049 1.33282 7.99669 1.33282C5.78843 1.33282 3.99829 3.12297 3.99829 5.33122C3.99829 7.53947 5.78843 9.32961 7.99669 9.32961Z"
          stroke={color}
          strokeWidth="1.3328"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <ClipPath id="clip0_1_3700">
        <Rect width="15.9936" height="15.9936" fill="white" />
      </ClipPath>
    </Svg>
  );
}


