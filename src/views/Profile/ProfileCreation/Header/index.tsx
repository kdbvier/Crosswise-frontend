import React, { useContext } from 'react'
import { Breadcrumbs, Heading, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { ProfileCreationContext } from '../contexts/ProfileCreationProvider'
import { Wrapper } from './styled'

const steps = ['Get Starter Collectible', 'Set Profile Picture', 'Join Team', 'Set Name']

const Header: React.FC = () => {
  const { t } = useTranslation()
  const { currentStep } = useContext(ProfileCreationContext)

  return (
    <Wrapper>
      <Heading as="h1" scale="xxl" color="secondary" mb="8px">
        {t('Profile Setup')}
      </Heading>
      <Heading as="h2" scale="lg" mb="8px">
        {t('Show off your stats and collectibles with your unique profile')}
      </Heading>
      <Text color="textSubtle" mb="24px">
        {t('Total cost: 1.5 CAKE')}
      </Text>
      <Breadcrumbs>
        {steps.map((translationKey, index) => {
          return (
            <Text key={translationKey} color={index <= currentStep ? 'text' : 'textDisabled'}>
              {t(translationKey)}
            </Text>
          )
        })}
      </Breadcrumbs>
    </Wrapper>
  )
}

export default Header
