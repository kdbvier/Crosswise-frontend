import styled from 'styled-components'
import MultiplierTag from 'components/MultiplierTag'

export const ReferenceElement = styled.div`
  display: inline-block;
`

export const MultiplierWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text};
  /* width: 36px; */
  text-align: center;
  margin-right: 14px;
  padding: 5px;
  border-radius: 15px;

  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: left;
    margin-right: 0;
  }

  --borderWidth: 1px;
  --background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0.06) 45.83%,
      rgba(255, 255, 255, 0) 100%
    ),
    #25272c;

  background: var(--background);
  background-clip: padding-box;
  border: solid var(--borderWidth) transparent;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: calc(0px - var(--borderWidth));
    border-radius: inherit;
    background: linear-gradient(90deg, #8c39ff 100%, #21bbff 100%);
  }
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`

export const StyledMultiplierTag = styled(MultiplierTag)`
  margin-left: 10px;
`
