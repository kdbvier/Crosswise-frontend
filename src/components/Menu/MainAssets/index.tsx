import React from 'react'
// import { useWeb3React } from '@web3-react/core'
// import { Flex, BinanceIcon, CardIcon } from '@crosswise/uikit'
import { Flex, CardIcon } from '@crosswise/uikit'
import useTokenBalance from 'hooks/useTokenBalance'
import { getFullDisplayBalance } from 'utils/formatBalance'
import {
  getCrssAddress,
  // getXCrssAddress
} from 'utils/addressHelpers'
// import { NetworkBlock, Block, StyledContent } from './styled'
import { Block, StyledContent } from './styled'

const MainAssets = () => {
  // const { account } = useWeb3React()
  const { balance: crssBalance } = useTokenBalance(getCrssAddress())
  // const { balance: xcrssBalance } = useTokenBalance(getXCrssAddress())

  return (
    <Flex>
      {/* <Block>
        <CardIcon />
        <StyledContent>{getFullDisplayBalance(xcrssBalance, 18, 2)} XCRSS</StyledContent>
      </Block> */}
      <Block>
        <CardIcon />
        <StyledContent>{getFullDisplayBalance(crssBalance, 18, 2)} CRSS</StyledContent>
      </Block>
      {/* <Block>
        <StyledContent>0.00 MATIC</StyledContent>
      </Block> */}
    </Flex>
  )
}

export default MainAssets
