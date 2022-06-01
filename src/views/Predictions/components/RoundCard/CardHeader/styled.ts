import styled, { DefaultTheme } from 'styled-components'

type Status = 'expired' | 'live' | 'next' | 'soon' | 'canceled' | 'calculating'

const HEADER_HEIGHT = '37px'

const getBackgroundColor = (theme: DefaultTheme, status: Status) => {
  switch (status) {
    case 'calculating':
      return theme.colors.gradients.cardHeader
    case 'live':
      return 'transparent'
    case 'canceled':
      return theme.colors.warning
    case 'next':
      return theme.colors.secondary
    case 'expired':
    case 'soon':
    default:
      return theme.colors.cardBorder
  }
}

export const StyledCardHeader = styled.div<{ status: Status }>`
  align-items: center;
  background: ${({ theme, status }) => getBackgroundColor(theme, status)};
  display: flex;
  justify-content: space-between;
  height: ${HEADER_HEIGHT};
  padding: ${({ status }) => (status === 'live' ? '16px' : '8px')};
`

export const Round = styled.div`
  justify-self: center;
`
