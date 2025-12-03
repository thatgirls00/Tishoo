import React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

export default function NotificationIcon2({ width = 24, height = 24, color = '#999999' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 17 17" fill="none">
      <Defs>
        <ClipPath id="clip0_1_8374">
          <Rect width="13.4915" height="13.4915" fill="white" transform="translate(3.49188) rotate(15)"/>
        </ClipPath>
      </Defs>
      <G clipPath="url(#clip0_1_8374)">
        <Path 
          d="M2.7389 9.30866C2.76477 9.53146 2.72341 9.7569 2.62014 9.95601L1.56318 11.5875C1.52027 11.6731 1.49994 11.7682 1.50412 11.8639C1.50829 11.9596 1.53684 12.0526 1.58704 12.1341C1.63724 12.2157 1.70744 12.283 1.79098 12.3298C1.87452 12.3766 1.96863 12.4013 2.06438 12.4015L4.06282 12.3562C4.2731 12.3701 4.47524 12.4428 4.64618 12.5661C5.66059 13.4182 6.94338 13.8847 8.26822 13.8833C9.59307 13.8818 10.8748 13.4125 11.8874 12.5581C12.8999 11.7037 13.5781 10.5191 13.8024 9.21339C14.0266 7.90767 13.7825 6.56469 13.1131 5.42141C12.4437 4.27812 11.392 3.40801 10.1435 2.96458C8.89511 2.52115 7.53018 2.53291 6.28957 2.99777C5.04895 3.46263 4.01239 4.35073 3.36276 5.50537C2.71313 6.66001 2.49218 8.00699 2.7389 9.30866Z" 
          stroke={color} 
          strokeWidth="1.12429" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}

