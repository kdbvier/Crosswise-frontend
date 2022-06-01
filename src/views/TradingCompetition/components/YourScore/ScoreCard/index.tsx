import React from 'react'
import {
  CardBody,
  Flex,
  Skeleton,
  LaurelLeftIcon,
  LaurelRightIcon,
  CheckmarkCircleIcon,
  useModal,
} from '@crosswise/uikit'
import { CLAIM, OVER } from 'config/constants/trading-competition/easterPhases'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from 'contexts/Localization'
import UserPrizeGrid from '../UserPrizeGrid'
import ClaimModal from '../../ClaimModal'
import { YourScoreProps } from '../../../types'
import CardUserInfo from '../CardUserInfo'
import { StyledCard, StyledButton, StyledCardFooter } from './styled'

const ScoreCard: React.FC<YourScoreProps> = ({
  hasRegistered,
  account,
  userTradingInformation,
  profile,
  isLoading,
  userLeaderboardInformation,
  currentPhase,
  userCanClaimPrizes,
  finishedAndPrizesClaimed,
  finishedAndNothingToClaim,
  onClaimSuccess,
}) => {
  const { t } = useTranslation()
  const [onPresentClaimModal] = useModal(
    <ClaimModal userTradingInformation={userTradingInformation} onClaimSuccess={onClaimSuccess} />,
    false,
  )
  const isClaimButtonDisabled = Boolean(isLoading || finishedAndPrizesClaimed || finishedAndNothingToClaim)
  const { hasUserClaimed } = userTradingInformation

  const getClaimButtonText = () => {
    if (userCanClaimPrizes) {
      return t('Claim prizes')
    }
    // User has already claimed prizes
    if (hasUserClaimed) {
      return (
        <>
          <CheckmarkCircleIcon /> {t('Prizes Claimed!')}
        </>
      )
    }
    // User has nothing to claim
    return t('Nothing to claim')
  }

  return (
    <StyledCard mt="24px">
      <CardBody>
        {isLoading ? (
          <Flex mt="24px" justifyContent="center" alignItems="center">
            <Skeleton width="100%" height="60px" />
          </Flex>
        ) : (
          <>
            <CardUserInfo
              hasRegistered={hasRegistered}
              account={account}
              profile={profile}
              userLeaderboardInformation={userLeaderboardInformation}
              currentPhase={currentPhase}
            />
            {hasRegistered && (currentPhase.state === CLAIM || currentPhase.state === OVER) && (
              <UserPrizeGrid userTradingInformation={userTradingInformation} />
            )}
            {!account && (
              <Flex mt="24px" justifyContent="center">
                <ConnectWalletButton />
              </Flex>
            )}
          </>
        )}
      </CardBody>
      {hasRegistered && currentPhase.state === CLAIM && (
        <StyledCardFooter>
          <LaurelLeftIcon />
          <StyledButton disabled={isClaimButtonDisabled} mx="18px" onClick={() => onPresentClaimModal()}>
            {getClaimButtonText()}
          </StyledButton>
          <LaurelRightIcon />
        </StyledCardFooter>
      )}
    </StyledCard>
  )
}

export default ScoreCard
