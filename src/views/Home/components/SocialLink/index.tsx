import React from 'react'
import { TelegramIcon, GithubIcon, DiscordIcon, TwitterIcon, MediumIcon } from '@crosswise/uikit'
import { Container, LinkWrapper } from './styled'

const SocialLink = () => {
  return (
    <Container>
      <LinkWrapper target="_blank" href="https://t.me/crosswise">
        <TelegramIcon color="#00B8B9" width="20px" />
      </LinkWrapper>
      <LinkWrapper target="_blank" href="https://github.com/crosswise-finance/">
        <GithubIcon color="#00B8B9" width="20px" />
      </LinkWrapper>
      <LinkWrapper target="_blank" href="https://discord.gg/4BuwxMz24J">
        <DiscordIcon color="#00B8B9" width="20px" />
      </LinkWrapper>
      <LinkWrapper target="_blank" href="https://twitter.com/crosswisefi">
        <TwitterIcon color="#00B8B9" width="20px" />
      </LinkWrapper>
      <LinkWrapper target="_blank" href="https://crosswise.medium.com/">
        <MediumIcon color="#00B8B9" width="20px" />
      </LinkWrapper>
    </Container>
  )
}

export default SocialLink
