import styled from 'styled-components'
import { ChevronDownIcon } from '@crosswise/uikit'

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-right: 8px;
  color: ${({ theme }) => theme.colors.textSecondary};

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 0px;
  }
`

export const ArrowIcon = styled(ChevronDownIcon)<{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(180)' : 'rotate(0)')};
  height: 20px;
`
