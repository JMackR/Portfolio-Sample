import React, { useRef } from 'react'
import {
  Animated,
  ImageStyle,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  PixelRatio,
  useWindowDimensions,
} from 'react-native'
import { AnalyticsController } from '@sample/analytics/analytics'
import { Flex, Margin, Stack } from '@sample/layout-controls'
import { useScreen } from '@sample/providers/screen-provider'
import { useColor, useFont, useMargin, useColorForTextColor, useColorForBackgroundColor } from '@sample/themes/hooks'
import invariant from 'invariant'
import _ from 'lodash'
import { ActivityIndicator } from '../activity-indicator'
import { SVG } from '../image'
import { ButtonPropsNative } from './button-props.native'
import { textColorForCurrentButtonType, isJSXElement, isLocalSVGSource } from './button-shared'

const TRANSPARENT = '#FFFFFF00'
const ANIMATION_DURATION = 100
const scale = PixelRatio.getFontScale()

const styles = StyleSheet.create({
  button: {
    flex: 0,
    borderRadius: 25,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'stretch',
  },
  icon: {
    marginRight: 2,
  },
  textContainer: {
    alignSelf: 'center',
    flex: 0,
    marginTop: 0,
    flexDirection: scale < 1.75 ? 'row' : 'column',
  },
  text: {
    textAlign: 'center',
    // alignContent: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
})

export const Button = (props: ButtonPropsNative) => {
  const {
    onClick,
    onLongClick,
    placeholder,
    title,
    titleColor,
    titleDecoration,
    header,
    subtitle,
    disabled,
    testID,
    leftIcon,
    rightIcon,
    buttonType,
    buttonSize,
    onLayout,
    loading,
    centerIcon,
    doNotApplySidePadding,
    onPressHint,
    tint,
  } = props

  invariant(buttonType !== undefined, 'Must have button type')
  const { screenName, screenRoute } = useScreen()
  const { fonts } = useFont()
  const { colors } = useColor()
  const { width } = useWindowDimensions()
  const margin = useMargin().baseMargin
  const backgroundColorAnimation = useRef(new Animated.Value(0)).current
  const buttonStyles: StyleProp<ViewStyle> = [styles.button]
  const textStyles: StyleProp<TextStyle> = [styles.text]
  const subtitleStyles: StyleProp<TextStyle> = [styles.subtitle]
  const iconStyles: StyleProp<ImageStyle> = [styles.icon]

  const getBackgroundInterpolation = (from: string, to: string) => {
    return backgroundColorAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [from, to],
      extrapolate: 'clamp',
    }) as any
  }
  const applyBorderStyles = () => {
    switch (buttonType) {
      // NOTE: commented out as current designs have no borders -ls
      case 'primary':
        // buttonStyles.push(shadow.shadow)
        break
      case 'selector':
        // buttonStyles.push(shadow.shadow)
        break
      case 'transparent':
        // buttonStyles.push(shadow.shadow)
        break
      case 'disabled':
        // buttonStyles.push({ borderWidth: 1, borderColor: useColorForBackgroundColor('background4') })
        break
      default:
        break
    }
  }

  const applyBackgroundColorToStyles = () => {
    let bgColor
    switch (buttonType) {
      default:
      case 'primary':
        bgColor = getBackgroundInterpolation(colors.yellow300, colors.yellow300)
        break
      case 'secondary':
        bgColor = getBackgroundInterpolation(colors.grey900, colors.grey500)
        break
      case 'selector':
        bgColor = getBackgroundInterpolation(colors.grey100, useColorForBackgroundColor('highlight2'))
        break
      case 'transparent':
        bgColor = getBackgroundInterpolation(TRANSPARENT, TRANSPARENT)
        break
      case 'disabled':
        bgColor = getBackgroundInterpolation(colors.grey100, colors.grey200)
        break
      case 'danger':
        bgColor = getBackgroundInterpolation(colors.red400, colors.red200)
        break
    }
    buttonStyles.push({ backgroundColor: bgColor })
  }

  const textColorName = titleColor ? titleColor : textColorForCurrentButtonType(buttonType)
  const textColor = useColorForTextColor(textColorName)

  const applyTextColorStyles = () => {
    textStyles.push({ color: textColor })
    subtitleStyles.push({ color: textColor })
  }
  const applyTextDecorationStyles = () => {
    textStyles.push({ textDecorationLine: titleDecoration })
  }

  const applyTextDimensionStyles = () => {
    textStyles.push(fonts.primary3)
  }
  const applyButtonDimensionStyles = () => {
    let buttonDimensions
    switch (buttonSize) {
      default:
      case 'xlarge':
        buttonDimensions = { paddingHorizontal: margin * 2, height: 60 }
        break
      case 'large':
        buttonDimensions = { paddingHorizontal: margin * 2, height: 57 }
        break
      case 'medium':
        buttonDimensions = { paddingHorizontal: margin * 4, height: 40 }
        break
      case 'small':
        buttonDimensions = { paddingHorizontal: margin * 2, height: 32 }
        break
      case 'wide':
        buttonDimensions = { paddingHorizontal: margin * 2, height: 48, width: width * 0.94 }
        break
    }

    if (doNotApplySidePadding) {
      buttonDimensions = { ...buttonDimensions, paddingHorizontal: 0, minHeight: 30 }
    }
    buttonStyles.push(buttonDimensions)
  }

  const startBackgroundColorAnimation = (targetEndValue: number) => {
    requestAnimationFrame(() => {
      Animated.timing(backgroundColorAnimation, {
        toValue: targetEndValue,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }).start()
    })
  }

  applyBackgroundColorToStyles()
  applyTextDimensionStyles()
  applyTextColorStyles()
  applyTextDecorationStyles()
  applyBorderStyles()
  applyButtonDimensionStyles()

  const renderLeftIcon = () => {
    let iconJSX
    if (isJSXElement(leftIcon)) {
      iconJSX = leftIcon
    } else if (isLocalSVGSource(leftIcon)) {
      iconJSX = <SVG localSVG={{ ...leftIcon }} tint={textColor} />
    } else {
      return undefined
    }

    return <View style={title || subtitle ? iconStyles : {}}>{iconJSX}</View>
  }
  const renderCenterIcon = () => {
    let iconJSX

    if (isJSXElement(centerIcon)) {
      iconJSX = centerIcon
    } else if (isLocalSVGSource(centerIcon)) {
      iconJSX = <SVG localSVG={{ ...centerIcon }} tint={textColor} />
    } else {
      return undefined
    }

    return <View style={title || subtitle ? iconStyles : {}}>{iconJSX}</View>
  }
  const renderRightIcon = () => {
    let iconJSX
    if (isJSXElement(rightIcon)) {
      iconJSX = rightIcon
    } else if (isLocalSVGSource(rightIcon)) {
      iconJSX = <SVG localSVG={{ ...rightIcon }} tint={textColor} />
    } else {
      return undefined
    }

    return <View style={title || subtitle ? iconStyles : {}}>{iconJSX}</View>
  }

  const clickHandler = () => {
    AnalyticsController.trackButtonEvent({
      screenName,
      screenRoute,
      actionType: 'Click',
      buttonTitle: title,
      buttonType,
      buttonSize,
      testId: testID,
    })
    requestAnimationFrame(() => {
      if (onClick) {
        onClick()
      }
    })
  }

  const onPressIn = () => {
    startBackgroundColorAnimation(1)
  }

  const onPressOut = () => {
    startBackgroundColorAnimation(0)
  }

  const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableWithoutFeedback
  return (
    <Flex direction={'column'}>
      {header && (
        <Stack direction={'row'}>
          <Margin grow={1} direction={'row'} crossAxisDistribution={'flex-start'} marginBottomStep={2}>
            <Text style={textStyles} testID={`${testID}.header`}>
              {header}
            </Text>
          </Margin>
        </Stack>
      )}

      <Touchable
        accessibilityRole={'button'}
        accessibilityHint={onPressHint}
        testID={testID}
        disabled={disabled || loading}
        onPress={clickHandler}
        onLongPress={onLongClick}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        touchSoundDisabled={false}
      >
        {/** TODO: [CFT-490] add activity indicator here */}
        <Animated.View style={[buttonStyles]} onLayout={onLayout}>
          {(loading && <ActivityIndicator size="small" tint={textColor} loading={true} />) || (
            <>
              {renderLeftIcon()}
              {placeholder && (
                <Text style={textStyles} testID={'button.title'}>
                  {placeholder}
                </Text>
              )}
              {!_.isEmpty(title) && (
                <View style={styles.textContainer}>
                  {!_.isEmpty(title) && (
                    <Text style={[textStyles]} testID={`${testID || 'button'}.title`}>
                      {title}
                    </Text>
                  )}
                  {subtitle && (
                    <Text style={subtitleStyles} testID={'button.subtitle'}>
                      {subtitle}
                    </Text>
                  )}
                </View>
              )}
              {centerIcon && renderCenterIcon()}
              {rightIcon && renderRightIcon()}
            </>
          )}
        </Animated.View>
      </Touchable>
    </Flex>
  )
}
