import styled from 'styled-components'
import { Button } from '@crosswise/uikit'

export const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`

export const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })`
  padding: 0rem;
  margin-left: 15px;
`

export const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
`

export const InputPanel = styled.div<{ hideInput?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '4px')};
  /* background-color: ${({ theme }) => theme.colors.background}; */
  z-index: 1;
  width: 100%;
`

export const Container = styled.div<{ hideInput: boolean }>`
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
  padding: 6px 12px;
`

export const StyledInput = styled.input<{ error?: boolean; fontSize?: string; align?: string }>`
  width: 0;
  position: relative;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: transparent;
  font-size: 18px;
  letter-spacing: 0.035em;
  font-weight: 300;
  text-align: ${({ align }) => align && align};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  color: ${({ theme }) => (theme.isDark ? theme.colors.text : theme.colors.textSubtle)};

  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`
