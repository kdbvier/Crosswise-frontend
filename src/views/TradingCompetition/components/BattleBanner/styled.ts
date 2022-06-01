import { Text, Heading } from '@crosswise/uikit'
import styled from 'styled-components'
import { Heading1Text, Heading2Text } from '../CompetitionHeadingText'

export const TextStyles = (theme) => `
  text-align: center;
  ${theme.mediaQueries.md} {
    text-align: left;
  }
`

export const ImageWrapper = styled.div`
  width: 75%;
  margin: 0 auto;
  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`

export const StyledText = styled(Text)`
  ${({ theme }) => TextStyles(theme)}
`

export const StyledHeading1Text = styled(Heading1Text)`
  ${({ theme }) => TextStyles(theme)}
`

export const StyledHeading2Text = styled(Heading2Text)`
  ${({ theme }) => TextStyles(theme)}
`

export const StyledHeading = styled(Heading)`
  ${({ theme }) => TextStyles(theme)}
`
