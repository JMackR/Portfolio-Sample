//@ts-nocheck
import React, { useRef, useState, useEffect } from 'react'
import { View, StatusBar, Animated } from 'react-native'
import { CancelIcon, RightArrow } from '@sample/assets/image-catalog'
import { useCoordinator } from '@auto/care-client/claim/claim-coordinator/claim-coordination-provider'
import { useClaimNavigation } from '@auto/care-client/claim/claim-coordinator/claim-navigation-provider'
import { Flex, Separator, Stack } from '@sample/layout-controls'
import { usePhotoSelection } from '@sample/providers/photo-selection-provider'
import { NavigationBar } from '@sample/widgets/navigation-bar'
import type { NavigationBarProps } from '@sample/widgets/navigation-bar'
import { createThumbnail } from 'react-native-create-thumbnail'
import { launchCamera, CameraOptions, launchImageLibrary } from 'react-native-image-picker'
import { checkVideo, checkCamera, checkPhotoGallery } from '@sample/utilities/permission/media-permissions'
import { Navigation } from '../navigation'
import { NavigableRoute } from '../routes'
import { observable } from '@legendapp/state'
import { observer } from '@legendapp/state/react'
const CAMERA_OPTIONS: CameraOptions = {
  mediaType: 'photo',
  includeExtra: true,
  saveToPhotos: true,
}
const VIDEO_OPTIONS: CameraOptions = {
  mediaType: 'video',
  includeExtra: true,
  saveToPhotos: true,
}
const LIBRARY_OPTIONS: CameraOptions = {
  mediaType: 'mixed',
  includeExtra: true,
  selectionLimit: 12,
}
const state = observable({ features: { media: false } })

const Progress = ({ step, steps, height }) => {
  // const [translateX] = useState(new Value(0))
  const animatedValue = useRef(new Animated.Value(-1000)).current
  const reactive = useRef(new Animated.Value(-1000)).current
  const [width, setWidth] = useState(0)

  const percent = step / steps

  useEffect(() => {
    //   timing(translateX, {
    //     toValue: width * percent,
    //     duration: 300,
    //     easing: EasingNode.inOut(EasingNode.ease),
    //   }).start()

    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [])

  useEffect(() => {
    // -width + width

    reactive.setValue(-width + (width * step) / steps)
  }, [step, width])

  return (
    <View
      onLayout={(e) => {
        const newWidth = e.nativeEvent.layout.width
        setWidth(newWidth)
      }}
      style={{
        height,
        backgroundColor: '#F0F0F0',
        borderRadius: height,
        overflow: 'hidden',
        left: 0,
        top: 0,
      }}
    >
      <Animated.View
        style={{
          height,
          width: '100%',
          borderRadius: height,
          position: 'absolute',
          backgroundColor: '#23231E',
          transform: [{ translateX: animatedValue }],
        }}
      />
    </View>
  )
}

export const NavigationHeader = observer(() => {
  const { screenIndex, viewModel, viewModels } = useCoordinator()
  const { setScreenIndex } = useClaimNavigation()
  const { selectedPhotos, setSelectedPhotos } = usePhotoSelection()

  const onTakePhotoClick = async () => {
    // claim-photo.trackPhotosClickEvent(AnalyticsElementType.Button, TakePhoto)
    const result = await checkCamera()

    if (result) {
      launchCamera(CAMERA_OPTIONS, (response: any) => {
        const files = response?.assets?.map(({ uri }: { uri: string }) => uri)
        if (files) {
          setSelectedPhotos([...selectedPhotos, ...files])
        }
      })
    }
  }

  const onTakeVideoClick = async () => {
    // claim-photo.trackPhotosClickEvent(AnalyticsElementType.Button, TakePhoto)
    const result = await checkVideo()
    if (result) {
      launchCamera(VIDEO_OPTIONS, async (response: any) => {
        const [files] = response?.assets?.map(({ uri }: { uri: string }) => uri)
        if (files) {
          console.log('FILES', files)

          try {
            const videoUrl = await createThumbnail({
              url: files,
              timeStamp: 10000,
            })
            setSelectedPhotos([...selectedPhotos, videoUrl.path])
          } catch (e) {
            console.log('VIDEO URL ERROR', e)
          }
        }
      })
    }
  }
  console.log('viewModel', viewModel)
  const handleBackPress = () => {
    console.log(
      `question Id: ${JSON.stringify(viewModel.backStep)}
      group: ${viewModel?.group}
      screenIndex: ${screenIndex}`
    )
    if (viewModel?.flowStep === 0) {
      return Navigation.navigateToRoute(NavigableRoute.Home)
    }
    if (viewModel.backStep) {
      setScreenIndex(viewModel.backStep)
      Navigation.goBack()
    } else {
      setScreenIndex(screenIndex - 1)
      Navigation.goBack()
    }
  }
  const handleClosePress = () => {
    Navigation.navigateToRoute(NavigableRoute.HomeStack)
  }

  const onLibraryClick = async () => {
    const result = await checkPhotoGallery()

    if (result) {
      launchImageLibrary(LIBRARY_OPTIONS, (response: any) => {
        const files = response?.assets?.map(({ uri }: { uri: string }) => uri)
        if (files) {
          setSelectedPhotos([...selectedPhotos, ...files])
        }
      })
    }
  }
  const navigationBarPropsA: NavigationBarProps = {
    testID: 'claim-people.navigation-bar',
    title: viewModel?.headerTitle?.toUpperCase(),
    textType: viewModel?.textType,
    showShadow: false,
    barItemsTint: 'primary3',
    backgroundColor: 'background1',
    leftItems: [
      {
        pressHandler: handleBackPress,
        textType: 'headline1',
        testID: 'claim-people.done',
        icon: { ...RightArrow, size: { width: 26, height: 26 } },
      },
    ],
    rightItems: [
      {
        pressHandler: handleClosePress,
        textType: 'headline1',
        testID: 'claim-people.done',
        icon: { ...CancelIcon, size: { width: 15, height: 15 } },
      },
    ],
    // rightItems:
    //   screenIndex === 0 || screenIndex >= 5
    //     ? []
    //     : [
    //         {
    //           pressHandler: () => onTakePhotoClick(),
    //           textType: 'headline1',
    //           testID: 'claim-people.done',
    //           icon: { ...CameraClaims, size: { width: 26, height: 26 } },
    //         },
    //         {
    //           pressHandler: () => onTakeVideoClick(),
    //           textType: 'headline1',
    //           testID: 'claim-people.done',
    //           icon: { ...VideoClaims, size: { width: 26, height: 26 } },
    //         },
    //         {
    //           pressHandler: () => onLibraryClick(),
    //           textType: 'headline1',
    //           testID: 'claim-people.done',
    //           icon: { ...LibraryClaims, size: { width: 26, height: 26 } },
    //         },
    //       ],
  }

  const navigationBarPropsB = (index) => {
    return {
      testID: 'claim-people.navigation-bar',
      showShadow: false,
      backgroundColor: 'background1',
      progress: () => {
        return (
          <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: '#fff' }}>
            {index > 0 && <Progress step={index} steps={40} height={4} />}
          </View>
        )
      },
      leftItems: [
        {
          pressHandler: handleBackPress,
          textType: 'headline1',
          testID: 'claim-people.done',
          icon: { ...RightArrow, size: { width: 26, height: 26 } },
        },
      ],
      rightItems: [
        {
          pressHandler: handleClosePress,
          textType: 'headline1',
          testID: 'claim-people.done',
          icon: { ...CancelIcon, size: { width: 15, height: 15 } },
        },
      ],
      barItemsTint: 'primary7',
      //   screenIndex === 0 || screenIndex >= 5
      //     ? []
      //     : [
      //         {
      //           pressHandler: () => Navigation.navigateToRoute(NavigableRoute.MediaController),
      //           textType: 'headline1',
      //           testID: 'claim-people.done',
      //           icon: { ...CameraClaims, size: { width: 26, height: 26 } },
      //         },
      //       ],
    }
  }
  // console.log('screen index', screenIndex)

  return (
    <Flex direction={'column'} grow={1} height={57}>
      {/* <StatusBar hidden /> */}
      {screenIndex === 39 ? (
        <></>
      ) : screenIndex <= 1 ? (
        <NavigationBar {...navigationBarPropsA} />
      ) : (
        <NavigationBar {...navigationBarPropsB(screenIndex)} />
      )}
      <Separator />
    </Flex>
  )
})
