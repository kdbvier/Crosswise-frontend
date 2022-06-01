import styled, { keyframes } from 'styled-components'
import { Text, Card, Flex, Tag, Heading, LinkExternal, Button, DropDownBottomIcon } from '@crosswise/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import MultiplierTag from 'components/MultiplierTag'

// fadein keyframe
const fadeInKeyframe = keyframes`
  /* from {
    opacity: 0;
    transform: scale(3);
  }
  to {
    opacity: 1;
    transform: scale(1);
  } */
  from {
    opacity: 0;
    transform: scale(1.3);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: scale(1);
    filter: blur(0px);
  }
`

// Card Actions Container components
export const Action = styled.div`
  /* padding-top: 16px; */
`

export const BalanceContainerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

export const BalanceItem = styled.div<{ alignItems?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${({ alignItems }) => alignItems || 'center'};
  /* ${Text} {
    color: ${({ theme }) => (theme.isDark ? '#FFF' : '#000')};
  } */
`

export const ActionWrapper = styled.div`
  margin: 24px 0;
  padding: 2px;
  border-radius: 4px;
  /* box-shadow: inset 8px 8px 40px 0 rgba(9, 13, 20, 0.4), inset -4px -4px 8px 0 rgba(224, 224, 255, 0.04),
    inset 0 1px 1px 0 rgba(9, 13, 20, 0.4); 
  background-image: ${({ theme }) => theme.colors.gradients.gradthird};*/
`

export const OptionContainer = styled.div`
  display: flex;
  padding: 10px 0px;
  justify-content: space-between;
`

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1px;

  ${Text} {
    margin-left: 1px;
  }
`

// Card heading
export const Wrapper = styled(Flex)`
  position: relative;
  margin-bottom: 20px;
  align-items: center;
  svg {
    margin-right: 4px;
  }
`

export const StyledHeading = styled(Heading)`
  ${({ theme }) =>
    theme.isDark
      ? `
    color: #FFF;
  `
      : `
      background: linear-gradient(270deg, #8c39ff 5.49%, #218bff 100%);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
  `}/* background: linear-gradient(270deg, #8c39ff 5.49%, #218bff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  color: ${({ theme }) => (theme.isDark ? '#FFF' : '#000')}; */
`

export const MultiplierTag123 = styled(Tag)`
  /* position: absolute;
  bottom: 0;
  right: 0;
  color: #7a8596; */
  /* color: ${({ theme }) => theme.colors.text}; */
  color: ${({ theme }) => (theme.isDark ? '#FFf' : '#000')};
  height: 20px;
  padding: 5px;
  border-radius: 15px;

  --borderWidth: 1px;
  --background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0.06) 45.83%,
      rgba(255, 255, 255, 0) 100%
    ),
    #25272c;

  background: var(--background);
  background-clip: padding-box;
  border: solid var(--borderWidth) transparent;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: calc(0px - var(--borderWidth));
    border-radius: inherit;
    background: linear-gradient(90deg, #8c39ff 100%, #21bbff 100%);
  }
`

export const StyledMultiplierTag = styled(MultiplierTag)`
  & > div {
    & > div {
      color: ${({ theme }) => (theme.isDark ? '#FFF' : '#7A8596')};
    }
  }
`

export const LabelNameText = styled(Text)<{ isMobile?: boolean }>`
  margin-bottom: 10px;
  /* text-transform: uppercase; */
  /* color: ${({ theme }) => (theme.isDark ? '#04F8AD' : '#0075FF')}; */
  /* color: ${({ theme }) => (theme.isDark ? '#04F8AD' : '#7A8596')}; */
  /* color: ${({ theme }) => theme.colors.text}; */
  /* ${({ isMobile }) => isMobile && 'font-size: 13px'}; */
  font-size: 13px;
  font-weight: 600;
  line-height: 12px;
  text-align: center;
  display: flex;
  align-items: center;
  position: relative;
  /* letter-spacing: 0.04em; */
`

export const BalanceText = styled(Text)<{ isZero?: boolean; isMobile: boolean }>`
  font-weight: bold;
  /* font-size: 18px; */
  font-size: 16px;
  ${({ theme }) =>
    theme.isDark
      ? `
        color: #fff;
      `
      : `
      background: linear-gradient(270deg, #3f81ef 100%, #8750f4 100%); 
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    `}/* background: linear-gradient(270deg, #8C39FF 5.49%, #218BFF 100%); 
  background-clip: text;
  -webkit-background-clip: text; */
`

export const ToggleNameText = styled(LabelNameText)`
  margin-bottom: 0;
  text-transform: uppercase;
  color: ${({ theme }) => (theme.isDark ? '#fff' : '#060514')};
`

// Farm card components
export const StyledCard = styled(Card)<{ index?: number; isMobile?: boolean }>`
  /* margin: 0 0 32px 0; */
  margin: 0;
  align-self: baseline;
  position: relative;
  box-shadow: 1px 4px 44px 1px rgba(0, 0, 0, 0.3);
  /* max-width: 48%; */
  min-width: ${({ isMobile }) => (isMobile ? '100%' : '420px')};
  border: ${({ theme }) => (theme.isDark ? '1px solid rgba(224, 224, 255, 0.22)' : 'none')};
  border-radius: 23px;
  /* animation: ${fadeInKeyframe} 1s;
  animation-delay: ${({ index }) => `${index * 0.1}s`};
  animation-fill-mode: both; */
  /* transition: opacity ${({ index }) => `${index * 0.5}s`} ease-in; */
  transition: transform 1s;
  /* opacity: 0.9; */
  backdrop-filter: blur(40px);
  /* &:hover {
    transform: scale(1.02);
  } */
  & > div {
    /* opacity: 0.9; */
    backdrop-filter: blur(40px);
  }
  @media screen and (max-width: 1440px) {
    min-width: 345px;
    min-width: ${({ isMobile }) => (isMobile ? '100%' : '345px')};
  }
`

export const FarmCardInnerContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  transition: filter 0.5s;
  position: relative;
`

const Divider = styled.div`
  background: #c4c4c4;
  opacity: 0.1;
`

export const HorizontalDivider = styled(Divider)`
  height: 1px;
  width: calc(100% + 48px);
  margin: 0 -24px 22px -24px;
`

export const VerticalDivider = styled(Divider)`
  width: 1px;
  height: 100%;
`

export const ExpandingWrapper = styled.div`
  padding: 24px;
  border-top: 2px solid ${({ theme }) => theme.colors.cardBorder};
  overflow: hidden;
`

export const DetailWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  overflow: hidden;
  background: transparent;
`

export const DetailToggleButton = styled.div<{ expanded: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 10px;
  right: 24px;
  z-index: 21;
  & > svg {
    transition: all 0.5s;
    transform: ${({ expanded }) => (expanded ? 'rotate(180)' : 'rotate(0)')};
  }
`

export const StakeActionWrapper = styled(Flex)`
  width: 40%;
`

/* export const StyledIconButton = styled(IconButton)` */
export const StyledIconButton = styled.div`
  line-height: 0;
  margin: 0;
  width: 24px;
  height: 24px;
  display: contents;
  position: absolute;
  left: 10px;
  /* & > div {
    margin-left: 10px;
    margin-top: 5px;
  } */
`

export const CalculatorIcon = styled.div`
  background: url('/images/icons/calculator.png');
  width: 18px;
  height: 18px;
  background-size: 100% 100%;
`

export const StyledActionButton = styled(Button)`
  box-shadow: none;
  background: linear-gradient(90deg, #04f8ad 0%, #3f81ef 50.52%, #5100b9 100%);
  margin-top: 10px;
`

export const StyledConnectWalletButton = styled(ConnectWalletButton)`
  background: linear-gradient(90deg, #04f8ad 0%, #3f81ef 50.52%, #5100b9 100%);
  border-radius: 6px;
`

// Earning Panel
export const EarningsWrapper = styled.div`
  margin: 27px 0 20px 0;
  background: ${({ theme }) => (theme.isDark ? 'rgba(245, 255, 252, 0.1)' : '#e8f1fa')};
  box-shadow: ${({ theme }) =>
    theme.isDark ? 'inset 0px 1px 9px rgba(0, 0, 0, 0.85)' : 'inset 0px 1px 9px rgba(0, 0, 0, 0.15)'};
  border-radius: 6px;
  padding: 17px 10px 20px 10px;
  width: 100%;
  display: grid;
  /* grid-template-columns: auto auto auto; */
  grid-template-columns: auto;
  justify-content: space-around;
  grid-gap: 15px;
`

// Details section components
export const DetailsContentWrapper = styled.div`
  /* margin-top: 24px; */
  padding: 32px 24px;
  opacity: 0;
  width: 80%;
  transform: scale(0.5);
  transform: translateY(-200%);
  transition: opacity 0.2s, transform 0.8s;
  border-radius: 12px;
  z-index: 20;
`

export const DetailIcon = styled.div`
  position: absolute;
  right: 62px;
  top: 62px;
  color: white;
  opacity: 1;
  background: url('/images/icons/GearIcon.png');
  width: 17px;
  height: 17px;
  transition: opacity 0.5s;
`

export const DropDownIcon = styled(DropDownBottomIcon)`
  position: absolute;
  right: 65px;
  top: 65px;
  color: white;
  opacity: 1;
  width: 25px;
  height: 25px;
  transition: opacity 0.5s;
  cursor: pointer;
`

export const DetailSectionWrapper = styled.div<{ expanded: boolean }>`
  --opacity: 0.8;
  /* background: ${({ theme }) => theme.colors.backgroundAlt}; */
  /* background: rgba(245, 255, 252, 0.1); */
  width: 100px;
  height: 100px;
  position: absolute;
  top: -50px;
  right: -50px;
  border-radius: 0px 0px 200px 200px;
  transition: all 0.5s, opacity: 0.2s, border-radius 2s, top 1s;
  /* overflow: hidden; */
  overflow: visible;
  opacity: var(--opacity);
  z-index: 10;

  ${({ expanded }) =>
    expanded &&
    `
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 45.83%, rgba(255, 255, 255, 0) 100%), #25272C;
    width: 80%;
    right: 0;
    top: 0;
    border-radius: 12px;
    height: 100%;
    opacity: var(--opacity);
    ${DetailsContentWrapper} {
      opacity: 1;
      transform: scale(1);
      transform: translateY(0);
    }

    ${DetailIcon} {
      opacity: 0;
    }

    ${DropDownIcon} {
      opacity: 0;
    }

    &~${FarmCardInnerContainer} {
      filter: blur(5px);
    }
  `}
    
`

export const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
  margin: 20px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* color: ${({ theme }) => (theme.isDark ? '#04F8AD' : '#0075FF')}; */
  color: ${({ theme }) => theme.colors.text};

  > svg {
    /* fill: ${({ theme }) => (theme.isDark ? '#04F8AD' : '#0075FF')}; */
    fill: #218bff;
  }
`
