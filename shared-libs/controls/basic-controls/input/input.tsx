import React, { forwardRef, useState, useRef, useImperativeHandle, useEffect } from 'react'
import { ActionClear, ErrorIcon } from '@sample/assets'
import { BackgroundContainer, Border, Flex, Margin, Overlay, Stack } from '@sample/layout-controls'
import { useBorder } from '@sample/themes/hooks'
import { translate } from '@sample/utilities/i18n'
import { LocalSVGSource, SVG } from '@sample/basic-controls'
import _ from 'lodash'
import { ActivityIndicator } from '../activity-indicator'
import { ClickableOpacity } from '../clickable'
import { StripeTextEntry } from '../stripe-text-entry'
import { Text } from '../text'
import { TextEntry, TextEntryRef } from '../text-entry'
import { InputProps } from './input.props'
import { BackgroundColors, Colors } from '@sample/themes/type-defs'
// import { TooltipProvider } from '@sample/widgets/tooltip'

const getTint = (props: InputProps, selected: boolean) => {
  const { focusState, error } = props

  let tint: keyof Colors
  let borderTint: keyof BackgroundColors
  let currentState = focusState
  if (currentState === undefined) {
    if (!_.isEmpty(error)) {
      currentState = 'error'
    } else if (selected) {
      currentState = 'focused'
    } else {
      currentState = 'unfocused'
    }
  }
  switch (currentState) {
    case 'error':
      tint = 'red400'
      borderTint = 'error3'
      break
    case 'focused':
      tint = 'blue100'
      borderTint = 'background2'
      break
    case 'unfocused':
    default:
      tint = 'blue100'
      borderTint = 'border1'
      break
  }

  return { tint, borderTint }
}

export const Input = forwardRef<TextEntryRef, InputProps>((props, ref) => {
  const { baseBorder } = useBorder()
  const {
    title,
    prefixText,
    leftHelperText,
    rightHelperText,
    error,
    suppressErrorText,
    leadingIcon,
    trailingIcon,
    loading,
    focusHandler,
    blurHandler,
    toolTipIcon,
    toolTipText,
    testID,
    stripeInputType,
    secureTextEntry,
    onClear,
    text,
    backgroundColor = 'transparent',
    backgroundRadius = baseBorder.cornerRadius.small,
    inputDisabled,
    focusState,
  } = props

  const [selected, setSelected] = useState(false)
  const [secure, setSecure] = useState(secureTextEntry)
  const { tint, borderTint } = getTint(props, selected)

  const entryRef = useRef<TextEntryRef>(null)

  const touchEndFunc = () => {
    if (entryRef.current !== null) {
      entryRef.current.focus()
    }
  }

  const focusFunc = () => {
    setSelected(true)
    if (focusHandler !== undefined) {
      focusHandler()
    }
  }

  const blurFunc = () => {
    setSelected(false)
    if (blurHandler !== undefined) {
      blurHandler()
    }
  }

  const focus = () => {
    if (entryRef.current !== null) {
      entryRef.current.focus()
    }
  }

  const blur = () => {
    if (entryRef.current !== null) {
      entryRef.current.blur()
    }
  }

  const setPrivate = () => {
    if (entryRef.current !== null) {
      entryRef.current.setPrivate()
    }
  }

  useImperativeHandle(ref, () => ({
    focus,
    blur,
    setPrivate,
  }))

  useEffect(() => {
    setSecure(secureTextEntry)
  }, [secureTextEntry])

  const textEntryElement = () => {
    if (stripeInputType) {
      return <StripeTextEntry {...props} stripeInputType={stripeInputType} />
    }
    return (
      <TextEntry
        {...props}
        ref={entryRef}
        secureTextEntry={secure}
        focusHandler={focusFunc}
        blurHandler={blurFunc}
        testID={`${testID}.input.text-entry`}
      />
    )
  }
  const toggleSecure = () => setSecure(!secure)

  return (
    <Flex direction={'row'} grow={1} testID={`${testID || 'ucl'}.input`}>
      <Margin direction={'column'} grow={1}>
        <Stack direction={'column'} childSeparationStep={2}>
          {(title || (toolTipIcon && toolTipText)) && (
            <Flex grow={1} direction={'row'}>
              {title && <Text text={title} textType={'secondary1'} testID={`${testID || 'basic-controls'}.input.title`} />}
              {/* {toolTipIcon && toolTipText && (
								<TooltipProvider>
									<InputHelpIcon toolTipIcon={toolTipIcon} toolTipText={toolTipText} />
								</TooltipProvider>
							)} */}
            </Flex>
          )}
          <BackgroundContainer type={backgroundColor} borderRadius={backgroundRadius}>
            <Border
              cornerRadius={'large'}
              lineWeight={'heavy'}
              color={selected ? 'border2' : 'transparent'}
              touchUpInsideHandler={touchEndFunc}
              grow={1}
              overflow={false}
            >
              <Border
                cornerRadius={'small'}
                lineWeight={'light'}
                color={inputDisabled ? 'transparent' : borderTint}
                touchUpInsideHandler={touchEndFunc}
                grow={1}
              >
                <Margin direction={'column'} grow={1}>
                  <Stack direction={'row'} crossAxisDistribution={'center'}>
                    {leadingIcon && (
                      <Margin
                        direction={'column'}
                        axisDistribution={'center'}
                        crossAxisDistribution={'center'}
                        marginLeftStep={1}
                        marginRightStep={1}
                      >
                        <SVG tint={tint} localSVG={leadingIcon} />
                      </Margin>
                    )}
                    {prefixText && <Text text={prefixText} textType={'secondary4'} />}
                    <Flex grow={1} direction={'column'} axisDistribution={'center'}>
                      {textEntryElement()}
                      {onClear && !!text && (
                        <Overlay insetRightStep={0} insetTopStep={0}>
                          <ClickableOpacity onClick={onClear}>
                            <SVG localSVG={ActionClear} />
                          </ClickableOpacity>
                        </Overlay>
                      )}
                      {secureTextEntry && (
                        <Overlay insetRightStep={0}>
                          <ClickableOpacity onClick={toggleSecure}>
                            <Text
                              text={translate(secure ? 'common-actions.show' : 'common-actions.hide')}
                              textType={'secondary4'}
                              color={'primary3'}
                            />
                          </ClickableOpacity>
                        </Overlay>
                      )}
                    </Flex>
                    {loading && (
                      <Margin
                        direction={'column'}
                        axisDistribution={'center'}
                        crossAxisDistribution={'center'}
                        marginLeftStep={1}
                        marginRightStep={1}
                      >
                        <ActivityIndicator loading={loading} testID={`${testID || 'ucl'}.input.activity-indicator`} />
                      </Margin>
                    )}
                    {!loading && trailingIcon && (
                      <Margin
                        direction={'column'}
                        axisDistribution={'center'}
                        crossAxisDistribution={'center'}
                        marginLeftStep={1}
                        marginRightStep={1}
                      >
                        <SVG tint={tint} localSVG={trailingIcon as LocalSVGSource} />
                      </Margin>
                    )}
                  </Stack>
                </Margin>
              </Border>
            </Border>
          </BackgroundContainer>
          {(leftHelperText || rightHelperText) && (
            <Stack direction={'row'} grow={0}>
              {leftHelperText && (
                <Flex direction={'row'} axisDistribution={'flex-start'} grow={1}>
                  <Text
                    text={leftHelperText}
                    textType={'primary4'}
                    color={'primary1'}
                    testID={`${testID || 'ucl'}.input.left-helper-text`}
                  />
                </Flex>
              )}
              {/* This view is between the other two so that they will align around the space correctly if one or the other is not shown. */}
              {rightHelperText && (
                <Flex direction={'row-reverse'} axisDistribution={'flex-start'} grow={1}>
                  <Text
                    text={rightHelperText}
                    textType={'primary4'}
                    color={'primary1'}
                    testID={`${testID || 'ucl'}.input.right-helper-text`}
                  />
                </Flex>
              )}
            </Stack>
          )}
          {error && !suppressErrorText && (
            <>
              <Stack grow={1} childSeparationStep={2} direction={'row'} crossAxisDistribution={'center'}>
                <SVG localSVG={{ ...ErrorIcon, size: { width: 10, height: 10 } }} tint={'transparent'} />
                <Text text={error} textType={'primary4'} color={'error3'} testID={`${testID || 'ucl'}.input.error-text`} />
              </Stack>
            </>
          )}
        </Stack>
      </Margin>
    </Flex>
  )
})
