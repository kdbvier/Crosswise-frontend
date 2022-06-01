import styled, { css, keyframes } from 'styled-components'
import { Text, DropDownBottomIcon, LinkExternal, Button, Flex, Toggle } from '@crosswise/uikit'
import { ChevronDownIcon as ChevronDown } from '../ExpandButton'

// fadein keyframe
const fadeInKeyframe = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const CellInner = styled.div<{ alignItems?: string }>`
  /* padding: 24px 0px; */
  display: flex;
  /* width: 100%; */
  align-items: ${({ alignItems }) => alignItems || 'center'};
  /* padding-right: 8px; */

  ${({ theme }) => theme.mediaQueries.xl} {
    /* padding-right: 32px; */
  }
`

export const StyledTr = styled.div<{ index: number }>`
  cursor: pointer;
  /* opacity: 0;
  animation: ${fadeInKeyframe} 2s;
  animation-delay: ${({ index }) => `${index * 0.1}s`};
  animation-fill-mode: forwards; */
  transition: transform 1s;
  /* border-bottom: 2px solid ${({ theme }) => theme.colors.cardBorder}; */
  /* padding: 25px 20px; */
  margin-bottom: 15px;

  background: ${({ theme }) =>
    theme.isDark
      ? 'linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 45.83%, rgba(255, 255, 255, 0) 100%), #25272C;'
      : '#FFF'};
  border: ${({ theme }) => (theme.isDark ? '1px solid rgba(224, 224, 255, 0.22)' : 'none')};

  -webkit-backdrop-filter: blur(40px);
  backdrop-filter: blur(40px);
  box-shadow: 1px 4px 44px rgba(0, 0, 0, 0.3);
  border-radius: 20px;

  &:hover {
    /* transform: scale(1.02); */
  }
`

export const EarnedMobileCell = styled.td`
  padding: 16px 0 24px 16px;
`

export const AprMobileCell = styled.td`
  padding-top: 16px;
  padding-bottom: 24px;
`

export const FarmMobileCell = styled.td`
  padding-top: 24px;
`

export const DepositFeeMobileCell = styled.td`
  padding-top: 16px;
  padding-bottom: 24px;
`

export const RowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 20px;
`

export const GearIcon = styled.div`
  background-image: url('/images/icons/GearIcon.png');
  background-size: cover;
  width: 21px;
  height: 21px;
`

export const TokenWrapper = styled.div`
  padding-right: 8px;
  width: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 56px;
  }
`

export const RowBody = styled.div<{ columnsTemplate?: string; alignItems?: string }>`
  /* display: flex; */
  display: grid;
  grid-template-columns: ${({ columnsTemplate }) => columnsTemplate ?? '1fr 1fr 1fr'};
  grid-column-gap: 50px;
  justify-content: space-between;
  align-items: ${({ alignItems }) => alignItems ?? 'flex-start'};
  padding: 19px 25px;
  border-top: 1px solid rgba(196, 196, 196, 0.1);
  border-bottom: 1px solid rgba(196, 196, 196, 0.1);
`

export const EarningRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto auto;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`

export const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
  width: 100%;
  display: flex;
  font-size: 13px;
  /* justify-content: space-between; */
  color: ${({ theme }) => (theme.isDark ? '#fff' : '#060514')};
  svg {
    fill: #218bff;
    margin-left: 10px;
  }
`

export const ActionButton = styled(Button)<{ width: string }>`
  height: 40px;
  width: ${({ width }) => width ?? '152px'};
  border-radius: 6px;
  /* margin-left: 10px; */
  background: linear-gradient(92.63deg, #3f81ef -1.76%, #8750f4 107.38%);
`

export const NextUnlockPanel = styled(Flex)`
  background: rgba(245, 255, 252, 0.1);
  box-shadow: inset 0px 1px 9px rgba(0, 0, 0, 0.85);
  border-radius: 6px;
  width: 152px;
  height: 40px;
  /* padding: 5px; */
`

export const StyledSettingIcon = styled.div`
  background: url('/images/icons/GearFrameIcon.png');
  background-size: cover;
  width: 20px;
  height: 20px;
`

export const ChevronDownIcon = styled(ChevronDown)`
  margin-left: 10px;
`

export const ChevronUpIcon = styled(ChevronDownIcon)`
  transform: rotate(180deg);
`

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 10px; */
  justify-content: flex-end;
  margin-right: 22px;
  /* width: 100%; */
  /* ${({ theme }) => theme.mediaQueries.xl} {
    width: 200px;
  } */
`

export const ToggleWrapper = styled.div`
  /* width: 100%; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 12px;
  /* margin: 5px 0; */
  margin-left: 36px;
  ${Text} {
    margin-left: 8px;
  }
  &:last-child {
    margin-bottom: 0;
  }
`

export const StyledToggle = styled(Toggle)`
  width: 45px;
  & > span {
    top: 6px;
  }
`

export const CrossedText = styled.span<{ checked: boolean }>`
  text-decoration: line-through;
  font-size: 12px;
  color: ${({ checked }) => (checked ? '#04F8AD' : '#be3f50')};
`

export const DropDownIcon = styled(DropDownBottomIcon)`
  position: absolute;
  right: 15px;
  top: 21px;
  cursor: pointer;
`

const expandAnimation = keyframes`
  from {
    max-height: 0px
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
    max-height: 0px
  }
`

export const VestingListTable = styled.div<{ expanded: boolean }>`
  color: ${({ theme }) => (theme.isDark ? '#fff' : '#060514')};
  padding: 0 25px;
  width: 100%;
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 500ms linear forwards;
        `
      : css`
          ${collapseAnimation} 500ms linear forwards
        `};
`

export const VestingListTableRow = styled.div<{ border?: string }>`
  display: grid;
  /* grid-template-columns: 1fr 1fr 1fr 1fr 1fr; */
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 16px 0;
`

export const VestingListTableCell = styled.div<{ textAlign?: string; color?: string }>`
  text-align: ${({ textAlign }) => textAlign ?? 'center'};
  ${({ color }) => color && `color: ${color};`}
`

export const VestingListTableHeaderCell = styled(VestingListTableCell)`
  font-weight: bold;
`
