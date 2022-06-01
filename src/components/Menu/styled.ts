import styled from 'styled-components'
import { Flex } from '@crosswise/uikit'

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: space-between;
    flex-direction: row;
  }
`

export const BubbleWrapper = styled(Flex)`
  svg {
    fill: ${({ theme }) => theme.colors.textSubtle};
    transition: background-color 0.2s, opacity 0.2s;
  }
  &:hover {
    svg {
      opacity: 0.65;
    }
  }
  &:active {
    svg {
      opacity: 0.85;
    }
  }
`

export const StyledNav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 600px) {
    flex-direction: row;
  }

  a {
    height: 48px;
    padding: 10px 24px;
    border-radius: 6px;
    margin-left: 8px;
  }
`

export const HeadLine = styled.div`
  font-family: Montserrat;
  font-weight: 800;
  font-size: 57px;
  line-height: 69px;
  height: 69px;
  letter-spacing: -0.01em;

  @media (max-width: 600px) {
    text-align: center;
  }
`

export const SubHeadLine = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  height: 24px;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 600px) {
    text-align: center;
  }
`

export const ButtonGrp = styled.div`
  @media (max-width: 600px) {
    margin-top: 15px;
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
`
