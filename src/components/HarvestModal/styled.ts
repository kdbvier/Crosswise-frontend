import styled from 'styled-components'
import { Button } from '@crosswise/uikit'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
`

export const ValueContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: auto;
  width: 80%;
  border-radius: 6px;
  background: rgba(245, 255, 252, 0.1);
  box-shadow: ${({ theme }) =>
    theme.isDark ? 'inset 0px 1px 9px rgba(0, 0, 0, 0.85)' : 'inset 0px 1px 9px rgba(0, 0, 0, 0.15)'};
  padding: 10px 0 12px 0;
  margin: 10px 0;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const ActionButton = styled(Button)`
  height: 35px;
  width: 152px;
  border-radius: 6px;
  background: linear-gradient(92.63deg, #3f81ef -1.76%, #8750f4 107.38%);
  margin: 10px;
`
