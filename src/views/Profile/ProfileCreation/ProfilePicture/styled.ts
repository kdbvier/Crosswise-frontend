import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'

export const Link = styled(RouterLink)`
  color: ${({ theme }) => theme.colors.primary};
`

export const NftWrapper = styled.div`
  margin-bottom: 24px;
`
