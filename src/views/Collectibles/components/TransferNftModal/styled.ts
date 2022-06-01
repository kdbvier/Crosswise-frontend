import styled from 'styled-components'
import { Text } from '@crosswise/uikit'

export const Value = styled(Text)`
  font-weight: 600;
`

export const ModalContent = styled.div`
  margin-bottom: 16px;
`

export const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
`

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  display: block;
  margin-bottom: 8px;
  margin-top: 24px;
`
