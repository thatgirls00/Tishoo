import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function ShareIcon({ width = 24, height = 24, color = '#5D5D7A' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.9968 7.99871C19.6534 7.99871 20.9963 6.6558 20.9963 4.99923C20.9963 3.34267 19.6534 1.99976 17.9968 1.99976C16.3402 1.99976 14.9973 3.34267 14.9973 4.99923C14.9973 6.6558 16.3402 7.99871 17.9968 7.99871Z"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.99899 14.9975C7.65555 14.9975 8.99846 13.6546 8.99846 11.998C8.99846 10.3414 7.65555 8.99854 5.99899 8.99854C4.34242 8.99854 2.99951 10.3414 2.99951 11.998C2.99951 13.6546 4.34242 14.9975 5.99899 14.9975Z"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.9968 21.9963C19.6534 21.9963 20.9963 20.6534 20.9963 18.9968C20.9963 17.3402 19.6534 15.9973 17.9968 15.9973C16.3402 15.9973 14.9973 17.3402 14.9973 18.9968C14.9973 20.6534 16.3402 21.9963 17.9968 21.9963Z"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.58838 13.5076L15.4172 17.4869"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.4072 6.50879L8.58838 10.4881"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}


