import React, { useCallback } from 'react'
import { Modal, InjectedModalProps } from '@crosswise/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ConfirmationModalProps } from './interfaces'
import { ConfirmationPendingContent, TransactionSubmittedContent } from './Contents'

export { ConfirmationModalContent } from './ConfirmationModal'
export { TransactionErrorContent } from './TransactionErrorContent'

const TransactionConfirmationModal: React.FC<InjectedModalProps & ConfirmationModalProps> = ({
  title,
  onDismiss,
  customOnDismiss,
  attemptingTxn,
  hash,
  pendingText,
  content,
  currencyToAdd,
}) => {
  const { chainId } = useActiveWeb3React()

  const handleDismiss = useCallback(() => {
    if (customOnDismiss) {
      customOnDismiss()
    }
    onDismiss()
  }, [customOnDismiss, onDismiss])

  if (!chainId) return null

  return (
    <Modal title={title} width="346px" onDismiss={handleDismiss}>
      {attemptingTxn ? (
        <ConfirmationPendingContent pendingText={pendingText} />
      ) : hash ? (
        <TransactionSubmittedContent
          chainId={chainId}
          hash={hash}
          onDismiss={onDismiss}
          currencyToAdd={currencyToAdd}
        />
      ) : (
        content()
      )}
    </Modal>
  )
}

export default TransactionConfirmationModal
