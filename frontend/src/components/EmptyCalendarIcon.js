import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function EmptyCalendarIcon({ width = 64, height = 64 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3.99941 19.9965H19.9966C20.527 19.9965 21.0356 19.7859 21.4106 19.4109C21.7856 19.0359 21.9963 18.5272 21.9963 17.9969V7.99864C21.9963 7.4683 21.7856 6.95968 21.4106 6.58467C21.0356 6.20966 20.527 5.99899 19.9966 5.99899H12.068C11.7386 5.99728 11.4148 5.91425 11.1253 5.75727C10.8357 5.60029 10.5894 5.37422 10.4083 5.09915L9.58843 3.89935C9.40729 3.62428 9.161 3.39821 8.87146 3.24123C8.58191 3.08425 8.25808 3.00122 7.92872 2.99951H3.99941C3.46907 2.99951 2.96045 3.21019 2.58544 3.5852C2.21043 3.9602 1.99976 4.46882 1.99976 4.99916V17.9969C1.99976 19.0967 2.8996 19.9965 3.99941 19.9965Z"
        stroke="#1E78FF"
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.99854 9.99829V13.9983"
        stroke="#1E78FF"
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.9978 9.99829V11.9983"
        stroke="#1E78FF"
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.9973 9.99829V15.9972"
        stroke="#1E78FF"
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}


