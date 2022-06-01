import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { StarFillIcon, StarLineIcon } from '@crosswise/uikit'
import useTheme from 'hooks/useTheme'
import { HoverIcon } from './styled'

const SaveIcon: React.FC<{ fill: boolean } & HTMLAttributes<HTMLDivElement>> = ({ fill = false, ...rest }) => {
  const { theme } = useTheme()
  return (
    <HoverIcon {...rest}>
      {fill ? (
        <StarFillIcon stroke={theme.colors.warning} color={theme.colors.warning} />
      ) : (
        <StarLineIcon stroke={theme.colors.textDisabled} />
      )}
    </HoverIcon>
  )
}

export default SaveIcon
