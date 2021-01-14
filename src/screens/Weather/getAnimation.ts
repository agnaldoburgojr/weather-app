import { Animated } from 'react-native'

type GetAnimationParams = {
  opacity: Animated.Value,
  offsetSection: Animated.ValueXY,
  offsetCity: Animated.ValueXY,
  offsetAddress: Animated.ValueXY,
  offsetButton: Animated.ValueXY,
  opacityButton: Animated.Value
}

const getAnimation = ({
  opacity, 
  offsetSection, 
  offsetCity, 
  offsetAddress, 
  opacityButton, 
  offsetButton}: GetAnimationParams) : Animated.CompositeAnimation => {
  return (
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false
      }),
      Animated.spring(offsetSection.y, {
        toValue: 0,
        speed: 4,
        bounciness: 12,
        useNativeDriver: false,
      }),
      
      Animated.spring(offsetCity.x, {
        toValue: 0,
        speed: 2,
        bounciness: 8,
        useNativeDriver: false,
      }),
      Animated.spring(offsetAddress.x, {
        toValue: 0,
        delay: 100,
        speed: 2,
        bounciness: 8,
        useNativeDriver: false,
      }),
      Animated.timing(opacityButton, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false
      }),
      Animated.spring(offsetButton.y, {
        toValue: 0,
        speed: 2,
        bounciness: 8,
        useNativeDriver: false,
      }),
    ])
  )
}

export default getAnimation