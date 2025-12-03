import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';

export default function TossSymbolIcon({ width = 24, height = 24, isSelected = false }) {
  const backgroundColor = isSelected ? 'rgba(0, 151, 255, 0.2)' : 'transparent';
  
  return (
    <View style={{ width, height, borderRadius: 100, backgroundColor, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={width - 6} height={height - 6} viewBox="0 0 18 18" fill="none">
        <G clipPath="url(#clip0_toss)">
          <Path
            d="M9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0ZM9 16.2C4.91688 16.2 1.8 13.0831 1.8 9C1.8 4.91688 4.91688 1.8 9 1.8C13.0831 1.8 16.2 4.91688 16.2 9C16.2 13.0831 13.0831 16.2 9 16.2Z"
            fill="#0097FF"
          />
          <Path
            d="M9 4.5C6.51472 4.5 4.5 6.51472 4.5 9C4.5 11.4853 6.51472 13.5 9 13.5C11.4853 13.5 13.5 11.4853 13.5 9C13.5 6.51472 11.4853 4.5 9 4.5ZM9 12.15C7.34315 12.15 6 10.8069 6 9.15C6 7.49315 7.34315 6.15 9 6.15C10.6569 6.15 12 7.49315 12 9.15C12 10.8069 10.6569 12.15 9 12.15Z"
            fill="#0097FF"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_toss">
            <Rect width="18" height="18" fill="white" />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
}


