import styled from 'styled-components'
import { Flex, Text } from '@crosswise/uikit'

export const CardBody = styled.div`
  width: 100%;
  padding: 1rem 2rem;
`

export const TabView = styled(Flex)``

export const TabViewItemWrapper = styled.div`
  width: 100%;
`

export const TabViewItem = styled.span<{ active?: boolean }>`
  display: inline-block;
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.04em;
  text-transform: capitalize;
  padding-bottom: 5px;
  color: ${({ active, theme }) => (active ? theme.colors.success : theme.colors.primaryGray)};
  ${({ active, theme }) => active && `border-bottom: 1px solid ${theme.colors.success};`}
  cursor: pointer;
`

export const TokenView = styled(Flex)<{ isMobile?: boolean }>`
  flex-wrap: wrap;
  ${({ isMobile }) => isMobile && `display: none;`}

  @media (max-width: 800px) {
    ${({ isMobile }) => (isMobile ? 'display: flex;' : 'display: none;')}
  }
`

export const TokenItem = styled(Flex)`
  width: 33.3%;
  padding: 8px 10px 8px 0px;

  @media (max-width: 800px) {
    width: 100%;
  }
`

export const StyledPagination = styled(Flex)`
  display: none;
  justify-content: center;
  margin-bottom: 16px;

  @media (max-width: 800px) {
    display: flex;
    width: 100%;
  }
`

export const StyledBullet = styled.div<{ active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ active, theme }) => (active ? theme.colors.success : '#F5F6F7')};
  margin: 0px 3px;
`
