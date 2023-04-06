import React from 'react'
import { Platform } from 'react-native'
import { useCoordinator } from '@auto/care-client/claim/claim-coordinator'
import { Button } from '@sample/basic-controls'
import { ButtonType } from '@sample/basic-controls/button/button-props-base'
import { Flex, Margin, Stack } from '@sample/layout-controls'
import { useColorForBackgroundColor } from '@sample/themes/hooks/use-color'
import { translate } from '@sample/utilities/i18n'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SafeAreaView from 'react-native-safe-area-view'

const VERTICAL_MARGIN = 2
const HORIZONTAL_MARGIN = 4

const FOOTER_MARGIN = {
  marginTopStep: VERTICAL_MARGIN,
  marginLeftStep: HORIZONTAL_MARGIN,
  marginRightStep: HORIZONTAL_MARGIN,
}

export const NavigationFooter = () => {
  const disabled = false
  const { viewModel, handleFooterButtonClicked, screenIndex, viewModels } = useCoordinator()

  let footerButtonType: ButtonType
  const insets = useSafeAreaInsets()
  footerButtonType = disabled ? 'disabled' : 'primary'
  // @ts-ignore
  const backgroundColorValue = useColorForBackgroundColor(viewModel?.backgroundColor)

  return (
    <SafeAreaView
      style={{ paddingBottom: insets.bottom + (Platform.OS === 'android' ? 20 : 0), backgroundColor: backgroundColorValue }}
    >
      <Flex grow={1} direction="column">
        <Margin grow={1} direction="column" {...FOOTER_MARGIN}>
          <Stack direction="row" width={'100%'} crossAxisDistribution={'center'} childSeparationStep={6}>
            <Stack direction="column" width={'100%'} childSeparationStep={VERTICAL_MARGIN}>
              <Button
                buttonType={footerButtonType}
                buttonSize="large"
                title={viewModel?.buttonNextText()}
                onPressHint={'Navigates you to start a claim.'}
                onClick={async () => await handleFooterButtonClicked()}
                disabled={disabled}
                // testID={"post-flow." + bottomButtonPrev.toLocaleLowerCase()}
              />
            </Stack>
          </Stack>
        </Margin>
      </Flex>
    </SafeAreaView>
  )
}
