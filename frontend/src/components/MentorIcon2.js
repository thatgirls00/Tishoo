import React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

export default function MentorIcon2({ width = 20, height = 20, color = '#9B9BAA' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Defs>
        <ClipPath id="clip0_1_9581">
          <Rect width="19.9893" height="19.9893" fill="white" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#clip0_1_9581)">
        <Path
          d="M12.8906 10.7363L14.1524 17.8375C14.1665 17.9211 14.1548 18.0071 14.1188 18.0838C14.0827 18.1606 14.0241 18.2245 13.9508 18.2671C13.8774 18.3097 13.7928 18.3288 13.7083 18.322C13.6238 18.3152 13.5433 18.2827 13.4778 18.229L10.496 15.991C10.3521 15.8835 10.1772 15.8254 9.99754 15.8254C9.81786 15.8254 9.643 15.8835 9.49906 15.991L6.51233 18.2281C6.4468 18.2818 6.36646 18.3142 6.28203 18.321C6.19761 18.3279 6.11311 18.3088 6.0398 18.2663C5.9665 18.2239 5.90789 18.1601 5.87177 18.0835C5.83566 18.0069 5.82377 17.9211 5.83769 17.8375L7.09868 10.7363"
          stroke={color}
          strokeWidth="1.66577"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9.99463 11.6606C12.7546 11.6606 14.9919 9.42327 14.9919 6.66333C14.9919 3.90339 12.7546 1.66602 9.99463 1.66602C7.23469 1.66602 4.99731 3.90339 4.99731 6.66333C4.99731 9.42327 7.23469 11.6606 9.99463 11.6606Z"
          stroke={color}
          strokeWidth="1.66577"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}

