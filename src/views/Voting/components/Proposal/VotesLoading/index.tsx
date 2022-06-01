import React from 'react'
import { Box, Skeleton } from '@crosswise/uikit'
import times from 'lodash/times'
import { Row, StyledSkeleton } from './styled'

const VotesLoading = () => {
  return (
    <Box>
      {times(10).map((index) => (
        <Row key={index}>
          <Skeleton height="21px" mr="32px" width="100px" />
          <StyledSkeleton height="21px" mr="32px" width="100%" />
          <StyledSkeleton height="21px" width="100%" />
        </Row>
      ))}
    </Box>
  )
}

export default VotesLoading
