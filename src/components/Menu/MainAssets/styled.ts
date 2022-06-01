import styled from 'styled-components'

export const NetworkBlock = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.input};
  position: relative;
  height: 44px;
  // margin-left: 8px;
  // margin-right: 8px;
  padding-left: 16px;
  padding-right: 16px;
  & > div {
    opacity: 0.6;
  }
`

export const Block = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.input};
  position: relative;
  height: 44px;
  margin-left: 8px;
  margin-right: 8px;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 10px;
  ${({ theme }) => theme.mediaQueries.xs} {
    display: none;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    display: inline-flex;
  }
`

export const StyledContent = styled.div`
  margin-left: 8px;
  vertical-align: middle;
  position: relative;
  color: ${({ theme }) => theme.colors.primaryText};

  ${({ theme }) => theme.mediaQueries.xs} {
    display: none;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`
