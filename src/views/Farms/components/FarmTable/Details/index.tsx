import React from 'react'
import { SettingIcon } from '@crosswise/uikit'
import { Container } from './styled'

interface DetailsProps {
  actionPanelToggled: boolean
}

const Details: React.FC<DetailsProps> = () => {
  // const { t } = useTranslation()
  // const { isXl } = useMatchBreakpoints()
  // const isMobile = !isXl

  return (
    <Container>
      <SettingIcon color="textSecondary" style={{ marginRight: '8px' }} />
      {/* {!isMobile && actionPanelToggled ? t('HIDE DETAILS') : t('MORE DETAILS')}
      <ArrowIcon color="textSecondary" toggled={actionPanelToggled} /> */}
    </Container>
  )
}

export default Details
