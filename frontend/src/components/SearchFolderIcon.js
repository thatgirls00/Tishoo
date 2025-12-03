import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SearchFolderIcon({ width = 20, height = 20, color = '#9C9C9C' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3.9993 19.9965H19.9965C20.5268 19.9965 21.0355 19.7859 21.4105 19.4109C21.7855 19.0359 21.9962 18.5272 21.9962 17.9969V7.99864C21.9962 7.4683 21.7855 6.95968 21.4105 6.58467C21.0355 6.20966 20.5268 5.99899 19.9965 5.99899H12.0679C11.7385 5.99728 11.4147 5.91425 11.1252 5.75727C10.8356 5.60029 10.5893 5.37422 10.4082 5.09915L9.58832 3.89935C9.40718 3.62428 9.16089 3.39821 8.87135 3.24123C8.58181 3.08425 8.25797 3.00122 7.92861 2.99951H3.9993C3.46896 2.99951 2.96034 3.21019 2.58533 3.5852C2.21033 3.9602 1.99965 4.46882 1.99965 4.99916V17.9969C1.99965 19.0967 2.89949 19.9965 3.9993 19.9965Z"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.9986 9.99829V13.9983"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.9979 9.99829V11.9983"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.9972 9.99829V15.9972"
        stroke={color}
        strokeWidth="1.99965"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

