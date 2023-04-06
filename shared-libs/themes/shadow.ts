import type { ViewStyle } from 'react-native'

export const shadow = {
  /** Adds the standard drop shadow style */
  shadow: {
    elevation: 2,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  } as ViewStyle,
  screenShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,

    elevation: 6,
  } as ViewStyle,
  topShadow: {
    // elevation: 4,
    // shadowColor: 'rgba(0,0,0,0.8)',
    // shadowOffset: { width: 0, height: -10 },
    // shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowRadius: -5,
    shadowOffset: {
      width: 0,
      height: -15,
    },
    shadowColor: '#000000',
    elevation: 10,
  } as ViewStyle,
}
