import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import {
  Card,
  CardBody,
  CheckmarkCircleIcon,
  Flex,
  Heading,
  Link,
  Tag,
  Text,
  PrizeIcon,
  OpenNewIcon,
  BlockIcon,
  VisibilityOn,
  VisibilityOff,
} from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { useProfile } from 'state/profile/hooks'
import usePersistState from 'hooks/usePersistState'
import { getBscScanLink } from 'utils'
import Menu from '../components/Menu'
import CardHeader from '../components/CardHeader'
import Collectibles from '../components/Collectibles'
import WalletNotConnected from '../components/WalletNotConnected'
import StatBox from '../components/StatBox'
import EditProfileAvatar from '../components/EditProfileAvatar'
import AchievementsList from '../components/AchievementsList'
import { Content, Username, Status, ResponsiveText, AddressLink, Section } from './styled'

const PublicProfile = () => {
  const { account } = useWeb3React()
  const { profile } = useProfile()
  const [usernameVisibilityToggled, setUsernameVisibility] = usePersistState(false, {
    localStorageKey: 'username_visibility_toggled',
  })
  const { t } = useTranslation()

  if (!account) {
    return <WalletNotConnected />
  }

  const toggleUsernameVisibility = () => {
    setUsernameVisibility(!usernameVisibilityToggled)
  }

  const { username, team, isActive, points } = profile

  const Icon = usernameVisibilityToggled ? VisibilityOff : VisibilityOn

  return (
    <>
      <Menu activeIndex={1} />
      <div>
        <Card>
          <CardHeader>
            <Flex alignItems={['start', null, 'center']} flexDirection={['column', null, 'row']}>
              <EditProfileAvatar profile={profile} />
              <Content>
                <Flex alignItems="center">
                  <Username>@{usernameVisibilityToggled ? username : username.replace(/./g, '*')}</Username>
                  <Icon ml="4px" onClick={toggleUsernameVisibility} cursor="pointer" />
                </Flex>
                <Flex alignItems="center">
                  <AddressLink href={getBscScanLink(account, 'address')} color="text" external>
                    {account}
                    <OpenNewIcon ml="4px" />
                  </AddressLink>
                </Flex>
                <ResponsiveText bold>{team.name}</ResponsiveText>
              </Content>
            </Flex>
            <Status>
              {isActive ? (
                <Tag startIcon={<CheckmarkCircleIcon width="18px" />} outline>
                  {t('Active')}
                </Tag>
              ) : (
                <Tag variant="failure" startIcon={<BlockIcon width="18px" />} outline>
                  {t('Paused')}
                </Tag>
              )}
            </Status>
          </CardHeader>
          <CardBody>
            <StatBox icon={PrizeIcon} title={points} subtitle={t('Points')} mb="24px" />
            <Section>
              <Heading as="h4" scale="md" mb="16px">
                {t('Achievements')}
              </Heading>
              <AchievementsList />
            </Section>
            <Collectibles />
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default PublicProfile
