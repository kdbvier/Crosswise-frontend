import React from 'react'
import { Skeleton } from '@crosswise/uikit'
import { MultiplierWrapper, Container } from './styled'

export interface DepositFeeProps {
  depositFee: string
}

const DepositFee: React.FunctionComponent<DepositFeeProps> = ({ depositFee }) => {
  const displayDepositFee = depositFee ? depositFee.toLowerCase() : <Skeleton width={30} />

  return (
    <Container>
      <MultiplierWrapper>{displayDepositFee}</MultiplierWrapper>
    </Container>
  )
}

export default DepositFee
