import React from 'react'
import { Heading, CardBody, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import Row from 'components/Layout/Row'
import GetReferralLinkCard from '../GetReferralLinkCard'
// import { StyledProgramCard, Block, Label, LinkLabel, LabelRow, InputRow, Container } from './styled'
import { StyledProgramCard, Block, Label, LabelRow, Container } from './styled'

const ProgramCard = () => {
  const { t } = useTranslation()

  return (
    <StyledProgramCard>
      <CardBody>
        <Heading scale="md" mb="24px" mt="16px">
          {t('Referral Program')}
        </Heading>
        <Row justify="space-between">
          <Block>
            <Label small color="textSubtle">
              {t(
                'Invite familiar investors and get 1% lifetime from their Staking & Farming Rewards. The bonus will be credited to your CRSS wallet account.',
              )}
            </Label>
            <Container>
              <LabelRow>
                <Row justify="space-between">
                  <Text fontSize="13px" fontWeight="500" color="textSecondary">
                    Your link
                  </Text>
                </Row>
              </LabelRow>
              {/* <Input placeholder="Your link" value="https://crosswise.com/?ref=adsf51a632safd21fad5fs2f0xdf1a1sd5fas3d2fasdr4q56ew3fdsaf" /> */}
              {/* <InputRow> */}
              <GetReferralLinkCard />
              {/* <LinkLabel>
                  https://crosswise.com/?ref=adsf51a632safd21fad5fs2f0xdf1a1sd5fas3d2fasdr4q56ew3fdsaf
                </LinkLabel>
                <Text color="primary" style={{ padding: '0.75rem 1rem 0.75rem 1rem', cursor: 'pointer' }}>
                  Copy
                </Text> */}
              {/* </InputRow> */}
            </Container>
          </Block>
        </Row>
      </CardBody>
    </StyledProgramCard>
  )
}

export default ProgramCard
