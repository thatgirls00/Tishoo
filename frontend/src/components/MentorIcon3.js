import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function MentorIcon3({ width = 20, height = 20, color = 'white' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M13.3262 16.658V3.33179C13.3262 2.89 13.1507 2.4663 12.8383 2.15391C12.5259 1.84152 12.1022 1.66602 11.6604 1.66602H8.32886C7.88707 1.66602 7.46337 1.84152 7.15098 2.15391C6.83859 2.4663 6.66309 2.89 6.66309 3.33179V16.658"
        stroke={color}
        strokeWidth="1.66577"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.6577 4.99707H3.33154C2.41156 4.99707 1.66577 5.74286 1.66577 6.66284V14.9917C1.66577 15.9117 2.41156 16.6575 3.33154 16.6575H16.6577C17.5777 16.6575 18.3235 15.9117 18.3235 14.9917V6.66284C18.3235 5.74286 17.5777 4.99707 16.6577 4.99707Z"
        stroke={color}
        strokeWidth="1.66577"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

