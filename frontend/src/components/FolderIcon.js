import React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

export default function FolderIcon({ width = 11.998, height = 11.998, color = '#9B9BAA' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 15 15" fill="none">
      <Defs>
        <ClipPath id="clip0_1_8612">
          <Rect width="11.9979" height="11.9979" fill="white" transform="translate(0 3.10547) rotate(-15)"/>
        </ClipPath>
      </Defs>
      <G clipPath="url(#clip0_1_8612)">
        <Path 
          d="M7.63133 2.61328L10.5286 1.83696L11.3049 4.73423" 
          stroke={color} 
          strokeWidth="0.999825" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <Path 
          d="M6.64021 8.57143L10.5286 1.83651" 
          stroke={color} 
          strokeWidth="0.999825" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <Path 
          d="M10.3738 7.0536L11.1502 9.95088C11.2188 10.207 11.1829 10.4799 11.0503 10.7096C10.9177 10.9392 10.6993 11.1068 10.4432 11.1754L5.13152 12.5987C4.87539 12.6673 4.60248 12.6314 4.37283 12.4988C4.14319 12.3662 3.97562 12.1478 3.90699 11.8917L2.48373 6.58001C2.4151 6.32388 2.45103 6.05097 2.58362 5.82133C2.7162 5.59168 2.93458 5.42412 3.19072 5.35548L6.08799 4.57916" 
          stroke={color} 
          strokeWidth="0.999825" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}

