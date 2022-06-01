import styled from 'styled-components'
import { IconButton } from '@crosswise/uikit'

export const Container = styled.div`
  margin-left: 8px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 0;
  }
`

export const StyledIconButton = styled(IconButton)`
  margin: 0 8px 0 0;
  padding: 10px 24px;
`
