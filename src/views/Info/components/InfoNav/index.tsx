import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { Box, ButtonMenu, ButtonMenuItem } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import Search from 'views/Info/components/InfoSearch'
import { NavWrapper } from './styled'

const InfoNav = () => {
  const { t } = useTranslation()
  const isPools = useRouteMatch(['/info/pools', '/info/pool', '/info/pair'])
  const isTokens = useRouteMatch(['/info/tokens', '/info/token'])
  let activeIndex = 0
  if (isPools) {
    activeIndex = 1
  }
  if (isTokens) {
    activeIndex = 2
  }
  return (
    <NavWrapper>
      <Box>
        <ButtonMenu activeIndex={activeIndex} scale="sm" variant="subtle">
          <ButtonMenuItem as={Link} to="/info">
            {t('Overview')}
          </ButtonMenuItem>
          <ButtonMenuItem as={Link} to="/info/pools">
            {t('Pools')}
          </ButtonMenuItem>
          <ButtonMenuItem as={Link} to="/info/tokens">
            {t('Tokens')}
          </ButtonMenuItem>
        </ButtonMenu>
      </Box>
      <Box width={['100%', '100%', '250px']}>
        <Search />
      </Box>
    </NavWrapper>
  )
}

export default InfoNav
