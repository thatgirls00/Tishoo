import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function UsersIcon({ width = 20, height = 20, color = '#9B9BAA' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M13.3262 17.4905V15.8247C13.3262 14.9411 12.9752 14.0937 12.3504 13.469C11.7256 12.8442 10.8782 12.4932 9.99463 12.4932H4.99731C4.11373 12.4932 3.26634 12.8442 2.64156 13.469C2.01677 14.0937 1.66577 14.9411 1.66577 15.8247V17.4905"
        stroke={color}
        strokeWidth="1.66577"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.3262 2.60547C14.0406 2.79068 14.6733 3.20786 15.1249 3.79155C15.5766 4.37523 15.8217 5.09237 15.8217 5.8304C15.8217 6.56843 15.5766 7.28557 15.1249 7.86925C14.6733 8.45294 14.0406 8.87012 13.3262 9.05533"
        stroke={color}
        strokeWidth="1.66577"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.3235 17.4906V15.8248C18.3229 15.0867 18.0772 14.3696 17.625 13.7862C17.1728 13.2028 16.5396 12.7861 15.8248 12.6016"
        stroke={color}
        strokeWidth="1.66577"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.49597 9.16211C9.33593 9.16211 10.8275 7.67053 10.8275 5.83057C10.8275 3.99061 9.33593 2.49902 7.49597 2.49902C5.65601 2.49902 4.16443 3.99061 4.16443 5.83057C4.16443 7.67053 5.65601 9.16211 7.49597 9.16211Z"
        stroke={color}
        strokeWidth="1.66577"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}


