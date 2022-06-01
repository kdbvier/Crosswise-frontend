import React from 'react'
import { Flex, IconButton, useModal } from '@crosswise/uikit'
import { IconSetting } from 'components/SvgIcons'
import SettingsModal from './SettingsModal'

const GlobalSettings = () => {
  const [onPresentSettingsModal] = useModal(<SettingsModal />)

  return (
    <Flex>
      <IconButton onClick={onPresentSettingsModal} variant="text" scale="sm">
        <IconSetting />
      </IconButton>
    </Flex>
  )
}

export default GlobalSettings
