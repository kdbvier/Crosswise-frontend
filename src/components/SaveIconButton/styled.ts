import styled, { keyframes } from 'styled-components'
import GearIcon from './GearIcon'

const RotateEffectClockwise = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`

const RotateEffectCounterClockwise = keyframes`
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0);
  }
`

export const Wrapper = styled.div<{ visible: boolean }>`
  width: 32px;
  height: 32px;
  position: relative;
  cursor: pointer;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.5s;
  &:hover {
    & > svg {
      &:nth-child(even) {
        animation: ${RotateEffectClockwise} 1s linear infinite;
      }
      &:nth-child(odd) {
        animation: ${RotateEffectCounterClockwise} 1s linear infinite;
      }
      .svg-stroke {
        stroke-width: 0.5;
      }
    }
  }
`

export const Gear1 = styled(GearIcon)<{ size }>`
  /* transform: ${({ size }) => `scale(${(size ?? 19) / 19})`}; */
  position: absolute;
  left: 0;
  top: 0;
`

export const Gear2 = styled(GearIcon)<{ size }>`
  /* transform: ${({ size }) => `scale(${(size ?? 19) / 19})`}; */
  position: absolute;
  right: 0;
  top: 10px;
`

export const Gear3 = styled(GearIcon)<{ size }>`
  /* transform: ${({ size }) => `scale(${(size ?? 19) / 19})`}; */
  position: absolute;
  bottom: 1px;
  left: 7px;
`
