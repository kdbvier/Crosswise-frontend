import { TokenPairImageProps as UIKitTokenPairImageProps, ImageProps } from '@crosswise/uikit'
import { Token } from 'config/constants/types'

export interface TokenPairImageProps extends Omit<UIKitTokenPairImageProps, 'primarySrc' | 'secondarySrc'> {
  primaryToken: Token
  secondaryToken: Token
}

export interface TokenImageProps extends ImageProps {
  token: Token
}
