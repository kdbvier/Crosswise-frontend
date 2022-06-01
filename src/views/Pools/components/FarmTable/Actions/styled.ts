import styled, { keyframes, css } from 'styled-components'
import { LinkExternal, Text, Button, Skeleton } from '@crosswise/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'

export const ActionContainer = styled.div`
  /* min-width: 270px; */
  /* padding: 16px; */
  // border: 2px solid ${({ theme }) => theme.colors.input};
  // border-radius: 16px;
  flex-grow: 1;
  flex-basis: 0;
  /* margin-bottom: 16px; */
  /* margin-left: 12px; */

  /* border: 2px solid ${({ theme }) => theme.colors.input}; */
  /* box-shadow: inset 1px 1px 18px 0px ${({ theme }) => theme.colors.background}; */
  /* border-radius: 20px; */
  /* height: 100px; */

  /* ${({ theme }) => theme.mediaQueries.sm} {
    margin-right: 12px;
    margin-bottom: 0;
    // max-height: 100px;
    height: 100%;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    display: flex;
    justify-content: space-between;
    margin-right: 0;
    margin-bottom: 0;
    max-height: 100px;
  } */
`

export const ActionTitles = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-bottom: 0;
  }
`

export const ActionContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const ActionTitlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 180px;
  margin-right: 10px;
  ${({ theme }) => theme.mediaQueries.xl} {
    height: 100%;
  }
`

export const ActionTitleContent = styled.div`
  /* max-width: 50%; */
  display: flex;
  justify-content: space-between;
  /* margin: 10px 0; */
`

export const IconButtonWrapper = styled.div`
  display: flex;
`

// Action panel
export const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 500px;
  }
`

export const collapseAnimation = keyframes`
  from {
    max-height: 500px;
  }
  to {
    max-height: 0px;
  }
`

export const ColumnWrap = styled.div`
  /* background: ${({ theme }) => theme.colors.tertiary}; */
  /* border-bottom: 2px solid ${({ theme }) => theme.colors.cardBorder}; */
  /* display: flex;
  flex-direction: column; */
`

export const Container = styled.div<{ expanded }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear both
        `
      : css`
          ${collapseAnimation} 300ms linear both
        `};
  overflow: hidden;
  // background: ${({ theme }) => theme.colors.background};
  // border-bottom: 2px solid ${({ theme }) => theme.colors.cardBorder};
  display: ${({ expanded }) => (expanded ? 'flex' : 'none')};
  justify-content: space-between;

  width: 100%;
  align-items: center;
  /* flex-direction: column-reverse; */
  padding: ${({ expanded }) => (expanded ? '24px' : '0px 24px')};
  transition: padding 300ms;

  ${({ theme }) => theme.mediaQueries.lg} {
    /* flex-direction: row; */
    padding: ${({ expanded }) => (expanded ? '16px 32px' : '0px 32px')};
  }
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

export const StakeContainer = styled.div`
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
  }
`

export const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 16px;
  }

  > div {
    height: 24px;
    padding: 0 6px;
    font-size: 14px;
    margin-right: 4px;

    svg {
      width: 14px;
    }
  }
`

export const ActionPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  & > *:first-child {
    margin-bottom: 10px;
  }

  /* width: 100%; */

  /* ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
    width: unset;
  } */
`

export const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const InfoContainer = styled.div`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 12px;
  width: 50%;

  ${({ theme }) => theme.mediaQueries.xl} {
    width: unset;
  }
`

export const OptionContainer = styled.div`
  display: flex;
  padding: 10px;
  justify-content: flex-end;
  margin-right: 22px;
  width: 100%;
  /* ${({ theme }) => theme.mediaQueries.xl} {
    width: 200px;
  } */
`

export const ToggleWrapper = styled.div`
  /* width: 100%; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* margin: 5px 0; */
  margin-left: 36px;
  ${Text} {
    margin-left: 8px;
  }
`

export const ValueContainer = styled.div`
  display: block;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 12px;
    width: 50%;
  }
`

export const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0px;
`

export const EarnPanel = styled.div`
  position: relative;
  display: grid;
  /* grid-template-columns: auto auto; */
  grid-template-columns: auto;
  width: 520px;
  border-radius: 6px;
  background: rgba(245, 255, 252, 0.1);
  box-shadow: ${({ theme }) =>
    theme.isDark ? 'inset 0px 1px 9px rgba(0, 0, 0, 0.85)' : 'inset 0px 1px 9px rgba(0, 0, 0, 0.15)'};
  padding: 10px 0 12px 0;
`

export const EarnPanelDivider = styled.div`
  --margin-top: 9px;

  position: absolute;
  margin: var(--margin-top) 0;
  left: 50%;
  height: calc(100% - var(--margin-top) * 2);
  width: 1px;
  background-color: #c4c4c4;
  opacity: 0.1;
`

export const ActionButton = styled(Button)<{ width: string }>`
  height: 35px;
  width: ${({ width }) => width ?? '152px'};
  border-radius: 6px;
  /* margin-left: 10px; */
  background: linear-gradient(92.63deg, #3f81ef -1.76%, #8750f4 107.38%);
`

export const StyledConnectWalletButton = styled(ConnectWalletButton)`
  height: 35px;
  width: 152px;
  border-radius: 6px;
  background: linear-gradient(92.63deg, #3f81ef -1.76%, #8750f4 107.38%);
`

export const StyledSkeleton = styled(Skeleton)`
  width: 100%;
`
