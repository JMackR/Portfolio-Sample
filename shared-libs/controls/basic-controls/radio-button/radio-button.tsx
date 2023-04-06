import React from 'react'
import { Flex, Margin } from '@sample/layout-controls'
import { Checkbox, Text } from '@sample/basic-controls'
import styled from 'styled-components'
import { useBorder, useColorForBackgroundColor, useColorForTextColor } from '@sample/themes'

const RadioButtonStyled = styled.button`
  background-color: ${(props) =>
    props.theme.selected ? useColorForBackgroundColor('highlight1') : useColorForBackgroundColor('background1')};
  padding: 16px;
  border: ${(props) => (props.theme.selected ? '1px solid transparent' : `1px solid ${useColorForTextColor('primary7')}`)};
  text-align: start;
  border-radius: ${(props) => props.theme.borderRadius}px;
  cursor: pointer;

  &:hover {
    background-color: ${() => useColorForBackgroundColor('highlight2')};
  }
`

export interface RadioButtonProps {
  selected: boolean
  text: string
  onClick: () => void
}

export const RadioButton = ({ selected, text, onClick }: RadioButtonProps) => {
  const { baseBorder } = useBorder()

  return (
    <RadioButtonStyled
      theme={{
        borderRadius: baseBorder.cornerRadius.small,
        selected: selected,
      }}
      onClick={onClick}
    >
      <Flex crossAxisDistribution={'center'}>
        <Checkbox
          checked={selected}
          onChange={() => {}}
          checkedBackgroundColor={'background2'}
          circle={true}
          borderColor={useColorForTextColor('primary7')}
        />
        <Margin marginLeftStep={2}>
          <Text text={text} textType={'primary3'} color={'primary3'} />
        </Margin>
      </Flex>
    </RadioButtonStyled>
  )
}
