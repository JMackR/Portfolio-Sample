import type { FC, PropsWithChildren } from 'react'
import React, { useEffect } from 'react'
import { ActivityIndicator, View, useWindowDimensions } from 'react-native'
import { CameraCapture, CameraOutline, EditPencil } from '@sample/assets'
import { Button, SVG, Text } from '@sample/basic-controls'
import { Margin, Overlay, Separator, Stack } from '@sample/layout-controls'
import { usePhotoSelection } from '@sample/providers/photo-selection-provider'
import { translate } from '@sample/utilities/i18n'
import { ErrorBorder } from '@sample/widgets/error-border'
import { CameraClaims, LibraryClaims, RightArrow, SelectPhotoIcon, VideoClaims } from '@sample/assets/image-catalog'
import { Flex } from '@sample/layout-controls'
import { useCoordinator } from '@sample/providers/claim-provider/claim-coordination-provider'
import { useClaimNavigation } from '@sample/providers/claim-provider/claim-navigation-provider'
import { NavigationBar, NAVIGATION_BAR_HEIGHT } from '@sample/widgets/navigation-bar'
import type { NavigationBarProps } from '@sample/widgets/navigation-bar'
import { createThumbnail } from 'react-native-create-thumbnail'
import { launchCamera, CameraOptions, launchImageLibrary } from 'react-native-image-picker'
import { checkVideo, checkCamera, checkPhotoGallery } from '@sample/utilities/permission/media-permissions'
import { Navigation } from '../../navigation/navigation'
import { getNavigationBackButton, getNavigationCancelButton } from '../../common'
import { Screen } from '@sample/mobile-widgets/screen'
import DropShadow from 'react-native-drop-shadow'
import { shadow } from '@sample/themes/shadow'
import type { PhotoImageIdentifier } from '@sample/mobile-widgets/camera-roll/props'
import { PhotoIcon } from '@sample/assets/image-catalog'
import { ImagePickerGrid } from './image-picker-grid'
import { NavigableRoute } from '../../routes'
// import ExifReader from '../../../../../node_modules/exifreader/src/exif-reader.js'
import { decode } from 'base64-arraybuffer'

const CAMERA_OPTIONS = {
  mediaType: 'photo',
  includeExtra: true,
  saveToPhotos: true,
  selectionLimit: 9,
  includeBase64: false,
  presentationStyle: 'formSheet',
  cropping: false,
}
const VIDEO_OPTIONS = {
  mediaType: 'video',
  includeExif: true,
  saveToPhotos: true,
}
const LIBRARY_OPTIONS = {
  cropping: false,
  mediaType: 'mixed',
  includeExif: true,
  selectionLimit: 9,
  includeBase64: false,
  presentationStyle: 'formSheet',
}

export const MediaController: FC = () => {
  const { width, height } = useWindowDimensions()
  const { screenIndex, viewModel } = useCoordinator()
  const { setScreenIndex } = useClaimNavigation()
  const { selectedPhotos, setSelectedPhotos } = usePhotoSelection()

  const onTakePhotoClick = async () => {
    // claim-photo.trackPhotosClickEvent(AnalyticsElementType.Button, TakePhoto)
    const result = await checkCamera()
    console.log('FIRE TAKE PHOTO', result)

    if (result) {
      Navigation.navigateToRoute(NavigableRoute.CameraRoll)
      // launchCamera(CAMERA_OPTIONS, (response: any) => {
      //   console.log('response', response)
      //   const files = response?.assets?.map(({ uri }: { uri: string }) => uri)
      //   if (files) {
      //     setSelectedPhotos([...selectedPhotos, ...files])
      //   }
      // })
    }
  }

  const handleBackPress = () => {
    if (screenIndex > 0) {
      setScreenIndex(screenIndex - 1)
      Navigation.goBack()
    } else {
      Navigation.goBack()
    }
  }

  const onLibraryClick = async () => {
    const result = await checkPhotoGallery()

    if (result) {
      const pics = await launchImageLibrary(LIBRARY_OPTIONS) // => {
      // console.log('FILES ', pics)

      const files = await pics?.assets?.map(({ uri, base64, type }: { uri: string; base64: string }) => {
        // const fileBuffer = decode(base64)
        // console.log('image', fileBuffer)
        // const tags = await ExifReader.load(fileBuffer, { expanded: true })
        // console.log('TAGS', tags.exif.GPSLatitude.description, tags.exif.GPSLongitude.description)
        // console.log('URI', uri)
        const obj = { thumbnail: uri, media: uri, type }
        // console.log('OBJ', obj)

        return obj
      })
      // if (files) {
      console.log('FILES', files)
      setSelectedPhotos([...selectedPhotos, ...files])
      // }
      // setSelectedPhotos([...selectedPhotos, ...response.assets])
      //  })
    }
  }
  const onPhotoDelete = (photo) => {
    const updatedImaged = selectedPhotos.filter((item) => item.thumbnail !== photo.thumbnail)
    setSelectedPhotos(updatedImaged)
  }

  const blanks = Array.from({ length: 12 }).map((u, i) => ({ ['imageID']: `blank`, ['localPath']: SelectPhotoIcon }))
  // console.log('SELECTED selectedPhotos.length', selectedPhotos.length)
  const size = selectedPhotos?.length ? selectedPhotos?.length : 0
  blanks.splice(0, size, ...selectedPhotos)

  const backButton = []
  backButton.push(getNavigationBackButton('navigation-bar'))

  return (
    <Screen safeAreaMode="all" screenName={'add_image'}>
      <NavigationBar
        isRootNavBar={false}
        rightItems={[getNavigationCancelButton('profile-image-select.navigation-bar')]}
        testID="inbox-screen.navigation-bar"
        barItemsTint={'primary'}
        backgroundColor={'secondary'}
      />

      <Margin grow={0} marginStep={4} axisDistribution={'center'}>
        <DropShadow
          style={{
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.5,
            shadowRadius: 3.65,
            elevation: 6,
          }}
        >
          <View
            style={{
              height: height * 0.51,
              width: width * 0.96,
              justifyContent: 'center',
              flexDirection: 'column',
              borderWidth: 1,
              borderColor: '#004763',
              borderRadius: 20,
            }}
          >
            <View
              style={{
                height: height * 0.5,
                width: width * 0.935,
                justifyContent: 'center',
                flexDirection: 'column',
                borderWidth: 1,
                alignSelf: 'center',
                borderColor: '#004763',
                borderRadius: 15,
              }}
            >
              {/* {!isLoading && (
                <Margin direction="column" marginStep={1}>
                  <Text textType={'primary3'} text={'Add photos'} />
                </Margin>
              )} */}

              <Margin grow={1} direction="column" marginStep={4}>
                <ImagePickerGrid onImagePickerItemPressed={onPhotoDelete} photos={blanks} testID="image-picker.grid" />
              </Margin>
            </View>
          </View>
        </DropShadow>
      </Margin>
      <Overlay width={'100%'} direction="column" grow={1} insetBottomStep={6}>
        <>
          <Margin grow={1} direction="column" marginStep={4}>
            <Stack grow={1} direction="column" childSeparationStep={4} axisDistribution="flex-start">
              <Button
                centerIcon={CameraOutline}
                title={translate('camera.take-photo')}
                buttonType="secondary"
                buttonSize="large"
                onClick={onTakePhotoClick}
                testID="take-photo"
              />

              <Button
                centerIcon={PhotoIcon}
                title={translate('camera.select-photo')}
                buttonType="primary"
                buttonSize="large"
                onClick={onLibraryClick}
                testID="select-image"
              />

              {selectedPhotos?.length > 0 && (
                <Stack
                  grow={0}
                  direction="column"
                  childSeparationStep={4}
                  crossAxisDistribution="stretch"
                  axisDistribution="center"
                >
                  <Separator direction="column" />
                  <Margin grow={1} direction="column" marginTopStep={4}>
                    <Button
                      title={'Save Photos'}
                      buttonType={'tertiary'}
                      buttonSize="large"
                      onClick={() => Navigation.goBack()}
                      testID="use-photo"
                    />
                  </Margin>
                </Stack>
              )}
            </Stack>
          </Margin>
        </>
      </Overlay>
    </Screen>
  )
}
