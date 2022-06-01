import React from 'react'
import styled from 'styled-components'
import { Flex } from '@crosswise/uikit'
import { SectionProps } from '../../../types'

export const BackgroundColorWrapper = styled(Flex)<SectionProps>`
  min-height: calc(100vh - 64px);
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  background: ${({ backgroundStyle }) => backgroundStyle};
  margin: auto;
`

export const ChildrenWrapper = styled(Flex)`
  align-items: center;
  justify-content: center;
`
