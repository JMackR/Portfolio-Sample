import type { FC } from 'react'
import React from 'react'
import { LocalImage, SVG, Text } from '@sample/basic-controls'
import type { MarginProps } from '@sample/layout-controls'
import { BackgroundContainer, Border, Flex, Margin, Overlay } from '@sample/layout-controls'
import _ from 'lodash'
import type { GestureResponderEvent } from 'react-native'
import { TouchableHighlight } from 'react-native'
import type { PhotoImageIdentifier } from '@sample/mobile-widgets/camera-roll/props'
import { ActionClose, ActionClear } from '@sample/assets'
import DropShadow from 'react-native-drop-shadow'

export interface ImagePickerGridItemProps {
  photoImage: PhotoImageIdentifier
  selectedPhotos?: PhotoImageIdentifier[]
  onItemPress: ImagePickerGridItemPress
}

export type ImagePickerGridItemPress = (photo: PhotoImageIdentifier) => void

const SELECTION_INDICATOR_CONTAINER: MarginProps = {
  marginRightStep: 2,
  marginLeftStep: 4,
  marginTopStep: 2,
}

export const ImagePickerGridItem: FC<ImagePickerGridItemProps> = ({ photoImage, onItemPress, selectedPhotos, photos }) => {
  const idx = _.findIndex(photos, (p) => p.imageID === photoImage.imageID)

  const onPress: (event: GestureResponderEvent) => void = () => {
    onItemPress(photoImage)
  }

  return (
    <TouchableHighlight key={idx} testID={'image-picker-photo.grid-item.' + idx}>
      <Flex direction={'column'}>
        {photoImage.imageID !== 'blank' && (
          <>
            <LocalImage
              source={{ uri: `file://${photoImage?.thumbnail}` }}
              resizeMode="cover"
              width="100%"
              aspectRatio={1}
            />
            <Overlay width="100%" height="100%" insetRightStep={4} insetTopStep={-2}>
              <DropShadow
                style={{
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 2.65,
                  elevation: 6,
                }}
              >
                <Margin {...SELECTION_INDICATOR_CONTAINER}>
                  <SVG
                    localSVG={{ ...ActionClear, size: { width: 30, height: 30 } }}
                    tint="alwaysLight"
                    onPress={() => onPress(null)}
                  />
                </Margin>
              </DropShadow>
            </Overlay>
          </>
        )}

        {photoImage.imageID === 'blank' && (
          <SVG localSVG={{ ...photoImage.localPath, size: { width: 100, height: 100 } }} tint="primary" />
        )}
      </Flex>
    </TouchableHighlight>
  )
}
