import type { FC } from 'react'
import React from 'react'
import { View } from 'react-native'
import { Grid } from '@sample/basic-controls'
import type { PhotoImageIdentifier } from '@sample/mobile-widgets/camera-roll/props'
import type { ImagePickerGridItemPress } from './image-picker-grid-item'
import { ImagePickerGridItem } from './image-picker-grid-item'

interface ImagePickerGridProp {
  photos: PhotoImageIdentifier[]
  selectedPhotos?: PhotoImageIdentifier[]
  onImagePickerItemPressed: ImagePickerGridItemPress
  testID?: string
}

const NUMBER_OF_COLUMN = 3

export const ImagePickerGrid: FC<ImagePickerGridProp> = ({ photos, selectedPhotos, onImagePickerItemPressed }) => {
  const renderItem: (photo: PhotoImageIdentifier, idx: number) => JSX.Element = (photo, idx) => {
    return (
      <ImagePickerGridItem
        photoImage={photo}
        photos={photos}
        selectedPhotos={selectedPhotos}
        onItemPress={onImagePickerItemPressed}
      />
    )
  }

  return <Grid onEndReachedThreshold={1} data={photos} columns={NUMBER_OF_COLUMN} renderItem={renderItem} />
}
