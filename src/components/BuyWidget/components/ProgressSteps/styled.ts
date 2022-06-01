import styled from 'styled-components'
import { RowBetween } from 'components/Layout/Row'
// import { readBuilderProgram } from 'typescript'

export const Grouping = styled(RowBetween)`
  width: 50%;
`

export const Circle = styled.div<{ confirmed?: boolean; disabled?: boolean }>`
  min-width: 20px;
  min-height: 20px;
  background: ${({ theme, disabled }) =>
    disabled ? theme.colors.gradients.btngradprimary : theme.colors.greenPalette.accent};
  border: 1px solid
    ${({ theme, disabled }) => (disabled ? theme.colors.bluePalette.main : theme.colors.greenPalette.accent)};
  border-radius: 50%;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 8px;
  font-size: 12px;
`

export const CircleRow = styled.div`
  width: calc(100% - 20px);
  display: flex;
  align-items: center;
`

export const Connector = styled.div<{ prevConfirmed?: boolean; disabled?: boolean }>`
  width: 100%;
  height: 2px;
  background: ${({ prevConfirmed }) =>
    prevConfirmed
      ? 'linear-gradient(92.63deg, #00B9B9 -1.76%, #04F8AD 52.24%, #23D0BE 94.15%, #04F8AD 107.38%);'
      : 'linear-gradient(92.63deg, #3F81EF -1.76%, #8750F4 52.24%, #23D0BE 94.15%, #04F8AD 107.38%);'}
  transform: rotate(180deg);
`
