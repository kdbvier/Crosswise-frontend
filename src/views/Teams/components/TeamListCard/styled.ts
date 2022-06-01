import styled, { DefaultTheme } from 'styled-components'
import { Card, Heading } from '@crosswise/uikit'

const getBackground = (theme: DefaultTheme) => {
  if (theme.isDark) {
    return 'linear-gradient(139.73deg, #142339 0%, #24243D 47.4%, #37273F 100%)'
  }

  return 'linear-gradient(139.73deg, #E6FDFF 0%, #EFF4F5 46.87%, #F3EFFF 100%)'
}

export const TeamRank = styled.div`
  align-self: stretch;
  background: ${({ theme }) => getBackground(theme)};
  flex: none;
  padding: 16px 0;
  text-align: center;
  width: 56px;
`

export const Body = styled.div`
  align-items: start;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 24px;

  ${({ theme }) => theme.mediaQueries.md} {
    align-items: center;
    flex-direction: row;
    font-size: 40px;
  }
`

export const Info = styled.div`
  flex: 1;
`

export const Avatar = styled.img`
  border-radius: 50%;
`

export const TeamName = styled(Heading).attrs({ as: 'h3' })`
  font-size: 24px;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 40px;
  }
`

export const MobileAvatar = styled.div`
  flex: none;
  margin-right: 8px;

  ${Avatar} {
    height: 64px;
    width: 64px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`

export const DesktopAvatar = styled.div`
  display: none;

  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
    margin-left: 24px;

    ${Avatar} {
      height: 128px;
      width: 128px;
    }
  }
`

export const StyledTeamCard = styled(Card)`
  margin-bottom: 16px;
`
