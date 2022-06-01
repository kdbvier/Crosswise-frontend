import styled from 'styled-components'

export const ReferenceElement = styled.div`
  display: inline-block;
`
export const LiquidityWrapper = styled.div`
  min-width: 110px;
  font-weight: 600;
  text-align: right;
  margin-right: 14px;

  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: left;
    margin-right: 0;
  }
`

export const Container = styled.div`
  display: flex;
  align-items: center;
`
