import React from 'react'
import { useModal } from '@crosswise/uikit'
import EditProfileModal from '../EditProfileModal'
import ProfileAvatar, { ProfileAvatarProps } from '../ProfileAvatar'
import { EditOverlay, StyledEditProfileAvatar, AvatarWrapper } from './styled'

const EditProfileAvatar: React.FC<ProfileAvatarProps> = ({ profile }) => {
  const [onEditProfileModal] = useModal(<EditProfileModal />, false)

  return (
    <StyledEditProfileAvatar onClick={onEditProfileModal}>
      <AvatarWrapper>
        <ProfileAvatar profile={profile} />
      </AvatarWrapper>
      <EditOverlay />
    </StyledEditProfileAvatar>
  )
}

export default EditProfileAvatar
