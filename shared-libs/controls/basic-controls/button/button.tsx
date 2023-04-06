import React, { forwardRef, SyntheticEvent } from 'react'
import { Loading, LoadingLight } from '@sample/assets/lottie-animations'
import {
  Colors,
  FontStyle,
  useBorder,
  useColor,
  useColorForBackgroundColor,
  useColorForTextColor,
  useFont,
} from '@sample/themes'
import { convertFontWeight, convertLineHeightToPx } from '@sample/themes/utility/font-conversions'
import styled, { css } from 'styled-components'
import { ActivityIndicator } from '../activity-indicator'
import { LocalSVGSource, SVG } from '../image'
import { ButtonPropsWeb } from './button-props'
import { textColorForCurrentButtonType, isJSXElement, isLocalSVGSource } from './button-shared'

const ICON_SIZE = 20

const buttonBase = css`
  padding-left: ${(props) => props.theme.padding};
  padding-right: ${(props) => props.theme.padding};
  height: ${(props) => props.theme.height};
  background-color: ${(props) => props.theme.bgColor};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: ${(props) => props.theme.borderRadius};
  border-style: solid;
  border-color: ${(props) => props.theme.borderColor};
  border-width: ${(props) => props.theme.borderWidth};
  box-sizing: border-box;

  text-decoration: none;
  justify-content: center;
  display: flex;
  align-items: center;
  line-height: ${(props) => props.theme.lineHeight};

  -webkit-user-select: none;
  user-select: none;

  &:hover {
    background-color: ${(props) => props.theme.bgColorHover};
    cursor: pointer;
    -webkit-transition: background-color 100ms linear;
  }
  &:active {
    background-color: ${(props) => props.theme.bgColorPressed};
    -webkit-transition: background-color 100ms linear;
  }
`

const selectorButton = css`
  border-radius: ${(props) => props.theme.selectorBorderRadius};
  justify-content: flex-start;
`

const ButtonStyled = styled.button`
  ${buttonBase}
  ${(props) => (props.theme.buttonType === 'selector' ? selectorButton : '')}
`

const LeftIconContainer = styled.div`
  padding-right: 8px;
  display: inline-flex;
  vertical-align: middle;
`

const RightIconContainer = styled.div`
  margin-left: auto;
  display: inline-flex;
  vertical-align: middle;
`

const Icon = styled.span`
  height: ${ICON_SIZE}px;
  width: ${ICON_SIZE}px;
`

const TextContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  vertical-align: middle;
`

const Text = styled.span`
  color: ${(props) => props.theme.textColor};
  flex: 1;
  font-family: ${(props) => props.theme.fontFamily}, sans-serif;
  font-size: ${(props) => props.theme.fontSize};
  font-weight: ${(props) => props.theme.fontWeight};
  text-align: center;
  &:hover {
    color: ${(props) => props.theme.textColorHover};
    -webkit-transition: background-color 100ms linear;
  }
  &:active {
    color: ${(props) => props.theme.textColorPressed};
    -webkit-transition: background-color 100ms linear;
  }
`

const SubTitle = styled.span`
  flex: 1;
  color: ${(props) => props.theme.textColor};
  text-align: center;
  display: inline-block;
  &:hover {
    color: ${(props) => props.theme.textColorHover};
    -webkit-transition: background-color 100ms linear;
  }
  &:active {
    color: ${(props) => props.theme.textColorPressed};
    -webkit-transition: background-color 100ms linear;
  }
`

export const Button = forwardRef((props: ButtonPropsWeb, ref: any) => {
  const {
    onClick,
    title,
    subtitle,
    leftIcon,
    rightIcon,
    buttonType,
    buttonSize,
    testID,
    affectedUserId,
    disabled,
    loading,
    doNotApplySidePadding,
    boxShadow,
    accessibilityLabel,
    noRadius,
  } = props

  const { colors } = useColor()
  const { fonts } = useFont()
  const { baseBorder } = useBorder()

  const textColorName = textColorForCurrentButtonType(buttonType)
  const textColor = useColorForTextColor(textColorName)

  let bgColor
  let bgColorPressed
  let bgColorHover
  let textColorPressed
  let textColorHover
  let borderColor = '#00000000'
  const borderWidth = 1

  switch (buttonType) {
    default:
    case 'primary':
      bgColor = useColorForBackgroundColor('highlight1')
      bgColorPressed = useColorForBackgroundColor('highlight1')
      bgColorHover = useColorForBackgroundColor('highlight2')

      textColorPressed = useColorForTextColor('primary3')
      textColorHover = useColorForTextColor('primary3')
      break
    case 'secondary':
      bgColor = useColorForBackgroundColor('background2')
      bgColorPressed = useColorForBackgroundColor('background2')
      bgColorHover = colors.grey500

      textColorPressed = useColorForTextColor('primary4')
      textColorHover = useColorForTextColor('primary4')
      break
    case 'selector':
      bgColor = colors.grey100
      bgColorPressed = useColorForBackgroundColor('highlight2')
      bgColorHover = useColorForBackgroundColor('highlight2')

      textColorPressed = useColorForTextColor('primary3')
      textColorHover = useColorForTextColor('primary3')
      break

    case 'transparent':
      bgColor = 'transparent'
      bgColorPressed = 'transparent'
      bgColorHover = 'transparent'
      break

    case 'disabled':
      bgColor = colors.grey100
      bgColorPressed = colors.grey100
      bgColorHover = colors.grey100

      textColorPressed = useColorForTextColor('primary4')
      textColorHover = useColorForTextColor('primary4')
      break
  }

  let padding
  let fontStyle: FontStyle
  let height

  // set sizes, paddings
  switch (buttonSize) {
    default:
    case 'large':
      fontStyle = fonts.primary3
      padding = '12px'
      height = '48px'
      break
    case 'small':
      fontStyle = fonts.primary3
      padding = '10px'
      height = '32px'
      break
    case 'xlarge':
      fontStyle = fonts.primary3
      padding = '18px'
      height = '60px'
      break
  }

  if (buttonType === 'selector') {
    fontStyle = fonts.primary4
    padding = '12px'
    height = '74px'
  }

  if (doNotApplySidePadding) {
    padding = '0px'
  }

  const buttonTheme = {
    padding: padding,
    height: height,
    bgColor: bgColor,
    boxShadow: boxShadow,
    borderColor: borderColor,
    borderWidth: `${borderWidth}px`,
    lineHeight: convertLineHeightToPx(fontStyle.lineHeight),
    bgColorHover: bgColorHover,
    bgColorPressed: bgColorPressed,
    selectorBorderRadius: `${baseBorder.cornerRadius.large}px`,
    buttonType: buttonType,
    borderRadius: noRadius ? '0' : '100px',
  }

  const textTheme = {
    textColor: textColor,
    fontFamily: fontStyle.fontFamily,
    fontSize: `${fontStyle.fontSize}px`,
    fontWeight: convertFontWeight(fontStyle.fontWeight),
    textColorHover: textColorHover,
    textColorPressed: textColorPressed,
  }

  const subTitleTheme = {
    textColor: textColor,
    textColorHover: textColorHover,
    textColorPressed: textColorPressed,
  }

  const handleOnClick = (e: SyntheticEvent) => {
    if (disabled) {
      return
    }
    e.preventDefault()
    onClick && onClick(e)
  }

  const getIcon = (icon: JSX.Element | LocalSVGSource | undefined) => {
    if (isJSXElement(icon)) {
      return icon
    } else if (isLocalSVGSource(icon)) {
      const resizedSVG: LocalSVGSource = {
        SVG: icon.SVG,
        size: {
          width: ICON_SIZE,
          height: ICON_SIZE,
        },
      }
      return <SVG localSVG={resizedSVG} tint={textColor as keyof Colors} />
    }
  }

  const renderLeftIcon = () => {
    const iconJSX = getIcon(leftIcon)
    if (!iconJSX) {
      return undefined
    }
    return (
      <LeftIconContainer>
        <Icon>{iconJSX}</Icon>
      </LeftIconContainer>
    )
  }
  const renderRightIcon = () => {
    const iconJSX = getIcon(rightIcon)
    if (!iconJSX) {
      return undefined
    }
    return (
      <RightIconContainer>
        <Icon>{iconJSX}</Icon>
      </RightIconContainer>
    )
  }

  return (
    <ButtonStyled
      // styles.button, buttonType === 'selector' && styles.selectorButton)}
      onClick={handleOnClick}
      data-testid={testID}
      theme={buttonTheme}
      aria-label={accessibilityLabel || ''}
      ref={ref}
    >
      {(loading && (
        <ActivityIndicator lottyAnimation={buttonType === 'secondary' ? LoadingLight : Loading} loading={loading} />
      )) || (
        <>
          {renderLeftIcon()}
          <TextContainer>
            {title && <Text theme={textTheme}>{title}</Text>}
            {subtitle && <SubTitle theme={subTitleTheme}>{subtitle}</SubTitle>}
          </TextContainer>
          {renderRightIcon()}
        </>
      )}
    </ButtonStyled>
  )
})
