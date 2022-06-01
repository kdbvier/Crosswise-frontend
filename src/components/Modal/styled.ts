import styled from 'styled-components'
import { Text, Input, InputProps } from '@crosswise/uikit'
import { StyledSpacerProps } from './interfaces'

const getBoxShadow = ({ isWarning = false, theme }) => {
  if (isWarning) {
    return theme.shadows.warning
  }

  return theme.shadows.inset
}

export const StyledModalActions = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.primaryDark}00;
  display: flex;
  margin: 0;
  padding: ${(props) => props.theme.spacing[4]}px 0;
`

export const StyledModalAction = styled.div`
  flex: 1;
`

export const StyledTokenInput = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.input};
  border-radius: 16px;
  box-shadow: ${getBoxShadow};
  color: ${({ theme }) => theme.colors.text};
  padding: 8px 16px 8px 0;
  width: 100%;
`

export const StyledInput = styled(Input)`
  box-shadow: none;
  width: 60px;
  margin: 0 8px;
  padding: 0 8px;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 80px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
  }
`

export const StyledErrorMessage = styled(Text)`
  position: absolute;
  bottom: -22px;
  a {
    display: inline;
  }
`

export const StyledSpacer = styled.div<StyledSpacerProps>`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`

export const ExpandButtonWrapper = styled.div<{ width?: string | number }>`
  position: relative;
  cursor: pointer;
  height: 47px;
  ${({ width }) => width && `width: ${width};`}
`

export const ExpandButtonText = styled(Text)`
  position: absolute;
  width: 100%;
  left: 0px;
  top: 25px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  color: #ffffff;
`
