import { Input } from '@crosswise/uikit'
import styled from 'styled-components'

export const StyledInput = styled(Input)`
  border-radius: 5px;
  margin-left: auto;
`

export const InputWrapper = styled.div`
  position: relative;
  box-shadow: inset 0px 1px 9px rgba(0, 0, 0, 0.85);
  border-radius: 6px;
`

export const Container = styled.div<{ toggled: boolean }>``
