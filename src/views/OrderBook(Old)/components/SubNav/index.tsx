import React from 'react'
import { useLocation, Link, useRouteMatch } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import { Button, Heading } from '@crosswise/uikit'
import { StyledNav, HeadLine } from './styled'

const SubNav = () => {
  const { url } = useRouteMatch()
  const location = useLocation()
  const { t } = useTranslation()

  let activeIndex
  switch (location.pathname) {
    case '/limitorders/tradenow':
    case '/limitorders/tradenow/all':
    case '/limitorders/tradenow/simple':
      activeIndex = 0
      break
    case '/limitorders/limitorder':
    case '/limitorders/limitorder/pending':
    case '/limitorders/limitorder/executed':
      activeIndex = 1
      break
    default:
      activeIndex = 0
      break
  }

  return (
    <StyledNav>
      <Heading scale="xl" color="text" mb="32px" style={{ fontSize: '48px' }}>
        <HeadLine>{t('OrderBook')}</HeadLine>
      </Heading>
      <div>
        <Button
          variant={activeIndex === 0 ? 'secondaryGradient' : 'tertiary'}
          scale="md"
          as={Link}
          to={`${url}/tradenow/all`}
          style={{ margin: '0 8px 0 0', padding: '10px 24px' }}
        >
          {t('Trade Now')}
        </Button>
        <Button
          variant={activeIndex === 1 ? 'secondaryGradient' : 'tertiary'}
          scale="md"
          as={Link}
          to={`${url}/limitorder/pending`}
          style={{ margin: '0 8px 0 0', padding: '10px 24px' }}
        >
          {t('Limit orders')}
        </Button>
      </div>
    </StyledNav>
  )
}

export default SubNav
