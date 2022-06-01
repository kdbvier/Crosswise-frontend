import styled from 'styled-components'
import { Flex, Button, Dropdown } from '@crosswise/uikit'

export const Container = styled(Flex)`
  height: 414px;
  width: 100%;
`

export const ChartHeader = styled(Flex)`
  margin-bottom: 20px;
`

export const TokenPairWrapper = styled.div`
  padding: 2px;
  width: 40px;
  margin-left: 20px;
`

export const StyledButton = styled(Button)`
  width: 80.84px;
  height: 35px;
  background: ${({ theme }) => theme.colors.homeCardBackground};
`

export const StyledDropdown = styled(Dropdown)`
  background: ${({ theme }) => theme.colors.homeCardBackground};
`
