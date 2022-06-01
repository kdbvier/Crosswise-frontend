import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { Heading, CardBody, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import Row from 'components/Layout/Row'
import CardValue from '../CardValue'
import useReferralCommisions from '../../hooks/useReferralCommissions'
import { StyledCommissionsCard, Block, Label } from './styled'

const CommissionsCard = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const data = useReferralCommisions()

  return (
    <StyledCommissionsCard>
      <CardBody>
        <Heading scale="md" mb="24px" mt="16px">
          {t('Referral Commissions')}
        </Heading>
        <Row justify="space-between">
          <Block>
            <Label small color="textSubtle">
              {t('Total CRSS Balance')}
            </Label>
            {!account ? (
              <Text color="textSubtle" style={{ lineHeight: '44px', opacity: 0.6 }}>
                {t('Locked')}
              </Text>
            ) : (
              <Text color="text" fontSize="30px" bold>
                <CardValue value={data} suffix=" CRSS" isCountUp />
              </Text>
            )}
          </Block>
        </Row>
      </CardBody>
    </StyledCommissionsCard>
  )
}

export default CommissionsCard
