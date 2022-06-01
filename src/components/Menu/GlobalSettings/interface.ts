import { InjectedModalProps } from '@crosswise/uikit'

export interface ExpertModalProps extends InjectedModalProps {
  setShowConfirmExpertModal: (boolean) => void
  setRememberExpertModeAcknowledgement: (boolean) => void
}
