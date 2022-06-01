import React from 'react'
import { LaurelLeftIcon, LaurelRightIcon, Skeleton } from '@crosswise/uikit'
import { YourScoreProps } from '../../../types'
import ProfileAvatar from '../../../../Profile/components/ProfileAvatar'
import Sticker from '../../Sticker'
import { Wrapper, LaurelWrapper, ProfileWrapper, StyledNoProfileAvatarIcon } from './styled'

const ScoreHeader: React.FC<YourScoreProps> = ({ profile, isLoading }) => {
  return (
    <Wrapper>
      <LaurelWrapper dir="left">
        <LaurelLeftIcon />
      </LaurelWrapper>
      {isLoading ? (
        <Skeleton height="96px" width="96px" variant="circle" />
      ) : (
        <ProfileWrapper>
          <Sticker>{profile ? <ProfileAvatar profile={profile} /> : <StyledNoProfileAvatarIcon />}</Sticker>
        </ProfileWrapper>
      )}

      <LaurelWrapper dir="right">
        <LaurelRightIcon />
      </LaurelWrapper>
    </Wrapper>
  )
}

export default ScoreHeader
