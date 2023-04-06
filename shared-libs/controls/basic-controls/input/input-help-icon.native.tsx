import React, { useRef } from 'react'
import { useTooltip } from '@sample/widgets/tooltip'
import { TouchableOpacity, View, ViewComponent, StyleSheet } from 'react-native'
import { SVG } from '../image'
import { InputHelpIconProps } from './input-help-icon.props'

export const InputHelpIcon: React.FC<InputHelpIconProps> = (props) => {
  const { toolTipIcon, toolTipText } = props
  const { showTooltip } = useTooltip()
  const toolTipHelperRef: React.Ref<any> = useRef<ViewComponent>(null)

  const styles = StyleSheet.create({
    mainContentRowLeftHelpIcon: {
      flex: 1,
      paddingLeft: 4,
      justifyContent: 'center',
    },
  })

  const toolTipHelperPressHandler = () => {
    if (toolTipHelperRef.current) {
      showTooltip({
        clickComponent: toolTipHelperRef.current,
        content: toolTipText || '',
        width: 164,
        height: 106,
        tryAlignCenter: false,
      })
    }
  }
  return (
    <TouchableOpacity
      onPress={toolTipHelperPressHandler}
      testID=".main-text-tooltip"
      accessibilityLabel=".main-text-tooltip"
    >
      <View style={styles.mainContentRowLeftHelpIcon}>
        {toolTipHelperRef && (
          <View collapsable={false} ref={toolTipHelperRef}>
            <SVG tint="grey200" localSVG={{ SVG: toolTipIcon.SVG, size: { width: 16, height: 16 } }} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}
