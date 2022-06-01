import styled from 'styled-components'
import { Heading, Link, Text } from '@crosswise/uikit'

export const Content = styled.div`
  flex: 1;
  padding: 16px 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0 16px;
  }
`

export const Username = styled(Heading)`
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 8px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 40px;
    line-height: 44px;
  }
`

export const Status = styled.div`
  position: absolute;
  right: 24px;
  top: 24px;
`

export const ResponsiveText = styled(Text)`
  font-size: 12px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
  }
`

export const AddressLink = styled(Link)`
  display: inline-block;
  font-weight: 400;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80px;
  white-space: nowrap;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
    width: auto;
  }
`

export const Section = styled.div`
  margin-bottom: 40px;
`
