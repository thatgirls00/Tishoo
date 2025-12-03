import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function DotsIcon({ width = 13.498, height = 13.498, color = '#999999' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
      <Path 
        d="M14.4357 15.6604C14.9692 15.8033 15.5175 15.4868 15.6604 14.9533C15.8034 14.4198 15.4868 13.8715 14.9533 13.7285C14.4199 13.5856 13.8715 13.9022 13.7286 14.4357C13.5856 14.9691 13.9022 15.5175 14.4357 15.6604Z" 
        stroke={color} 
        strokeWidth="1.99965" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M16.2471 8.90063C16.7806 9.04357 17.3289 8.72699 17.4718 8.19352C17.6148 7.66006 17.2982 7.11172 16.7647 6.96878C16.2313 6.82584 15.6829 7.14242 15.54 7.67589C15.397 8.20935 15.7136 8.75769 16.2471 8.90063Z" 
        stroke={color} 
        strokeWidth="1.99965" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M12.6243 22.4211C13.1577 22.5641 13.7061 22.2475 13.849 21.714C13.9919 21.1806 13.6754 20.6322 13.1419 20.4893C12.6084 20.3463 12.0601 20.6629 11.9171 21.1964C11.7742 21.7299 12.0908 22.2782 12.6243 22.4211Z" 
        stroke={color} 
        strokeWidth="1.99965" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
}

