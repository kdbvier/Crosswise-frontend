import styled from 'styled-components'

const FlexLayout = styled.div<{ justifyContent?: string }>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || 'center'};
  flex-wrap: wrap;
  & > * {
    min-width: 280px;
    max-width: 31.5%;
    width: 100%;
    margin: 0 8px;
    margin-bottom: 32px;
  }
  @media screen and (max-width: 1220px) {
    justify-content: center;
  }
`

export default FlexLayout
