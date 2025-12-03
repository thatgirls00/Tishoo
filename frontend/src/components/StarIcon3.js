import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function StarIcon3({ width = 24, height = 24, color = '#1E78FF' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 1.86914L15.104 8.59714L22.462 9.47014L17.022 14.5001L18.466 21.7681L12 18.1491L5.53399 21.7691L6.97799 14.5011L1.53799 9.46914L8.89699 8.59614L12 1.86914Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

