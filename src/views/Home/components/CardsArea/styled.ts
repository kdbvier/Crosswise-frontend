import styled from 'styled-components'
import { Text, Button, Flex } from '@crosswise/uikit'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
  justify-content: space-between;
  width: 100%;
  padding: 20px 0;
`
export const SubColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin-top: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 48%;
    margin-top: 0;
  }
`
export const TokenPairWrapper = styled.div`
  padding: 2px;
  width: 34px;
  margin-left: 20px;
`
export const StyledTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
`
export const CardContent = styled.div<{ collapse: boolean }>`
  width: 100%;
  height: ${({ collapse }) => (collapse ? '100%' : '0')};
  overflow: hidden;
  background: rgba(245, 255, 252, 0.1);
  box-shadow: inset 1px 1px 11px 2px rgba(0, 0, 0, 0.56);
  border-radius: 6px;
  padding: ${({ collapse }) => (collapse ? '30px' : '0')};
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease-out;
`

export const StyledText = styled(Text)`
  margin-bottom: 10px;
`
export const StyledButton = styled(Button)`
  height: 35px;
  font-size: 12px;
`
export const IconButton = styled.div`
  cursor: pointer;
  display: flex;
`
export const StyledFlex = styled(Flex)`
  @media screen and (max-width: 576px) {
    text-align: center;
    a {
      width: 100%;
    }
    button {
      width: 100%;
      height: 47px;
    }
  }
`
