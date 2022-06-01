import React from 'react'
import styled from 'styled-components'
import { useLocation, Link, useRouteMatch } from 'react-router-dom'
import { NotificationDot, Button } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'

interface FarmTabButtonsProps {
  hasStakeInFinishedFarms: boolean
}

const FarmTabButtons: React.FC<FarmTabButtonsProps> = ({ hasStakeInFinishedFarms }) => {
  const { url } = useRouteMatch()
  const location = useLocation()
  const { t } = useTranslation()

  let activeIndex
  switch (location.pathname) {
    case '/farms':
      activeIndex = 0
      break
    case '/farms/history':
      activeIndex = 1
      break
    case '/farms/archived':
      activeIndex = 2
      break
    default:
      activeIndex = 0
      break
  }

  return (
    <Wrapper>
      <Button
        variant={activeIndex === 0 ? 'tertiary' : 'secondaryGradient'}
        scale="md"
        as={Link}
        to={`${url}`}
        style={{ margin: '0 8px 0 0', padding: '10px 24px' }}
      >
        {t('Active')}
      </Button>
      <NotificationDot show={hasStakeInFinishedFarms}>
        <Button
          variant={activeIndex === 1 ? 'tertiary' : 'secondaryGradient'}
          scale="md"
          as={Link}
          to={`${url}/history`}
          style={{ margin: '0 8px 0 0', padding: '10px 24px' }}
        >
          {t('Inactive')}
        </Button>
      </NotificationDot>
    </Wrapper>
  )
}

export default FarmTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
  a {
    padding-left: 12px;
    padding-right: 12px;
    color: ${({ theme }) => (theme.isDark ? '#FFF' : '#000')};
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 16px;
    display: block;
  }
`
