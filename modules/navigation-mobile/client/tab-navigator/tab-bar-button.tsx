import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Badge, ClickableOpacity, Text } from '@sample/basic-controls'
import { translate } from '@sample/utilities/i18n'

const Styles = StyleSheet.create({
  tabButton: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  badge: { position: 'absolute', top: 3, start: 43 },
})

interface TabBarButtonProps {
  onPress: () => void
  renderIcon: React.ReactNode
  active: boolean
  labelText: string
  badgeAmount?: number
  index: number
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}

const TabBarButton = (props: TabBarButtonProps) => {
  const { onPress, renderIcon, badgeAmount, labelText, index, testID } = props
  const textColorKey = props.active ? 'primary' : 'secondary'

  return (
    <ClickableOpacity
      // activeOpacity={1}
      style={[Styles.tabButton]}
      onClick={onPress}
      testID={testID || `tab-navigator.tab-bar-button.${index}`}
    >
      {renderIcon}

      {badgeAmount !== undefined && (
        <View style={Styles.badge}>
          <Badge amount={badgeAmount} testID={'tab-navigator.tab-bar-button.badge'} />
        </View>
      )}
      <Text
        textType={'secondaryBody1'}
        color={textColorKey}
        testID={'tab-navigator.tab-bar-button.label'}
        text={translate(labelText)}
      />
    </ClickableOpacity>
  )
}

export { TabBarButton }
