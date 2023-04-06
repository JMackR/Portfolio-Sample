import React, { FC, PropsWithChildren } from 'react'
import { Flex } from '../flex'

export const Center: FC<PropsWithChildren<{}>> = ({ children }) => (
  <Flex direction="row" axisDistribution="center" crossAxisDistribution="center" grow={1}>
    {children}
  </Flex>
)
