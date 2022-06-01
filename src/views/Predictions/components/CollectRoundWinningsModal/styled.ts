import styled from 'styled-components'
import { ModalContainer, InjectedModalProps } from '@crosswise/uikit'

export const Modal = styled(ModalContainer)`
  overflow: visible;
`

export const BunnyDecoration = styled.div`
  position: absolute;
  top: -116px; // line up bunny at the top of the modal
  left: 0px;
  text-align: center;
  width: 100%;
`
