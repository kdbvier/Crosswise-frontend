import styled from 'styled-components'
import { BunnyPlaceholderIcon } from '@crosswise/uikit'

export const NoBadgePlaceholder = styled(BunnyPlaceholderIcon)`
  height: 48px;
  width: 48px;

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 64px;
    width: 64px;
  }
`

export const StyledAchievementAvatar = styled.img`
  height: 48px;
  width: 48px;

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 64px;
    width: 64px;
  }
`
