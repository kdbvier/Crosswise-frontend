import { Box } from '@crosswise/uikit'
import styled from 'styled-components'

export const Filter = styled.label`
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  margin-right: 16px;
`

export const StyledHeader = styled(Box)`
  background: ${({ theme }) => theme.colors.gradients.bubblegum};
  flex: none;
  padding: 16px;
`

export const ButtonMenuContainer = styled.div`
  width: 100%;
  & > div {
    width: 100%;
  }

  & button {
    width: 100%;
  }
`
