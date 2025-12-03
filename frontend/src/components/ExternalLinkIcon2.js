import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function ExternalLinkIcon2({ width = 16, height = 16, color = 'white' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M9.99597 1.99927H13.9944V5.99766"
        stroke={color}
        strokeWidth="1.3328"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.66394 9.32966L13.9943 1.99927"
        stroke={color}
        strokeWidth="1.3328"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.9951 8.66308V12.6615C11.9951 13.015 11.8547 13.354 11.6048 13.6039C11.3548 13.8539 11.0158 13.9943 10.6623 13.9943H3.33194C2.97846 13.9943 2.63946 13.8539 2.38951 13.6039C2.13956 13.354 1.99915 13.015 1.99915 12.6615V5.33109C1.99915 4.97761 2.13956 4.63861 2.38951 4.38866C2.63946 4.13871 2.97846 3.99829 3.33194 3.99829H7.33034"
        stroke={color}
        strokeWidth="1.3328"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

