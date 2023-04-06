import { Easing, Platform } from 'react-native'
import { ActionAndroidChevron, ActionLeftChevron } from '@sample/assets'
import { AnimationType } from '@sample/constants/animation-constants'
import type { TransitionSpec } from '@react-navigation/native/lib/typescript/src/types'
import type { StackNavigationOptions } from '@react-navigation/stack'
import { TransitionPresets, TransitionSpecs } from '@react-navigation/stack'
import { translate } from '@sample/utilities/i18n'
import { Navigation } from './navigation'
import { NavigationBarItem } from '@sample/widgets/navigation-bar'

/**
 * Navigation Elements
 */
export const getNavigationBackIcon = () => (Platform.OS === 'android' ? ActionAndroidChevron : ActionLeftChevron)
export const getNavigationBackButton = (baseTestId?: string, extraClickAction?: () => void): NavigationBarItem => {
  return {
    title: 'Back',
    icon: getNavigationBackIcon(),
    testID: (baseTestId || '@clt.navigation-bar') + '.back',
    pressHandler: () => {
      extraClickAction && extraClickAction()
      Navigation.goBack()
    },
  }
}

export const getNavigationSaveButton = (baseTestId?: string, extraClickAction?: () => void): NavigationBarItem => {
  return {
    // title: translate("common-actions.save"),
    title: 'Save',
    testID: 'add-request.navigation-bar.save',
    pressHandler: () => {
      extraClickAction && extraClickAction()
      // Navigation.goBack()
    },
  }
}

export const getNavigationCancelButton = (baseTestId?: string, extraClickAction?: () => void): NavigationBarItem => {
  return {
    title: translate('common-actions.cancel'),
    testID: (baseTestId || '@clt.navigation-bar') + '.done',
    pressHandler: () => {
      extraClickAction && extraClickAction()
      Navigation.goBack()
    },
  }
}
/**
 * The extra click action is useful for screen-specific analytics events.
 * @param extraClickAction callback that will be called when close is pressed
 */

/**
 * Transition Configs
 */

const modalDialogOverlayTransitionConfig: TransitionSpec = {
  animation: 'timing',
  config: {
    duration: 350,
    easing: Easing.inOut(Easing.poly(2)),
    useNativeDriver: true,
  },
}

const modalCardOverlayTransitionConfig: TransitionSpec = {
  animation: 'timing',
  config: {
    duration: 10,
    useNativeDriver: true,
  },
}

/**
 * Screen Options
 */
export const FullScreenModalNoAnimateOptions: StackNavigationOptions = {
  animationEnabled: false,
}
export const FadeInFullScreen: StackNavigationOptions = {
  gestureEnabled: false,
  headerShown: false,
  // ...TransitionPresets.ModalSlideFromBottomIOS,
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress,
    },
  }),
  // transitionSpec: {
  //   open: {
  //     animation: 'timing',

  //     config: {
  //       duration: AnimationType.Opens,
  //       easing: Easing.out(Easing.ease),
  //     },
  //   },
  //   close: {
  //     animation: 'timing',
  //     config: {
  //       duration: AnimationType.ExitsAndClosings,
  //       easing: Easing.out(Easing.ease),
  //     },
  //   },
  // },
}
export const ForcedFullScreenModalOptions: StackNavigationOptions = {
  gestureEnabled: false,
  headerShown: false,
  // ...TransitionPresets.ModalSlideFromBottomIOS,
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress,
    },
  }),
  transitionSpec: {
    open: {
      animation: 'timing',

      config: {
        duration: AnimationType.Opens,
        easing: Easing.out(Easing.ease),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: AnimationType.ExitsAndClosings,
        easing: Easing.out(Easing.ease),
      },
    },
  },
}

export const FullScreenModalOptions: StackNavigationOptions = {
  ...TransitionPresets.ModalSlideFromBottomIOS,
  gestureEnabled: false,
  headerShown: false,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: AnimationType.Opens,
        easing: Easing.out(Easing.ease),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: AnimationType.ExitsAndClosings,
        easing: Easing.out(Easing.ease),
      },
    },
  },
}

export const PushPopStackAnimationOptions: StackNavigationOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  gestureEnabled: false,
  headerShown: false,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: AnimationType.Opens,
        easing: Easing.out(Easing.ease),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: AnimationType.ExitsAndClosings,
        easing: Easing.out(Easing.ease),
      },
    },
  },
}

export const ModalDialogOverlayOptions: StackNavigationOptions = {
  cardStyle: { backgroundColor: 'transparent' },
  detachPreviousScreen: false,
  headerShown: false,
  cardOverlayEnabled: true,
  presentation: 'modal',
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress,
    },
  }),
  transitionSpec: {
    open: modalDialogOverlayTransitionConfig,
    close: modalDialogOverlayTransitionConfig,
  },
}
export const ModalDialogOverlayOptionsSide: StackNavigationOptions = {
  cardStyle: { backgroundColor: 'transparent' },
  detachPreviousScreen: false,
  headerShown: false,
  cardOverlayEnabled: true,

  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress,
    },
  }),
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: AnimationType.Opens,
        easing: Easing.out(Easing.ease),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: AnimationType.ExitsAndClosings,
        easing: Easing.out(Easing.ease),
      },
    },
  },
}
export const BottomModalOptions: StackNavigationOptions = {
  ...FullScreenModalOptions,
  cardStyle: { backgroundColor: 'transparent' },
  cardOverlayEnabled: true,
  headerShown: false,
  detachPreviousScreen: false,
  cardStyleInterpolator: ({ current: { progress }, layouts }) => ({
    cardStyle: {
      transform: [
        {
          translateY: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.height, 0],
          }),
        },
      ],
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.7],
      }),
      backgroundColor: '#00BDED',
    },
  }),
}

export const ModalCardOverlayOption: StackNavigationOptions = {
  cardStyle: { backgroundColor: 'transparent' },
  cardOverlayEnabled: true,
  headerShown: false,
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress,
    },
  }),
  transitionSpec: {
    open: modalCardOverlayTransitionConfig,
    close: modalCardOverlayTransitionConfig,
  },
}
export const ModalNoGestureOverlayOption: StackNavigationOptions = {
  cardStyle: { backgroundColor: 'transparent' },
  cardOverlayEnabled: true,
  gestureEnabled: false,
  headerShown: false,
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress,
    },
  }),

  transitionSpec: {
    open: modalCardOverlayTransitionConfig,
    close: modalCardOverlayTransitionConfig,
  },
}
