import styled from 'styled-components'
import { Flex, Card } from '@crosswise/uikit'

export const SwapRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`

export const Wrapper = styled(Flex)`
  padding: 30px;
  width: 100%;
  height: 100%;
  min-height: 480px;
`
