import React, { ImgHTMLAttributes } from 'react'
import { NoBadgePlaceholder, StyledAchievementAvatar } from './styled'

interface AchievementAvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  badge?: string
}

const AchievementAvatar: React.FC<AchievementAvatarProps> = ({ badge, ...props }) => {
  if (!badge) {
    return <NoBadgePlaceholder />
  }

  return <StyledAchievementAvatar src={`/images/achievements/${badge}`} alt="achievement badge" {...props} />
}

export default AchievementAvatar
