

import React from 'react';
import LottieView from 'lottie-react-native';
import animationData from '../../assets/sun.json';

const LottieAnimation: React.FC = () => {
  return  <LottieView source={animationData} autoPlay loop style={{width: 120}}/>;
  
}

export default LottieAnimation;