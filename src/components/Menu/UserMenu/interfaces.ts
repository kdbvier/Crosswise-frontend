import { FlexProps, InjectedModalProps } from '@crosswise/uikit'
import { TransactionDetails } from 'state/transactions/reducer'
import { WalletView } from './enums'

export interface CopyAddressProps extends FlexProps {
  account: string
}

export interface ProfileUserMenuItemProps {
  isLoading: boolean
  hasProfile: boolean
}

export interface TransactionRowProps {
  txn: TransactionDetails
}

export interface WalletInfoProps {
  hasLowBnbBalance: boolean
  onDismiss: InjectedModalProps['onDismiss']
}

export interface WalletModalProps extends InjectedModalProps {
  initialView?: WalletView
}
