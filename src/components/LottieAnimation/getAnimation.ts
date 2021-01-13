import animationData from '../../assets/sun.json';
import clearD from '../../assets/clearD.json'
import clearN from '../../assets/clearN.json'
import cloudD from '../../assets/cloudD.json'
import cloudN from '../../assets/cloudN.json'
import cloud from '../../assets/cloud.json'
import rainD from '../../assets/rainD.json'
import rainN from '../../assets/rainN.json'
import storm from '../../assets/storm.json'
import iceD from '../../assets/iceD.json'
import iceN from '../../assets/iceN.json'
import wind from '../../assets/wind.json'

const getAnimation = (reference: string) => {
  switch(reference){
    case '01d':
      return clearD
    case '02d':
      return cloudD
    case '03d':
      return cloud
    case '04d':
      return cloud
    case '09d':
      return rainD
    case '10d':
      return rainD
    case '11d':
      return storm
    case '13d':
      return iceD
    case '50d':
      return wind
    case '01n':
      return clearN
    case '02n':
      return cloudN
    case '03n':
      return cloud
    case '04n':
      return cloud
    case '09n':
      return rainN
    case '10n':
      return rainN
    case '11n':
      return storm
    case '13n':
      return iceN
    case '50n':
      return wind  
    default:
      return animationData
  }
}

export default getAnimation