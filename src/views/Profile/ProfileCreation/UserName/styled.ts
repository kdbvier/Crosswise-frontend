import styled from 'styled-components'
import { Input as UIKitInput, Flex } from '@crosswise/uikit'

export const InputWrap = styled.div`
  position: relative;
  max-width: 240px;
`

export const Input = styled(UIKitInput)`
  padding-right: 40px;
`

export const Indicator = styled(Flex)`
  align-items: center;
  height: 24px;
  justify-content: center;
  margin-top: -12px;
  position: absolute;
  right: 16px;
  top: 50%;
  width: 24px;
`
