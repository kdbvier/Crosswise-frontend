import styled from 'styled-components'

export const Inner = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
`

export const NumberWrapper = styled.div`
  grid-column: span 1;
  grid-row: span 2;
`

export const TitleWrapper = styled.div`
  grid-column: 2 / 2;
  grid-row: 1 / 2;
`

export const ChildrenWrapper = styled.div`
  grid-column: 2 / 2;
  grid-row: 2 / 2;
`
