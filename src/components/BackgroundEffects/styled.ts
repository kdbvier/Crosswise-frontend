import styled, { keyframes, css } from 'styled-components'

const fall = keyframes`
  to {
    transform: translate3d(-30em, 0, 0);
  }
`

const tailFade = keyframes`
  0%,
  50% {
    width: var(--star-tail-length);
    opacity: 1;
  }

  70%,
  80% {
    width: 0;
    opacity: 0.4;
  }

  100% {
    width: 0;
    opacity: 0;
  }
`

const blink = keyframes`
  50% {
    opacity: 0.6;
  }
`

const showTwinkling = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const movingTwinkling = keyframes`
  from {
		transform: translate3d(0px, 0px, 0px);
	}
	to { 
		transform: translate3d(1000px, 0px, 0px);
	}
`

const makeFloatKeyFrame = (position: string, random: any) => {
  return keyframes`
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(${['rt', 'rb'].includes(position) ? '-' : ''}${random ? random(10, 1000) / 10 : 50}%)
    }
    100% {
      transform: translateX(0);
    }
  `
}

export const StarsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 80vw;
  height: 90vh;
  transform: rotate(-45deg);
  overflow: hidden;
`

export const Star = styled.div<{ random: any }>`
  /* $star-count: 50; */
  --top-offset: ${({ random }) => `${random(0, 10000) / 100}vh`};
  --star-color: ${({ theme }) => (theme.isDark ? 'white' : 'white')};
  --star-tail-length: ${({ random }) => `${random(500, 750) / 100}em`};
  --star-tail-height: 2px;
  --star-width: calc(var(--star-tail-length) / 6);
  --fall-duration: ${({ random }) => `${random(12000, 24000) / 1000}s`};
  --tail-fade-duration: var(--fall-duration);
  --fall-delay: ${({ random }) => `${random(0, 10000) / 1000}s`};

  position: absolute;
  top: var(--top-offset);
  left: 0;
  width: var(--star-tail-length);
  height: var(--star-tail-height);
  color: var(--star-color);
  background: linear-gradient(45deg, var(--star-color), transparent);
  border-radius: 50%;
  filter: drop-shadow(0 0 6px var(--star-color));
  transform: translate3d(104em, 0, 0);
  animation: ${fall} var(--fall-duration) var(--fall-delay) linear infinite,
    ${tailFade} var(--tail-fade-duration) var(--fall-delay) ease-out infinite;

  &::before,
  &::after {
    position: absolute;
    content: '';
    top: 0;
    left: calc(var(--star-width) / -2);
    width: var(--star-width);
    height: 100%;
    background: linear-gradient(45deg, transparent, var(--star-color), transparent);
    border-radius: inherit;
    animation: ${blink} 2s linear infinite;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`

export const SparklingStars = styled.div`
  background: url('/images/home/stars/stars.png') repeat;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

export const Twinkling = styled.div`
  width: 10000px;
  height: 100%;
  background: transparent url('/images/home/stars/twinkling.png') repeat;
  background-size: 1000px 1000px;
  position: absolute;
  right; 0;
  top: 0;
  bottom: 0;
  animation: ${movingTwinkling} 70s linear infinite, ${showTwinkling} 0.5s linear 5s;
`

export const Planet = styled.div<{
  imageIndex?: number
  imageUrl?: string
  position: string
  width?: number
  height?: number
  random?: any
  notFloat?: boolean
}>`
  --float-delay: ${({ random }) => `${random ? random(0, 5000) / 1000 : 10}s`};
  --float-duration: ${({ random }) => `${random ? random(150000, 200000) / 1000 : 10}s`};

  background-image: ${({ imageUrl, imageIndex }) =>
    `url(${imageUrl || `/images/home/planets/planet-${imageIndex || 9}.png`})`};
  position: absolute;
  background-repeat: no-repeat;
  ${({ position }) =>
    position === 'lt' &&
    css`
      top: 50px;
      left: 0px;
    `}
  ${({ position }) =>
    position === 'lb' &&
    css`
      bottom: 50px;
      left: 0px;
    `}
  ${({ position }) =>
    position === 'rt' &&
    css`
      top: 400px;
      right: 150px;
    `}
  ${({ position }) =>
    position === 'rb' &&
    css`
      bottom: 50px;
      right: 150px;
    `}
  width: ${({ width }) => `${width || 100}px`};
  height: ${({ height }) => `${height || 100}px`};
  ${({ notFloat, random, position }) =>
    notFloat !== false &&
    css`
      animation: ${makeFloatKeyFrame(position, random)} var(--float-duration) var(--float-delay) linear infinite;
      animation-fill-mode: both;
    `}
`

export const Satellite = styled.div<{ rowCols: number }>`
  --positionX: 8;
  --positionY: 0;

  position: absolute;
  background-image: url('/images/home/satellite/satellite.png');
  left: ${({ rowCols }) => `calc(var(--positionX) * ${100 / rowCols}%)`};
  top: ${({ rowCols }) => `calc(var(--positionY) * ${100 / rowCols}%)`};
  width: 299px;
  height: 146px;
  transition: all 40s;
`

export const BackgroundWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
`

export const SatelliteWrapper = styled(BackgroundWrapper)<{ rowCols: number }>`
  display: grid;
  grid-template: ${({ rowCols }) => `repeat(${rowCols}, 1fr) / repeat(${rowCols}, 1fr)`};
  pointer-events: all;
`

export const BackgroundCell = styled.div<{ row: number; col: number }>`
  width: 100%;
  height: 100%;
  /* border: 1px solid #fff1; */
  /* &:hover ~ ${Satellite} {
    --positionX: ${({ col }) => col};
    --positionY: ${({ row }) => row};
  } */
`
