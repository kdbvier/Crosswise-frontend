import React from 'react'
import { Profile } from 'state/types'
import { TeamAvatar, AvatarInactive, AvatarWrapper } from './styled'

export interface ProfileAvatarProps {
  profile: Profile
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ profile }) => {
  return (
    <AvatarWrapper bg={`/images/nfts/${profile.nft?.images?.md}`}>
      {!profile.isActive && <AvatarInactive />}
      <TeamAvatar src={`/images/teams/${profile.team.images.alt}`} alt={profile.team.name} />
    </AvatarWrapper>
  )
}

export default ProfileAvatar
