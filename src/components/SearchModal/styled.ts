import styled from 'styled-components'
import { Text, ModalContainer, ModalHeader, ModalBody, CheckmarkCircleIcon, ButtonMenu } from '@crosswise/uikit'
import Row, { RowBetween } from '../Layout/Row'
import Column from '../Layout/Column'

export const BaseWrapper = styled.div<{ disable?: boolean }>`
  border: 1px solid ${({ theme, disable }) => (disable ? 'transparent' : theme.colors.dropdown)};
  border-radius: 10px;
  display: flex;
  padding: 6px;

  align-items: center;
  :hover {
    cursor: ${({ disable }) => !disable && 'pointer'};
    background-color: ${({ theme, disable }) => !disable && theme.colors.background};
  }

  background-color: ${({ theme, disable }) => disable && theme.colors.dropdown};
  opacity: ${({ disable }) => disable && '0.4'};
`

export const StyledBalanceText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  max-width: 5rem;
  text-overflow: ellipsis;
`

export const FixedContentRow = styled.div`
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-gap: 16px;
  align-items: center;
`

export const MenuItem = styled(RowBetween)<{ disabled: boolean; selected: boolean }>`
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) minmax(0, 72px);
  grid-gap: 8px;
  cursor: ${({ disabled }) => !disabled && 'pointer'};
  pointer-events: ${({ disabled }) => disabled && 'none'};
  :hover {
    background-color: ${({ theme, disabled }) => !disabled && theme.colors.background};
  }
  opacity: ${({ disabled, selected }) => (disabled || selected ? 0.5 : 1)};
`

export const Footer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  text-align: center;
`

export const StyledModalHeader = styled(ModalHeader)`
  padding: 24px;
`

export const StyledModalContainer = styled(ModalContainer)`
  max-width: 420px;
  width: 100%;
`

export const StyledModalBody = styled(ModalBody)`
  padding: 24px;
`

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

export const TextDot = styled.div`
  height: 3px;
  width: 3px;
  background-color: ${({ theme }) => theme.colors.text};
  border-radius: 50%;
`

export const TokenSection = styled.div<{ dim?: boolean }>`
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) auto;
  grid-gap: 16px;
  align-items: center;

  opacity: ${({ dim }) => (dim ? '0.4' : '1')};
`

export const CheckIcon = styled(CheckmarkCircleIcon)`
  height: 16px;
  width: 16px;
  margin-right: 6px;
  stroke: ${({ theme }) => theme.colors.success};
`

export const NameOverflow = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
  font-size: 12px;
`

export const StyledButtonMenu = styled(ButtonMenu)`
  width: 100%;
`

export const ManageListWrapper = styled(Column)`
  width: 100%;
  height: 100%;
`

export const RowWrapper = styled(Row)<{ active: boolean }>`
  background-color: ${({ active, theme }) => (active ? `${theme.colors.success}19` : 'transparent')};
  border: solid 1px;
  border-color: ${({ active, theme }) => (active ? theme.colors.success : theme.colors.tertiary)};
  transition: 200ms;
  align-items: center;
  padding: 1rem;
  border-radius: 20px;
`

export const ListContainer = styled.div`
  padding: 1rem 0;
  height: 100%;
  overflow: auto;
`

export const ManageTokenWrapper = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  position: relative;
  padding-bottom: 60px;
`

export const ManageTokenFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
