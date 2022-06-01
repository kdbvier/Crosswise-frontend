import styled from 'styled-components'

export const Wrapper = styled.div`
  .EasyMDEContainer .CodeMirror {
    background: ${({ theme }) => theme.colors.input};
    border-color: ${({ theme }) => theme.colors.cardBorder};
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    box-shadow: ${({ theme }) => theme.shadows.inset};
    padding: 16px;
  }

  .CodeMirror-code {
    color: ${({ theme }) => theme.colors.text};
  }

  .editor-toolbar {
    background: ${({ theme }) => theme.card.background};
    border-color: ${({ theme }) => theme.colors.cardBorder};
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    color: ${({ theme }) => theme.colors.text};

    a,
    button {
      color: ${({ theme }) => theme.colors.text};

      &:hover,
      &.active {
        background: ${({ theme }) => theme.colors.background};
        border: 0;
      }
    }
  }
`
