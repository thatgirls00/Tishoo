import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function UserIcon({ width = 20, height = 20, color = 'white' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M15.8248 17.4905V15.8247C15.8248 14.9411 15.4738 14.0937 14.849 13.469C14.2243 12.8442 13.3769 12.4932 12.4933 12.4932H7.49597C6.61239 12.4932 5.765 12.8442 5.14021 13.469C4.51543 14.0937 4.16443 14.9411 4.16443 15.8247V17.4905"
        stroke={color}
        strokeWidth="1.66577"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.99463 9.16211C11.8346 9.16211 13.3262 7.67053 13.3262 5.83057C13.3262 3.99061 11.8346 2.49902 9.99463 2.49902C8.15467 2.49902 6.66309 3.99061 6.66309 5.83057C6.66309 7.67053 8.15467 9.16211 9.99463 9.16211Z"
        stroke={color}
        strokeWidth="1.66577"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}


