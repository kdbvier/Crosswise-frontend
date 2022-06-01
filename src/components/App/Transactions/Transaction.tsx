import React from 'react'
import { CheckmarkIcon, CloseIcon, LinkExternal } from '@crosswise/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getBscScanLink } from 'utils'
import { TransactionDetails } from 'state/transactions/reducer'
import CircleLoader from '../../Loader/CircleLoader'
import { TransactionState, IconWrapper } from './styled'

export default function Transaction({ tx }: { tx: TransactionDetails }) {
  const { chainId } = useActiveWeb3React()

  const summary = tx?.summary
  const pending = !tx?.receipt
  const success = !pending && tx && (tx.receipt?.status === 1 || typeof tx.receipt?.status === 'undefined')

  if (!chainId) return null

  return (
    <TransactionState pending={pending} success={success}>
      <LinkExternal href={getBscScanLink(tx.hash, 'transaction', chainId)}>{summary ?? tx.hash}</LinkExternal>
      <IconWrapper pending={pending} success={success}>
        {pending ? <CircleLoader /> : success ? <CheckmarkIcon color="success" /> : <CloseIcon color="failure" />}
      </IconWrapper>
    </TransactionState>
  )
}
