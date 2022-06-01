import styled, { css, keyframes } from 'styled-components'
import { Image, Text, Button, Flex } from '@crosswise/uikit'
import FlexLayout from 'components/Layout/Flex'
import Select from 'components/Select/Select'
import SvgButton from 'components/SvgButton'

export const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`

export const FarmHeader = styled.div`
  /* padding-top: 72px; */
  padding-bottom: 32px;

  max-width: 1400px;
  margin: auto;
  display: flex;
  @media only screen and (min-width: 370px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`

export const FarmHeaderLayout = styled.div`
  padding: 0 24px;
  max-width: 1400px;
  margin: auto;
  position: relative;
`

const expandAnimation = keyframes`
  from {
    max-height: 58px
  }
  to {
    max-height: 500px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 500px;
  }
  to {
    max-height: 58px
  }
`

export const FarmHeadCard = styled.div<{ isDarkTheme: boolean; expanded: boolean; isMobile: boolean }>`
  /* padding: 40px 24px; */
  border-radius: ${({ isMobile }) => (isMobile ? '0 0 25px 25px' : '0 25px 25px 25px')};
  position: relative;
  /* opacity: ${({ theme }) => (theme.isDark ? 0.9 : 1)}; */
  overflow: hidden;
  transition: height 1s;
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards;
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  /* animation: ${({ expanded }) => (expanded ? expandAnimation : collapseAnimation)} 300ms linear forwards; */
  /* ${({ expanded }) => (!expanded ? 'height: 58px;' : 'height: max-content')} */
  ${(props) =>
    props.isDarkTheme &&
    css`
      -webkit-backdrop-filter: blur(40px);
      backdrop-filter: blur(40px);
      box-shadow: 8px 8px 24px 0 rgba(9, 13, 20, 0.4), -4px -4px 8px 0 rgba(224, 224, 255, 0.04),
        0 1px 1px 0 rgba(9, 13, 20, 0.4);
      border: solid 1px rgba(224, 224, 255, 0.24);
      /* background-color: #091713; */
      background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.12) 0%,
          rgba(255, 255, 255, 0.06) 45.83%,
          rgba(255, 255, 255, 0) 100%
        ),
        #25272c;
    `}

  ${(props) =>
    !props.isDarkTheme &&
    css`
      /* box-shadow: 8px 8px 24px 0 rgba(9, 13, 20, 0.06), -4px -4px 8px 0 rgba(255, 255, 255, 0.4), 0 1px 1px 0 rgba(9, 13, 20, 0.06); */
      box-shadow: 1px 4px 44px 1px rgba(0, 0, 0, 0.3);
      background-color: #fff;
      /* background-image: linear-gradient(102deg, #fff, #fafbfc 52%, #f5f7fa 100%); */
    `}
`

export const FarmHeadCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 58px;
  padding: 0 20px;
  border-bottom: 1px solid rgba(196, 196, 196, 0.1);
`

export const GearIcon = styled.div`
  background-image: url('/images/icons/GearIcon.png');
  width: 16px;
  height: 16px;
`

export const StatsIcon = styled(GearIcon)`
  background-image: url('/images/icons/StatsIcon.png');
  margin-right: 5px;
`

export const FarmHeadCardTitle = styled.div`
  display: flex;
  align-items: center;
`

export const TotalStakedValueIcon = styled.div`
  background-image: url('/images/icons/TotalStakedValueIcon.png');
  width: 14px;
  height: 14px;
  /* margin-right: 15px; */
`

export const PendingRewardIcon = styled.div`
  background-image: url('/images/icons/PendingRewardIcon.png');
  width: 14px;
  height: 14px;
  /* margin-right: 15px; */
`

export const FarmHeadCardEarningPanelWrapper = styled(Flex)`
  max-width: 520px;
  width: 50%;
`

export const FarmHeadCardEarningPanel = styled.div`
  position: relative;
  display: grid;
  /* grid-template-columns: auto auto; */
  grid-template-columns: auto;
  /* max-width: 520px; */
  width: 100%;
  border-radius: 6px;
  background: rgba(245, 255, 252, 0.1);
  box-shadow: ${({ theme }) =>
    theme.isDark ? 'inset 0px 1px 9px rgba(0, 0, 0, 0.85)' : 'inset 0px 1px 9px rgba(0, 0, 0, 0.15)'};
  padding: 10px 0 12px 0;
`

export const FarmHeaderCardEarningDivider = styled.div`
  --margin-top: 9px;

  position: absolute;
  margin: var(--margin-top) 0;
  left: 50%;
  height: calc(100% - var(--margin-top) * 2);
  width: 1px;
  background-color: #c4c4c4;
  opacity: 0.1;
`

export const HeadCardOperationPanelWrapper = styled.div<{ isMobile: boolean }>`
  ${({ isMobile }) => !isMobile && 'padding: 0 24px'};
  max-width: 1400px;
  margin: auto;
  margin-top: 30px;
  position: relative;
  /* opacity: ${({ theme }) => (theme.isDark ? 0.9 : 1)}; */
`

export const FarmHeadCardOperationPanel = styled.div`
  border: 1px solid rgba(224, 224, 255, 0.24);
  box-sizing: border-box;
  box-shadow: 1px 4px 44px 1px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  /* height: 176px; */
  width: 100%;
  padding: 20px 20px 25px 23px;
  background: ${({ theme }) =>
    theme.isDark
      ? `linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.12) 0%,
          rgba(255, 255, 255, 0.06) 45.83%,
          rgba(255, 255, 255, 0) 100%
        ),
        #25272c`
      : '#fff'};
`

export const CardViewIcon = styled.div`
  background-image: url('/images/icons/CardViewIcon.png');
  background-size: cover;
  width: 22px;
  height: 22px;
  margin-right: 13px;
  cursor: pointer;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.25;
  }
`

export const ListViewIcon = styled(CardViewIcon)`
  background-image: url('/images/icons/ListViewIcon.png');
`

export const StyledSvgButton = styled(SvgButton)`
  margin-right: 13px;
`

export const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 47px;
  margin-top: 27px;
  margin-bottom: 16px;
  /* box-shadow: inset 0px 1px 9px rgba(0, 0, 0, 0.85); */
  border-radius: 6px;
`

export const SearchInputBox = styled.input`
  background-color: rgba(245, 255, 252, 0.1);
  box-shadow: inset 0px 1px 9px rgba(0, 0, 0, 0.45);
  border-radius: 6px;
  padding-left: 27px;
  /* padding-top: 15px; */
  font-size: 16px;
  line-height: 33px;
  width: 100%;
  height: 100%;
  letter-spacing: 0.035em;
  color: ${({ theme }) => (theme.isDark ? 'rgb(253, 253, 253)' : '#000')};
  outline: none;
  border: none;
  &:focus-visible {
    outline: none;
  }
  &::placeholder {
    color: #787b87;
  }
`

export const SearchIcon = styled.div`
  background-image: url('/images/icons/SearchIcon.png');
  position: absolute;
  top: 17px;
  left: 8px;
  width: 13px;
  height: 13px;
`

export const ActiveFinishButtons = styled(Button)<{ checked?: boolean }>`
  color: white;
  padding: 10px 7px;
  height: 35px;
  font-size: 12px;

  ${({ checked }) =>
    checked &&
    `
    background: linear-gradient(92.63deg, #3F81EF -1.76%, #8750F4 107.38%);
    background-clip: border-box;
    -webkit-text-fill-color: inherit;
  `}/* --borderWidth: 1px;
  --background: ${({ checked }) =>
    checked
      ? 'rgba(245, 255, 252, 0.1)'
      : 'linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 45.83%, rgba(255, 255, 255, 0) 100%), #25272c'};

  background: var(--background);
  height: 25px;
  color: white;
  font-size: 12px;
  line-height: 15px;
  font-weight: 700;
  padding: 0 7px;
  background-clip: padding-box;
  border: solid var(--borderWidth) transparent;
  border-radius: 5px; */
  /* opacity: ${({ checked }) => (checked ? 0.25 : 1)}; */
  /* opacity: 1;
  &:hover {
    box-shadow: none;
    background: var(--background) !important;
  }
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
  } */
`

export const StyledSelect = styled(Select)`
  height: 25px;
  position: relative;
  & > div {
    height: 100%;
    &:first-child {
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
    }
    &:last-child {
      z-index: 1000;
      top: 26px;
      li {
        padding: 0 16px;
      }
    }
  }
`

export const HeaderTopBar = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: ${({ isMobile }) => (isMobile ? 'center' : 'flex-start')};
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
`

export const HeaderInfo = styled.div`
  margin-top: 24px;
  margin-bottom: 38px;
  display: grid;
  grid-gap: 20px;
  justify-content: space-between;
  grid-template-columns: repeat(3, auto);
  backdrop-filter: blur(5px);
`

export const HeaderInfoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`

const HeaderInfoIcon = styled.div`
  width: 38px;
  height: 38px;
  background-color: rgba(245, 255, 252, 0.1);
  background-repeat: no-repeat;
  box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  background-position: center;
`

export const HeaderInfoVolumeIcon = styled(HeaderInfoIcon)`
  background-image: url('/images/icons/VolumeIcon.png');
`

export const HeaderInfoTotalValueLockedIcon = styled(HeaderInfoIcon)`
  background-image: url('/images/icons/TotalValueLockedIcon.png');
`

export const HeaderInfoTotalLiquidityIcon = styled(HeaderInfoIcon)`
  background-image: url('/images/icons/TotalLiquidityIcon.png');
`

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

export const LabelWrapper = styled.div`
  display: flex;
  align-items: baseline;

  > ${Text} {
    font-size: 16px;
    padding-right: 8px;
  }
`

export const LabelNameText = styled(Text)`
  text-transform: uppercase;
  /* color: #bfc8da; */
  color: ${({ theme }) => (theme.isDark ? '#04F8AD' : '#00b8b9')};
`

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

export const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

export const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`

export const Planet1 = styled.div`
  position: absolute;
  z-index: -1;
  top: 35px;
  left: -50px;
`

export const Planet2 = styled.div`
  position: absolute;
  z-index: -1;
  bottom: -150px;
  right: -80px;
`

export const Planet3 = styled.div`
  position: absolute;
  z-index: -1;
`

export const CardWrapper = styled.div`
  display: flex;
`

export const CardItem = styled.div`
  display: flex;
  alignitems: center;
  padding-left: 0px;
`

export const CardItemLock = styled.div`
  display: flex;
  alignitems: center;
  padding-left: 0px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 100px;
  }
`

export const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

export const HarvestBtnGroup = styled.div`
  display: flex;
  alignitems: flex-end;
  justify-content: space-between;
  padding-top: 20px;
  @media only screen and (max-width: 760px) {
    flex-direction: column;
  }
`

export const StakingToggle = styled.div`
  display: flex;
  alignitems: baseline;
  padding: 10px 0px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0px;
  }
`

export const FarmUserInfo = styled.div`
  display: flex;
  width: 400px;
  justify-content: space-between;
  @media only screen and (max-width: 760px) {
    justify-content: space-between;
    width: 100%;
  }
`

export const MassBtns = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 31px;
  margin-bottom: 20px;
  @media only screen and (max-width: 760px) {
    margin-top: 20px;
  }
  @media only screen and (max-width: 568px) {
    font-size: 13px;
    padding: 0px 10px;
    margin-top: 5px;
    flex-direction: column;
  }
  > button {
    box-shadow: none;
    @media only screen and (max-width: 760px) and (min-width: 568px) {
      font-size: 15px;
      padding: 0px 10px;
    }
    @media only screen and (max-width: 568px) {
      font-size: 13px;
      padding: 0px 10px;
      margin-top: 5px;
      margin-right: 0px;
    }
  }
`

export const FarmCardsLayout = styled(FlexLayout)<{ isMobile: boolean }>`
  display: grid;
  grid-template-columns: ${({ isMobile }) => `repeat(auto-fit, min(${isMobile ? '100%' : '420px'}))`};
  /* grid-gap: 50px; */
  row-gap: 50px;
  column-gap: 3px;
  justify-content: ${({ isMobile }) => (isMobile ? 'center' : 'space-between')};
  @media screen and (max-width: 1440px) {
    grid-template-columns: ${({ isMobile }) => `repeat(auto-fit, min(${isMobile ? '100%' : '345px'}))`};
  }
`

export const TabBox = styled.div<{ isMobile: boolean }>`
  /* margin: auto; */
  /* margin-top: 30px;
  height: 51px; */
  ${({ isMobile }) => !isMobile && 'max-width: 320px'};
`
