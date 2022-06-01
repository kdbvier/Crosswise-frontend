import styled from 'styled-components'

export const TabMenuWrapper = styled.div`
  width: calc(100% - 80px);
  margin: 0 40px;

  @media (max-width: 800px) {
    margin-left: 0px;
    width: 100%;
  }
`

export const CrosswisePlaceholderIcon = styled.div`
  background: url('/images/icons/CrosswisePlaceholderIcon.png');
  background-size: cover;
  background-position: center;
  width: 125px;
  height: 135px;
`
