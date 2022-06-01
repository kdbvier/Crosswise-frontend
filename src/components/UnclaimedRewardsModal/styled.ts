import styled from 'styled-components'
import { Text, Flex, Button } from '@crosswise/uikit'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
`
export const FlexBox = styled(Flex)`
  border-radius: 6px;
  background: ${({ theme }) => (theme.isDark ? 'rgba(245, 255, 252, 0.1)' : '#E8F1FA')};
  box-shadow: ${({ theme }) =>
    theme.isDark ? 'inset 0px 1px 9px rgba(0, 0, 0, 0.85)' : 'inset 0px 1px 9px rgba(0, 0, 0, 0.15)'};
  align-items: center;
  margin: 10px;
  padding: 10px;
`
export const Divider = styled.div`
  background-color: #c4c4c4;
  opacity: 0.1;
  width: 100%;
  height: 1px;
`

export const StyledBtn = styled(Button)`
  width: 100%;
  font-size: 20px;
  margin: 0 20px;
`
export const Common = styled.div`
  margin: 20px;
`
export const StyledSpan = styled.span`
  text-decoration: underline;
  cursor: pointer;
`
