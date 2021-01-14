import React from 'react';
import LottieView from 'lottie-react-native';
import getAnimation from './getAnimation'

type LottieAnimationProps = {
  width?: number,
  height?: number,
  reference: string
} 
const LottieAnimation: React.FC<LottieAnimationProps> = ({ width = 120, height = 120, reference = '01d'}) => {
  return  <LottieView source={getAnimation(reference)} autoPlay loop style={{ width, height }}/>;
}

export default LottieAnimation;