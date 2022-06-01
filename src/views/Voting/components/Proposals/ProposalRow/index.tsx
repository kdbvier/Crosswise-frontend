import React from 'react'
import { ArrowForwardIcon, Box, IconButton, Flex, Text } from '@crosswise/uikit'
import { Proposal } from 'state/types'
import { isCoreProposal } from '../../../helpers'
import TimeFrame from '../TimeFrame'
import { ProposalStateTag, ProposalTypeTag } from '../tags'
import { StyledProposalRow } from './styled'

interface ProposalRowProps {
  proposal: Proposal
}

const ProposalRow: React.FC<ProposalRowProps> = ({ proposal }) => {
  const votingLink = `/voting/proposal/${proposal.id}`

  return (
    <StyledProposalRow to={votingLink}>
      <Box as="span" style={{ flex: 1 }}>
        <Text bold mb="8px">
          {proposal.title}
        </Text>
        <Flex alignItems="center" mb="8px">
          <TimeFrame startDate={proposal.start} endDate={proposal.end} proposalState={proposal.state} />
        </Flex>
        <Flex alignItems="center">
          <ProposalStateTag proposalState={proposal.state} />
          <ProposalTypeTag isCoreProposal={isCoreProposal(proposal)} ml="8px" />
        </Flex>
      </Box>
      <IconButton variant="text">
        <ArrowForwardIcon width="24px" />
      </IconButton>
    </StyledProposalRow>
  )
}

export default ProposalRow
