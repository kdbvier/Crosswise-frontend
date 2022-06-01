import styled from 'styled-components'
import { Box, Flex, Link, ModalHeader as UIKitModalHeader } from '@crosswise/uikit'
import { IconWallet } from 'components/SvgIcons'

export const Wrapper = styled(Flex)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dropdown};
  border-radius: 16px;
  position: relative;
`

export const Address = styled.div`
  flex: 1;
  position: relative;
  padding-left: 16px;

  & > input {
    background: transparent;
    border: 0;
    color: ${({ theme }) => theme.colors.primaryGray};
    display: block;
    font-weight: 400;
    font-size: 18px;
    padding: 0;
    width: 100%;

    &:focus {
      outline: 0;
    }
  }

  // &:after {
  //   background: linear-gradient(
  //     to right,
  //     ${({ theme }) => theme.colors.background}00,
  //     ${({ theme }) => theme.colors.background}E6
  //   );
  //   content: '';
  //   height: 100%;
  //   pointer-events: none;
  //   position: absolute;
  //   right: 0;
  //   top: 0;
  //   width: 40px;
  // }
`

export const Tooltip = styled.div<{ isTooltipDisplayed: boolean }>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'inline-block' : 'none')};
  position: absolute;
  padding: 8px;
  top: -38px;
  right: 0;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.contrast};
  color: ${({ theme }) => theme.colors.invertedContrast};
  border-radius: 16px;
  opacity: 0.7;
  width: 100px;
`

export const Dot = styled.div`
  background-color: ${({ theme }) => theme.colors.failure};
  border-radius: 50%;
  height: 8px;
  width: 8px;
`

export const TxnIcon = styled(Flex)`
  align-items: center;
  flex: none;
  width: 24px;
`

export const Summary = styled.div`
  flex: 1;
  padding: 0 8px;
`

export const TxnLink = styled(Link)`
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  margin-bottom: 16px;
  width: 100%;

  &:hover {
    text-decoration: none;
  }
`

export const ModalHeader = styled(UIKitModalHeader)`
  background: ${({ theme }) => theme.colors.gradients.gradsecondary};
  padding: 1rem 2rem;
`

export const Tabs = styled.div`
  background-color: ${({ theme }) => theme.colors.dropdown};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 16px 24px;
`
export const WalletModalBody = styled.div`
  padding-top: 24px;
`

export const AddressBox = styled(Flex)`
  position: relative;
  align-items: center;
  border-radius: 6px;
  background: rgba(245, 255, 252, 0.1);
  box-shadow: ${({ theme }) =>
    theme.isDark ? 'inset 0px 1px 9px rgba(0, 0, 0, 0.85)' : 'inset 0px 1px 9px rgba(0, 0, 0, 0.15)'};
`

export const StyledIconWallet = styled(IconWallet)`
  fill: ${({ theme }) => (theme.isDark ? theme.colors.contrast : theme.colors.primaryBright)};
`
