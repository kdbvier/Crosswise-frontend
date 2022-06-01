import React from 'react'
import { Spinner } from '@crosswise/uikit'
import { Wrapper } from './styled'

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  )
}

export default PageLoader
