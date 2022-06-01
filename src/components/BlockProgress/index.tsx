import React from 'react'
import { Progress } from '@crosswise/uikit'
import { useBlock } from 'state/block/hooks'
import { BlockProgressProps } from './interfaces'

const BlockProgress: React.FC<BlockProgressProps> = ({ startBlock, endBlock, ...props }) => {
  const { currentBlock } = useBlock()
  const rawProgress = ((currentBlock - startBlock) / (endBlock - startBlock)) * 100
  const progress = rawProgress <= 100 ? rawProgress : 100

  return <Progress primaryStep={progress} {...props} />
}

export default BlockProgress
