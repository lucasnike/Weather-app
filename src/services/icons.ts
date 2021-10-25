import I803_804 from '../assets/cloud.png'
import I800 from '../assets/800.png'
import I200_233 from '../assets/thunderstorm.png'
import I801_802 from '../assets/cloudy.png'
import I600_623 from '../assets/snow.png'
import I300_522 from '../assets/rain.png'
import I700_751 from '../assets/fog.png'

export function getIconByCode(code: number) {
  if (code >= 803 && code <= 804) {
    return I803_804
  }

  if (code === 800) {
    return I800
  }

  if (code >= 200 && code <= 233) {
    return I200_233
  }

  if (code >= 801 && code <= 802) {
    return I801_802
  }

  if (code >= 600 && code <= 623) {
    return I600_623
  }

  if (code >= 300 && code <= 522) {
    return I300_522
  }

  if (code >= 700 && code <= 751) {
    return I700_751
  }
}