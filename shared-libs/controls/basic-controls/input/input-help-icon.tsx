import React, { useRef } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import { SVG } from '../image'
import { InputHelpIconProps } from './input-help-icon.props'
// import { useTooltip } from '@sample/widgets/tooltip'

export const InputHelpIcon: React.FC<InputHelpIconProps> = (props) => {
  const styles = StyleSheet.create({
    mainContentRowLeftHelpIcon: {
      marginLeft: 4,
      height: 16,
      width: 16,
      cursor: 'pointer',
      alignSelf: 'center',
    },
  })

  const helperIconRef = useRef(null)
  // const { showTooltip } = useTooltip()

  const helperPressHandler = () => {
    if (helperIconRef.current) {
      // showTooltip({
      // 	content: props.toolTipText ? props.toolTipText : '',
      // })
    }
  }
  return (
    <div className={css(styles.mainContentRowLeftHelpIcon)} ref={helperIconRef}>
      <SVG
        tint="grey200"
        localSVG={{
          SVG: props.toolTipIcon?.SVG,
          size: { width: 16, height: 16 },
        }}
      />
    </div>
  )
}
