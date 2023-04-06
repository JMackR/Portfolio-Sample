import React, { useRef, KeyboardEvent, forwardRef, useImperativeHandle, useState } from 'react'
import { useColor, useColorForBackgroundColor, useColorForTextColor } from '@sample/themes'
import { convertFontWeight } from '@sample/themes/utility/font-conversions'
import { StyleSheet, css } from 'aphrodite/no-important'
import { Text } from '../text/text'
import { ComputePropsForTextEntryProps } from './text-entry-shared'
import { TextEntryProps, TextEntryRef } from './text-entry.props'

export const TextEntry = forwardRef<TextEntryRef, TextEntryProps>((props, ref) => {
  const {
    controlName,
    text,
    hint,
    inputCharLimit,
    keyboardType,
    inputMode,
    textColor,
    secureTextEntry,
    keyPressHandler,
    textChangeHandler,
    endEditingHandler,
    blurHandler,
    focusHandler,
    textAlign,
    testID,
    inputDisabled,
    onPaste,
  } = props
  const { minLineHeight, maxLineHeight, font, minPointHeight, maxPointHeight, isMultiline, primaryColor, hintColor } =
    ComputePropsForTextEntryProps(props)

  const { colors } = useColor()
  const styles = StyleSheet.create({
    textentry: {
      '::placeholder': {
        color: hintColor || useColorForTextColor('primary2'),
      },
      ':disabled': {
        color: useColorForTextColor('primary2'),
        '-webkit-text-fill-color': useColorForTextColor('primary2'),
        background: colors.grey100,
      },
      'text-align': textAlign,
      color: textColor || primaryColor,
      backgroundColor: useColorForBackgroundColor('background1'),
      overflow: 'hidden',
      resize: 'none',
      minWidth: 0,
      minSize: 0,
      textVerticalAlign: 'top',
      // TODO: Check back after font changes
      // minHeight: `${minPointHeight}px`,
      // minHeight: '22px',
      height: '16px',
      fontSize: font.fontSize,
      fontWeight: convertFontWeight(font.fontWeight),
      fontFamily: `${font.fontFamily}, sans-serif`,
      margin: 0,
      display: 'flex',
      flexDirection: 'row',
      width: 'calc(100% - 30px)',
      borderRadius: '4px',
      border: 'none',
      padding: '20px 16px 20px 14px',
      outline: 'none',
      boxShadow: 'none',
    },

    inputContainer: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      ':focus-within .inputTransform': {
        top: '0',
        left: '14px',
        fontSize: '10px',
        transform: 'translateY(0px) scale(0.8)',
        transformOrigin: '0px 100%',
      },
    },
    inputLabel: {
      position: 'absolute',
      pointerEvents: 'none',
      transform: 'translateY(-50%)',
      transformOrigin: '0px 100%',
      transition: 'all 0.15s ease-out 0s',
      top: '50%',
      left: '14px',
    },

    inputFilled: {
      top: '0',
      left: '14px',
      fontSize: '10px',
      transform: 'translateY(0px) scale(0.8)',
      transformOrigin: '0px 100%',
    },
  })
  const [isActive, setIsActive] = useState(false)

  const input = isMultiline ? useRef<HTMLTextAreaElement>() : useRef<HTMLInputElement>()

  const keyPressFunc = (e: KeyboardEvent<HTMLTextAreaElement> | KeyboardEvent<HTMLInputElement>) => {
    const element = input.current
    if (e.key === 'Enter' && isMultiline === false && element !== undefined && element !== null) {
      element.blur()
    }

    keyPressHandler && keyPressHandler(e.key)
  }

  const changeFunc = () => {
    const element = input.current
    if (element !== undefined && element !== null && isMultiline && minLineHeight !== maxLineHeight) {
      element.style.height = 'auto'
      element.style.height = `${Math.min(element.scrollHeight, maxPointHeight)}px`
    }

    if (textChangeHandler) {
      textChangeHandler(element !== undefined && element !== null ? element.value : undefined)
    }
  }

  const blurFunc = () => {
    if (endEditingHandler !== undefined) {
      const element = input.current
      endEditingHandler(element !== undefined && element !== null ? element.value : '')
    }
    if (blurHandler !== undefined) {
      setIsActive(false)
      blurHandler()
    }
  }

  const focus = () => {
    if (input.current !== undefined && input.current !== null) {
      input.current.focus()
      setIsActive(true)
    }
  }

  const blur = () => {
    if (input.current !== undefined && input.current !== null) {
      input.current.blur()
    }
  }

  const setPrivate = () => {}

  useImperativeHandle(ref, () => ({
    focus,
    blur,
    setPrivate,
  }))

  if (isMultiline) {
    return (
      <textarea
        className={css(styles.textentry)}
        name={controlName}
        maxLength={inputCharLimit}
        onKeyPress={keyPressFunc}
        onFocus={focusHandler}
        onBlur={blurFunc}
        ref={input as React.RefObject<HTMLTextAreaElement>}
        placeholder={hint}
        onChange={changeFunc}
        value={text}
      />
    )
  }

  return (
    <div className={css(styles.inputContainer)}>
      <input
        className={css(styles.textentry)}
        name={controlName}
        maxLength={inputCharLimit}
        onFocus={focusHandler}
        onBlur={blurFunc}
        onKeyDown={keyPressFunc}
        type={secureTextEntry ? 'password' : keyboardType}
        inputMode={inputMode}
        ref={input as React.RefObject<HTMLInputElement>}
        // placeholder={hint}
        onChange={changeFunc}
        value={text || ''}
        data-testid={testID}
        disabled={inputDisabled}
        onPaste={onPaste}
      />
      <label
        className={
          text
            ? `${css(styles.inputLabel)} ${css(styles.inputFilled)} inputTransform`
            : `${css(styles.inputLabel)} inputTransform`
        }
        htmlFor={controlName}
      >
        <Text textType={'secondary4'} color={inputDisabled ? 'primary2' : 'primary1'}>
          {hint}
        </Text>
      </label>
    </div>
  )
})
