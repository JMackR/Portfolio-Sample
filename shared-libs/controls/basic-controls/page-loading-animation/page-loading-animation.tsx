import React, { useState, useEffect } from 'react'
import { PageLoading } from '@sample/assets/lottie-animations'
import { Text } from '@sample/basic-controls'
import { ActivityIndicator } from '../activity-indicator'
import { StyleSheet, css } from 'aphrodite/no-important'
import { Margin } from '@sample/layout-controls'
import { useMediaQuery } from '@sample/providers/media-query-provider'
import { MediaName } from '@sample/utilities'

export interface PageLoadingAnimationProps {
  isLoading: boolean
  title?: string
}

const styles = StyleSheet.create({
  backgroundContainer: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})

export const PageLoadingAnimation = ({ isLoading, title }: PageLoadingAnimationProps) => {
  const { mediaQueryName } = useMediaQuery()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(mediaQueryName === MediaName.Mobile || mediaQueryName === MediaName.Tablet)
  }, [mediaQueryName])

  return (
    <>
      {isLoading && (
        <div className={css(styles.backgroundContainer)} data-testid={'loading-indicator'}>
          {title && (
            <Margin marginTopStep={isMobile ? 12.5 : 21.5}>
              <Text text={title} textType={isMobile ? 'heading6' : 'heading3'} />
            </Margin>
          )}
          <Margin direction={'column'} crossAxisDistribution={'center'} marginTopStep={isMobile ? 20 : 27}>
            <ActivityIndicator loading={true} mode={'page'} lottyAnimation={PageLoading} />
          </Margin>
        </div>
      )}
    </>
  )
}
