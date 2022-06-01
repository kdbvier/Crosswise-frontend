import styled from 'styled-components'
import { Flex } from '@crosswise/uikit'

export const Wrapper = styled(Flex)<{ marginBottom?: string }>`
  position: relative;
  margin-bottom: ${({ marginBottom }) => marginBottom};
`

export const Spacer = styled.div`
  height: 54px;

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 116px;
  }
`

export const AbsoluteImageWrapper = styled.div`
  z-index: 2;
  position: absolute;
  /* When the absolute image wrapper is used - offset the image slightly to overlap the ribbon */
  bottom: -8px;
`

export const RibbonWrapper = styled(Flex)<{ ribbonDirection?: string }>`
  position: absolute;
  width: 100%;
  z-index: 1;
  left: 50%;
  bottom: ${({ ribbonDirection }) => (ribbonDirection === 'down' ? '-54px' : '-50px')};
  transform: translate(-50%, 0);
`
