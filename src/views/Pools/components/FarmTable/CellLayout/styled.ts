import styled from 'styled-components'
import { StyledIconButton } from '../../FarmCard/styled'

export const Label = styled.div<{ textAlign: string }>`
  /* font-size: 16px; */
  font-size: 13px;
  color: ${({ theme }) => (theme.isDark ? '#bfc8da' : '#818ea3')};
  text-align: ${({ textAlign }) => textAlign};
  margin-bottom: 10px;
`

export const ContentContainer = styled.div`
  min-height: 24px;
  display: flex;
  align-items: center;
  ${StyledIconButton} {
    & > div {
      margin-top: -60px;
      margin-left: 0;
    }
  }
`
