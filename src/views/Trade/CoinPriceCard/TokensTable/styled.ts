import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { CurrencyLogo } from 'views/Info/components/CurrencyLogo'

/**
 *  Columns on different layouts
 *  6 = | # | Name | Price | Price Change | Volume 24H | TVL |
 *  5 = | # | Name | Price |              | Volume 24H | TVL |
 *  4 = | # | Name | Price |              | Volume 24H |     |
 *  2 = |   | Name |       |              | Volume 24H |     |
 *  On smallest screen Name is reduced to just symbol
 */
export const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  align-items: center;

  grid-template-columns: 40px 3fr repeat(4, 1fr);

  @media screen and (max-width: 900px) {
    grid-template-columns: 40px 2fr repeat(3, 1fr);
    & :nth-child(6) {
      display: none;
    }
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: 40px 2fr repeat(2, 1fr);
    & :nth-child(5) {
      display: none;
    }
  }

  @media screen and (max-width: 670px) {
    grid-template-columns: 40px 1fr 1fr;
    > *:nth-child(4) {
      display: none;
    }
  }
`

export const LinkWrapper = styled(Link)`
  text-decoration: none;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

export const ResponsiveLogo = styled(CurrencyLogo)`
  @media screen and (max-width: 670px) {
    width: 20px;
    height: 20px;
  }
`
