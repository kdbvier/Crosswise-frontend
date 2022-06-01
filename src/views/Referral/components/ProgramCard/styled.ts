import styled from 'styled-components'
import { Card, Text } from '@crosswise/uikit'

export const StyledProgramCard = styled(Card)``

export const Block = styled.div`
  margin-bottom: 16px;
  width: 100%;
`

export const Label = styled(Text)`
  opacity: 0.6;
  margin-bottom: 24px;
`

export const LinkLabel = styled(Text)`
  line-height: 1.5;
  padding: 0.75rem 1rem 0.75rem 1rem;
  width: 100%;
`

export const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
`

export const InputRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: '0.75rem 0.5rem 0.75rem 1rem';
`

export const Container = styled.div`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
`
