import styled from 'styled-components'
import { Text } from '@crosswise/uikit'

export const ExpandButtonWrapper = styled.div`
  position: relative;
  cursor: pointer;
  height: 47px;
  width: 100%;
  background: linear-gradient(92.63deg, #3f81ef -1.76%, #8750f4 107.38%);
  border-radius: 0px 0px 20px 20px;
`

export const TopPart = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20px;
  border-radius: 0px 0px 20px 20px;
  background: ${({ theme }) =>
    theme.isDark
      ? 'linear-gradient(90deg,rgba(255,255,255,0.12) 0%,rgba(255,255,255,0.06) 45.83%,rgba(255,255,255,0) 100%),#25272C;'
      : 'white'};
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
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledSvg = styled.svg`
  align-self: center;
  flex-shrink: 0;
  height: 100%;
  width: 100%;
`
