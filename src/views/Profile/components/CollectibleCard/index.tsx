import React from 'react'
import { Text } from '@crosswise/uikit'
import { Nft } from 'config/constants/types'
import { PreviewImage } from './styled'

interface CollectibleCardProps {
  nft: Nft
}

const CollectibleCard: React.FC<CollectibleCardProps> = ({ nft }) => {
  return (
    <div>
      <PreviewImage src={`/images/nfts/${nft.images.lg}`} />
      <Text bold mb="8px">
        {nft.name}
      </Text>
      <Text as="p" fontSize="12px" color="textSubtle">
        {nft.description}
      </Text>
    </div>
  )
}

export default CollectibleCard
