import styled from 'styled-components'
import { gql } from 'graphql-request'
import { Card } from '@crosswise/uikit'

export const TableWrapper = styled.div`
  overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const ScrollButtonContainer = styled.div`
  margin: auto;
  padding-top: 5px;
  padding-bottom: 5px;
`

export const pullTxQuery = gql`
  {
    ethereum(network: bsc) {
      dexTrades(
        options: { limit: 100, desc: "timeInterval.minute" }
        smartContractAddress: { is: "0x0eD7e52944161450477ee417DE9Cd3a859b14fD0" }
        protocol: { is: "Uniswap v2" }
        baseCurrency: { is: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82" }
        quoteCurrency: { is: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" }
      ) {
        exchange {
          name
        }
        timeInterval {
          minute(count: 15)
        }
        baseCurrency {
          symbol
          address
        }
        baseAmount
        quoteCurrency {
          symbol
          address
        }
        quoteAmount
        trades: count
        tradeAmount(in: USD, calculate: sum)
        buyCurrency {
          address
        }
        transaction {
          hash
        }
      }
    }
  }
`

export const StyledCard = styled(Card)`
  background: none;
  width: 100%;
  z-index: 1;
  margin: 1rem 0;
`
