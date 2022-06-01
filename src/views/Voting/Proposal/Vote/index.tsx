import React, { useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardProps, Heading, Radio, Text, useModal } from '@crosswise/uikit'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import { Proposal } from 'state/types'
import { fetchVotes } from 'state/voting'
import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import CastVoteModal from '../../components/CastVoteModal'
import { Choice, ChoiceText } from './styled'

interface VoteProps extends CardProps {
  proposal: Proposal
}

interface State {
  label: string
  value: number
}

const Vote: React.FC<VoteProps> = ({ proposal, ...props }) => {
  const [vote, setVote] = useState<State>(null)
  const { t } = useTranslation()
  const { toastSuccess } = useToast()
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const handleSuccess = async () => {
    toastSuccess(t('Vote cast!'))
    dispatch(fetchVotes({ proposalId: proposal.id, block: Number(proposal.snapshot) }))
  }

  const [presentCastVoteModal] = useModal(
    <CastVoteModal onSuccess={handleSuccess} proposalId={proposal.id} vote={vote} block={Number(proposal.snapshot)} />,
  )

  return (
    <Card {...props}>
      <CardHeader>
        <Heading as="h3" scale="md">
          {t('Cast your vote')}
        </Heading>
      </CardHeader>
      <CardBody>
        {proposal.choices.map((choice, index) => {
          const isChecked = index + 1 === vote?.value

          const handleChange = () => {
            setVote({
              label: choice,
              value: index + 1,
            })
          }

          return (
            <Choice key={choice} isChecked={isChecked} isDisabled={!account}>
              <div style={{ flexShrink: 0 }}>
                <Radio scale="sm" value={choice} checked={isChecked} onChange={handleChange} disabled={!account} />
              </div>
              <ChoiceText>
                <Text as="span" title={choice}>
                  {choice}
                </Text>
              </ChoiceText>
            </Choice>
          )
        })}
        {account ? (
          <Button onClick={presentCastVoteModal} disabled={vote === null}>
            {t('Cast Vote')}
          </Button>
        ) : (
          <ConnectWalletButton />
        )}
      </CardBody>
    </Card>
  )
}

export default Vote
