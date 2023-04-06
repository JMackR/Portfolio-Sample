import React from 'react'
const mockUseEffect = jest.spyOn(React, 'useEffect')
mockUseEffect.mockImplementationOnce((f) => setImmediate(() => f()))

import 'react-native-gesture-handler/jestSetup'

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'))

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

// jest.mock('react-native-share', () => ({
// 	default: jest.fn(),
// }))

jest.mock('react-native-localize', () => ({}))
