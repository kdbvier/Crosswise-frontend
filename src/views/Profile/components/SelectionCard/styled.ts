import styled from 'styled-components'

export const Label = styled.label<{ isDisabled: boolean }>`
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: ${({ isDisabled }) => (isDisabled ? '0.6' : '1')};
`

export const Body = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  height: 80px;
  padding: 8px 16px;
`

export const Children = styled.div`
  margin-left: 16px;
`

export const StyledBackgroundImage = styled.div<{ src: string }>`
  align-self: stretch;
  background-image: url('${({ src }) => src}');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  flex: none;
  width: 80px;
`
