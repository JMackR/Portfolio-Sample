import React, { FC, useState } from 'react'
import { Touchable, Text, Circle } from '@sample/basic-controls'
import { Flex, Margin, BackgroundContainer, Border, Spacer } from '@sample/layout-controls'
import { useMargin } from '@sample/themes'
import _ from 'lodash'
import { SegmentedControlProps } from './segmented-control.d'

const TRANSITION_DELAY = 200
const PERCENT = 100
const MAX_TAB_WIDTH = 400
export const SegmentedControl: FC<SegmentedControlProps> = ({ tabs, onSelect, selectedIndex }) => {
  const [selected, setSelected] = useState<number>(selectedIndex || 0)

  const { baseMargin } = useMargin()
  const selectHandler = (index: number) => () => {
    onSelect && onSelect(index)
    if (selectedIndex === undefined) {
      setSelected(index)
    }
  }

  const currentlySelected = selectedIndex !== undefined ? selectedIndex : selected
  return (
    <Flex direction={'column'} height={'100%'} grow={1} overflow={'hidden'}>
      <Flex direction={'row'} grow={0} maxWidth={MAX_TAB_WIDTH}>
        {tabs.map((props, index) => (
          <Flex direction={'column'} grow={1} basis={'0%'} key={`${index}`}>
            <Touchable onPress={selectHandler(index)}>
              <Margin direction={'column'} crossAxisDistribution={'center'} axisDistribution={'center'} marginStep={4}>
                <Text color={currentlySelected === index ? 'primary1' : 'primary4'}>{props.title}</Text>
                <Spacer direction={'row'} sizeStep={2} />
                {props.showGleam === true && <Circle size={baseMargin * 2} color={'error3'} />}
              </Margin>
              <Margin
                direction={'column'}
                crossAxisDistribution={'center'}
                axisDistribution={'center'}
                marginStep={0}
                marginLeftStep={1}
                marginRightStep={1}
                height={baseMargin}
              >
                <Border
                  direction={'column'}
                  height={baseMargin}
                  width={'100%'}
                  grow={1}
                  cornerRadius={'small'}
                  lineWeight={'none'}
                >
                  <BackgroundContainer type={currentlySelected === index ? 'background2' : 'background1'} />
                </Border>
              </Margin>
            </Touchable>
          </Flex>
        ))}
      </Flex>
      <Spacer direction={'column'} sizeStep={4} />
      <Flex direction={'row'} width={'100%'} grow={1} overflow={'scroll'}>
        <div
          style={{
            display: 'flex',
            position: 'relative',
            width: `100%`,
            overflow: 'visible',
            transform: `translateX(${-1 * PERCENT * selected}%)`,
            transition: `all ${TRANSITION_DELAY}ms`,
          }}
        >
          {tabs.map(({ tabContent, key }, index) => (
            <div key={key || `${index}`} style={{ display: 'flex', flex: `1 0 100%` }}>
              {tabContent}
            </div>
          ))}
        </div>
      </Flex>
    </Flex>
  )
}
