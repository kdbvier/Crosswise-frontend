import React from 'react'
import { useWeb3React } from '@web3-react/core'
// import { Heading, Card, CardBody, Text } from '@crosswise/uikit'
import { Heading, CardBody, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import Row from 'components/Layout/Row'
import useReferralsCount from '../../hooks/useReferralsCount'
import { StyledTotalCard, Block, Label } from './styled'

const TotalCard = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const counts = useReferralsCount()

  return (
    <StyledTotalCard>
      <CardBody>
        <Heading scale="md" mb="24px" mt="16px">
          {t('Total Referrals')}
        </Heading>
        <Row justify="space-between">
          <Block>
            <Label small color="textSubtle">
              {t('Invited Peoples')}
            </Label>
            {!account ? (
              <Text color="textSubtle" style={{ lineHeight: '44px', opacity: 0.6 }}>
                {t('Locked')}
              </Text>
            ) : (
              <Text color="text" fontSize="30px" bold>
                {counts}
              </Text>
            )}
          </Block>
        </Row>
      </CardBody>
    </StyledTotalCard>
  )
}

export default TotalCard
