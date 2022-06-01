import styled, { keyframes, css } from 'styled-components'
// import useTheme from 'hooks/useTheme'
import Page from 'components/Layout/Page'
import { BaseLayout, Text, Heading, DropDownBottomIcon, CheckmarkIcon } from '@crosswise/uikit'
import { IconCopy } from 'components/SvgIcons'

export const StyledPage = styled(Page)`
  /* background-image: url('/images/home/planets/planet-pluto.png'), url('/images/home/planets/planet-7.png');
  background-repeat: no-repeat;
  background-position: bottom center, top 120px right;
  background-size: 360px, 200px; */
  overflow: show;
`

export const CardsRow = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;
  margin-top: 32px;
  width: 100%;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

export const Label = styled(Text)`
  /* opacity: 0.6; */
  color: ${({ theme }) => (theme.isDark ? '#FFF' : '#000')};
  font-size: 20px;
  @media (max-width: 600px) {
    font-size: 16px;
    text-align: center;
  }
`

export const StyledCenter = styled.div`
  display: flex;
  justify-content: center;
`

export const ResponsiveHeading = styled(Heading)<{ isMobile: boolean }>`
  font-size: ${({ isMobile }) => (isMobile ? '64px' : '76px')};
  color: ${({ theme }) => (theme.isDark ? '#fff' : '#060514')};

  @media (max-width: 600px) {
    font-size: 36px;
    text-align: center;
  }
`

export const ReferralCardWrapper = styled.div`
  width: 100%;
  margin-top: 60px;
  color: ${({ theme }) => (theme.isDark ? '#fff' : '#060514')};
  position: relative;
`

export const ReferralCard = styled.div<{ isMobile: boolean }>`
  padding: ${({ isMobile }) => (isMobile ? '16px 25px 16px 33px' : '14px 32px 36px 32px')};
  background: ${({ theme }) =>
    theme.isDark
      ? `linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0.06) 45.83%,
      rgba(255, 255, 255, 0) 100%
    ),
    #25272c`
      : `#f9fafb`};
  border: 1px solid rgba(232, 241, 250, 0.12);
  box-sizing: border-box;
  box-shadow: 1px 4px 44px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  /* opacity: 0.9; */
`

export const ReferralCardMainInfo = styled.div<{ isMobile: boolean }>`
  display: flex;
  ${({ isMobile }) => !isMobile && 'padding-right: 34px;'}
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  justify-content: space-between;
  align-items: ${({ isMobile }) => (isMobile ? 'flex-start' : 'center')};
  position: relative;
`

export const ReferralCardIconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 21px;
  font-weight: 700;
`

export const ReferralCardIcon = styled.div`
  background: url('/images/icons/ReferralIcon.png');
  background-size: cover;
  width: 23px;
  height: 27px;
  margin-right: 10px;
`

export const ReferralLinkContainer = styled.div<{ isMobile: boolean }>`
  /* display: grid;
  grid-template-columns: max-content auto;
  column-gap: 10px; */
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  justify-content: space-between;
  align-items: ${({ isMobile }) => (isMobile ? 'flex-start' : 'center')};
  width: ${({ isMobile }) => (isMobile ? '100%' : '80%')};
  position: relative;
  ${({ isMobile }) =>
    isMobile &&
    `
    margin-top: 16px;
  `}
`

export const ReferralLinkTitle = styled.div`
  color: ${({ theme }) => (theme.isDark ? '#BFC8DA' : '#818ea3')};
  font-weight: 600;
  font-size: 17px;
  line-height: 16px;
  letter-spacing: 0.04em;
  text-transform: capitalize;
  margin-right: 24px;
  width: 130px;
`

export const ReferralUrlContainer = styled.div<{ isMobile: boolean }>`
  background: rgba(245, 255, 252, 0.1);
  box-shadow: inset 0px 1px 9px rgba(0, 0, 0, 0.45);
  border-radius: 6px;
  padding: 18px 16px;
  padding-right: 60px;
  /* text-transform: uppercase; */
  vertical-align: middle;
  width: ${({ isMobile }) => (isMobile ? '100%' : 'calc(100% - 130px)')};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  ${({ isMobile }) =>
    isMobile &&
    `
    margin-top: 16px;
  `}
`

const FadeInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: rotate(-720deg);
  }
  100% {
    opacity: 1;
    transform: rotate(0);
  }
`

const FadeOutAnimation = keyframes`
  0% {
    opacity: 1;
    transform: rotate(0);
  }
  100% {
    opacity: 0;
    transform: rotate(-720deg);
  }
`

export const StyledIconCopy = styled(IconCopy)<{ visible: boolean }>`
  position: absolute;
  right: 24px;
  top: 15px;
  cursor: pointer;
  opacity: 1;
  ${({ visible }) =>
    visible
      ? css`
          animation: ${FadeInAnimation} 0.5s ease 0.5s 1;
        `
      : css`
          animation: ${FadeOutAnimation} 0.5s ease 0s 1;
        `}
  animation-fill-mode: both;
`

export const StyledIconCheck = styled(CheckmarkIcon)<{ visible: boolean }>`
  position: absolute;
  right: 24px;
  top: 15px;
  cursor: pointer;
  opacity: 0;
  fill: #04f8ad;
  width: 25px;
  ${({ visible }) =>
    visible
      ? css`
          animation: ${FadeInAnimation} 0.5s ease 0.5s 1;
        `
      : css`
          animation: ${FadeOutAnimation} 0.5s ease 0s 1;
        `}
  animation-fill-mode: both;
`

export const DropDownIcon = styled(DropDownBottomIcon)`
  position: absolute;
  right: 22px;
  top: 22px;
  cursor: pointer;
`

const expandAnimation = keyframes`
  from {
    max-height: 0px;
    margin-top: 0px;
  }
  to {
    max-height: 500px;
    margin-top: 39px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 500px;
    margin-top: 39px;
  }
  to {
    max-height: 0px;
    margin-top: 0px;
  }
`

export const ReferralDetailInfo = styled.div<{ expanded: boolean; isMobile: boolean }>`
  animation: ${({ expanded }) => (expanded ? expandAnimation : collapseAnimation)} 300ms linear forwards;
  display: grid;
  grid-template-columns: ${({ isMobile }) => (isMobile ? '100%' : '1fr 50% 1fr')};
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  grid-gap: 20px;
`

export const ReferralStatsContainer = styled.div`
  display: flex;
  padding: 10px;
  align-self: center;
  text-align: center;
  background: rgba(245, 255, 252, 0.1);
  box-shadow: ${({ theme }) =>
    theme.isDark ? 'inset 0px 1px 9px rgba(0, 0, 0, 0.85)' : 'inset 0px 1px 9px rgba(0, 0, 0, 0.15)'};
  border-radius: 6px;

  /* @media (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
  } */
`

export const ReferralStatsItem = styled.div<{ isMobile: boolean }>`
  display: flex;
  padding: 7px ${({ isMobile }) => (isMobile ? '15px' : '30px')};
  justify-content: ${({ isMobile }) => (isMobile ? 'center' : 'flex-start')};
  align-items: center;
  flex-direction: column;
  width: 50%;
`

export const Divider = styled.div`
  width: 1px;
  background-color: #c4c4c4;
  opacity: 0.1;

  /* @media (max-width: 600px) {
    width: 100%;
    height: 1px;
  } */
`

export const ReferralClaimButton = styled.div<{ isMobile: boolean }>`
  width: ${({ isMobile }) => (isMobile ? '100%' : 'max-content')};
  ${({ isMobile }) => isMobile && 'margin-bottom: 16px;'}
  text-align: center;
  color: #fff;
  background: ${({ theme }) =>
    theme.isDark
      ? 'linear-gradient(92.63deg, #3f81ef -1.76%, #8750f4 107.38%)'
      : 'linear-gradient(90deg, #04F8AD 0%, #3F81EF 50.52%, #5100B9 100%)'};
  border-radius: 6px;
  padding: ${({ isMobile }) => (isMobile ? 16 : 10)}px 24px;
  cursor: pointer;
  font-size: 12px;
`
