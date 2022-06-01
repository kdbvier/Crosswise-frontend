import styled from 'styled-components'
import { NoProfileAvatarIcon } from '@crosswise/uikit'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LaurelWrapper = styled.div<{ dir?: 'left' | 'right' }>`
  transform: ${({ dir }) => (dir === 'left' ? 'rotate(30deg)' : 'rotate(-30deg)')};
  svg {
    fill: #27262c;
    opacity: 0.5;
    height: 32px;
    width: auto;
    ${({ theme }) => theme.mediaQueries.sm} {
      height: 45px;
    }
  }
`

export const ProfileWrapper = styled.div`
  height: 96px;
  width: 96px;
`

export const StyledNoProfileAvatarIcon = styled(NoProfileAvatarIcon)`
  width: 100%;
  height: 100%;
`
