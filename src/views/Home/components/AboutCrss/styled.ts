import styled from 'styled-components'
import { Button, Text, Flex } from '@crosswise/uikit'

export const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.homeCardBackground};
  border-radius: 23px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 30px;
  align-items: center;
  box-shadow: 1px 4px 44px 1px #0000004d;
  border: 1px solid #e0e0ff3d;
  flex-wrap: wrap;
  @media screen and (max-width: 852px) {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 10px;
  }
`
export const SubColumn = styled.div<{ span?: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 852px) {
    ${({ span }) =>
      span &&
      `
      grid-column: 1 / span ${span};
    `}
  }
`
export const StyledButton = styled(Button)`
  margin: 10px;
  height: 35px;
  font-size: 12px;
`
export const StyledTitle = styled(Text)`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.homeTitle};
`
export const StyledValue = styled(Text)`
  font-size: 17px;
  font-weight: 400;
  line-height: 29px;
  margin-top: 10px;
`
export const SubColumnTitle = styled(SubColumn)`
  @media screen and (max-width: 852px) {
    grid-column: 1 / span 3;
    height: 50%;
  }
`
export const StyledFlex = styled(Flex)`
  @media screen and (max-width: 852px) {
    grid-column: 1 / span 3;
    a {
      width: 100%;
    }
    button {
      width: 100%;
      margin: 20px 0;
      height: 47px;
    }
  }
`
export const MobileRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
