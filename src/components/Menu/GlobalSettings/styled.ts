import styled from 'styled-components'
import { Modal } from '@crosswise/uikit'

// TODO: Temporary. Once uikit is merged with this style change, this can be removed.
export const CrosswiseToggleWrapper = styled.div`
  .pancakes {
    position: absolute;
  }
`

export const StyledModal = styled(Modal)`
  div {
    overflow-y: unset;
  }
`

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #c4c4c4;
  opacity: 0.1;
`

export const SlippageButton = styled.div`
  width: 64px;
  background: ${({ theme }) => theme.colors.input};
  box-shadow: inset 0px 1px 9px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  margin-right: 8px;
  cursor: pointer;
  font-size: 18px;
  line-height: 33px;
  letter-spacing: 0.035em;
  color: ${({ theme }) => theme.colors.textSecondary};

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 0 0 auto;
`
