import React, { FC } from 'react'
import { SampleLogoOutline } from '@sample/assets'
import { SVG, Text, ViewBlock } from '@sample/basic-controls'
import { Separator, Stack } from '@sample/layout-controls'
import { useColor, useColorForBackgroundColor, useMargin } from '@sample/themes'
import { MediaName, MediaQuery } from '@sample/utilities'
import { StyleSheet, css } from 'aphrodite/no-important'
import { Link } from 'react-router-dom'
import { Container } from '../container'

const CONTAINER_MARGIN_TOP = 4
const CONTAINER_MARGIN_BOTTOM = 6
const CONTAINER_MARGIN_LEFT_RIGHT = 4
const CONTAINER_MARGIN_LEFT_RIGHT_TABLET = 6
const CONTAINER_MARGIN_LEFT_RIGHT_DESKTOP = 12

export const Footer: FC = () => {
  const { colors } = useColor()
  const { baseMargin } = useMargin()
  const STYLES = StyleSheet.create({
    container: {
      backgroundColor: useColorForBackgroundColor('background2'),
      paddingTop: CONTAINER_MARGIN_TOP * baseMargin,
      paddingBottom: CONTAINER_MARGIN_BOTTOM * baseMargin,
      paddingLeft: CONTAINER_MARGIN_LEFT_RIGHT * baseMargin,
      paddingRight: CONTAINER_MARGIN_LEFT_RIGHT * baseMargin,
      [MediaQuery[MediaName.Tablet]]: {
        paddingLeft: CONTAINER_MARGIN_LEFT_RIGHT_TABLET * baseMargin,
        paddingRight: CONTAINER_MARGIN_LEFT_RIGHT_TABLET * baseMargin,
      },
      [MediaQuery[MediaName.Desktop]]: {
        paddingLeft: CONTAINER_MARGIN_LEFT_RIGHT_DESKTOP * baseMargin,
        paddingRight: CONTAINER_MARGIN_LEFT_RIGHT_DESKTOP * baseMargin,
      },
      flex: '0 0 auto',
    },
    link: {
      textDecoration: 'none',
      whiteSpace: 'nowrap',
    },
  })

  return (
    <ViewBlock className={css(STYLES.container)}>
      <Container>
        <Stack direction={'column'} childSeparationStep={5}>
          <Stack direction={'row'} childSeparationStep={6} wrap={'wrap'} axisDistribution={'center'}>
            <Stack direction={'column'} grow={1} crossAxisDistribution={'flex-start'} childSeparationStep={6}>
              <SVG localSVG={SampleLogoOutline} tint={'white100'} />
              <Text text={'Getting there together'} color={'primary4'} textType={'primary4'} />
            </Stack>
            <Stack direction={'column'} childSeparationStep={2}>
              <Text text={'Company'} color={'primary4'} textType={'primary4'} />
              <Link to={'/our-story'} className={css(STYLES.link)}>
                <Text text={'Our Story'} color={'primary4'} textType={'secondary4'} />
              </Link>
              <Link to={'/product'} className={css(STYLES.link)}>
                <Text text={'Product'} color={'primary4'} textType={'secondary4'} />
              </Link>
              <Link to={'/careers'} className={css(STYLES.link)}>
                <Text text={'Careers'} color={'primary4'} textType={'secondary4'} />
              </Link>
            </Stack>
            <Stack direction={'column'} childSeparationStep={2}>
              <Text text={'Resources'} color={'primary4'} textType={'primary4'} />
              <Link to={'/blog'} className={css(STYLES.link)}>
                <Text text={'Blog'} color={'primary4'} textType={'secondary4'} />
              </Link>
              <Link to={'/contact'} className={css(STYLES.link)}>
                <Text text={'Contact Us'} color={'primary4'} textType={'secondary4'} />
              </Link>
              <Link to={'/measurewhatmatters'} className={css(STYLES.link)}>
                <Text text={'Credit Calculator'} color={'primary4'} textType={'secondary4'} />
              </Link>
              <Link to={'/samplenavigator'} className={css(STYLES.link)}>
                <Text text={'LOOP Navigator'} color={'primary4'} textType={'secondary4'} />
              </Link>
            </Stack>
            <Stack direction={'column'} childSeparationStep={2}>
              <Text text={'Follow Us'} color={'primary4'} textType={'primary4'} />
              <a
                href={'https://www.facebook.com/ridewithsample8'}
                target={'_blank'}
                className={css(STYLES.link)}
                rel={'noreferrer'}
              >
                <Text text={'Facebook'} color={'primary4'} textType={'secondary4'} />
              </a>
              <a
                href={'https://www.instagram.com/_ridewithsample/'}
                target={'_blank'}
                className={css(STYLES.link)}
                rel={'noreferrer'}
              >
                <Text text={'Instagram'} color={'primary4'} textType={'secondary4'} />
              </a>
              <a href={'https://twitter.com/ridewithsample'} target={'_blank'} className={css(STYLES.link)} rel={'noreferrer'}>
                <Text text={'Twitter'} color={'primary4'} textType={'secondary4'} />
              </a>
              <a
                href={'https://www.linkedin.com/company/sampleinsurance/'}
                target={'_blank'}
                className={css(STYLES.link)}
                rel={'noreferrer'}
              >
                <Text text={'LinkedIn'} color={'primary4'} textType={'secondary4'} />
              </a>
              <a
                href={'https://discord.com/invite/jXqmZDThFD'}
                target={'_blank'}
                className={css(STYLES.link)}
                rel={'noreferrer'}
              >
                <Text text={'Discord'} color={'primary4'} textType={'secondary4'} />
              </a>
            </Stack>
          </Stack>
          <Separator />
          <Stack
            direction={'row'}
            childSeparationStep={1}
            axisDistribution={'space-between'}
            crossAxisDistribution={'center'}
          >
            <Text
              text={`© ${new Date().getFullYear()} LOOP. Made with ♥ from around the world.`}
              color={'primary4'}
              textType={'secondary4'}
            />
            <Stack direction={'row'} childSeparationStep={6}>
              <Link to={'/terms/'} className={css(STYLES.link)}>
                <Text text={'Term of Service'} color={'primary4'} textType={'secondary4'} />
              </Link>
              <Link to={'/privacy/'} className={css(STYLES.link)}>
                <Text text={'Privacy Policy'} color={'primary4'} textType={'secondary4'} />
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </ViewBlock>
  )
}
