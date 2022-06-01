import React from 'react'
import { Nft } from 'config/constants/types'
import { Container, StyledImage, StyledVideo } from './styled'

interface PreviewProps {
  nft: Nft
  isOwned?: boolean
}

const Preview: React.FC<PreviewProps> = ({ nft, isOwned = false }) => {
  const { images, name, video } = nft
  const previewImageSrc = `/images/nfts/${images.lg}`

  if (video) {
    const videoComponent = (
      <StyledVideo autoPlay controls={false} loop muted poster={previewImageSrc}>
        <source src={video.webm} type="video/webm" />
        <source src={video.mp4} type="video/mp4" />
      </StyledVideo>
    )

    return isOwned ? (
      <a href={images.ipfs} target="_blank" rel="noreferrer noopener">
        {videoComponent}
      </a>
    ) : (
      videoComponent
    )
  }

  const previewImage = <StyledImage src={previewImageSrc} alt={name} />

  return (
    <Container>
      {isOwned ? (
        <a href={images.ipfs} target="_blank" rel="noreferrer noopener">
          {previewImage}
        </a>
      ) : (
        previewImage
      )}
    </Container>
  )
}

export default Preview
