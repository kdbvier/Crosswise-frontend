import React from 'react'
import { IconButton, useModal } from '@crosswise/uikit'
import { IconRefresh } from 'components/SvgIcons'
import TransactionsModal from './TransactionsModal'

const Transactions = () => {
  const [onPresentTransactionsModal] = useModal(<TransactionsModal />)
  return (
    <>
      <IconButton variant="text" scale="sm" onClick={onPresentTransactionsModal}>
        <IconRefresh />
      </IconButton>
    </>
  )
}

export default Transactions
