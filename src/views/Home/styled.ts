import styled from 'styled-components'
import Page from 'components/Layout/Page'
import { BaseLayout, Text } from '@crosswise/uikit'
import Row from 'components/Layout/Row'

export const StyledPage = styled(Page)`
  /* background-image: url('/images/home/planets/planet-9.png'), url('/images/home/planets/planet-10.png'),
    url('/images/home/planets/planet-11.png'), url('/images/home/satellite/satellite.png'),
    url('/images/home/fire/fire.png');
  background-repeat: no-repeat;
  background-position: top 50px left, bottom 50px left, top 150px right, top -50px right, bottom right 50px;
  background-size: 250px, 100px, 300px, 300px, 100px;
  overflow: show; */
`

export const CardsRow = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;
  margin-top: 32px;
  width: 100%;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

export const Label = styled(Text)``

export const SubCardsRow = styled(CardsRow)`
  margin-bottom: 0;
  margin-top: 0;
`
export const StyledRow = styled(Row)`
  background: ${({ theme }) => theme.colors.homeCardBackground};
  border: 1px solid rgba(224, 224, 255, 0.24);
  box-sizing: border-box;
  box-shadow: 1px 4px 44px 1px #0000004d;
  border-radius: 23px;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`
