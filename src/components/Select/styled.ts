import styled, { css } from 'styled-components'

export const DropDownHeader = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
  box-shadow: ${({ theme }) => theme.shadows.inset};
  border: 0px solid ${({ theme }) => theme.colors.inputSecondary};
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.input};
  transition: border-radius 0.15s;
`

export const DropDownListContainer = styled.div`
  min-width: 136px;
  height: 0;
  position: absolute;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.dropdown};
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  transition: transform 0.15s, opacity 0.15s;
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 168px;
  }
`

export const DropDownContainer = styled.div<{ isOpen: boolean; width: number; height: number }>`
  cursor: pointer;
  width: ${({ width }) => width}px;
  position: relative;
  background: ${({ theme }) => theme.colors.input};
  border-radius: 6px;
  height: 48px;
  min-width: 136px;
  user-select: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 168px;
  }

  ${(props) =>
    props.isOpen &&
    css`
      ${DropDownHeader} {
        border-bottom: 1px solid ${({ theme }) => theme.colors.inputSecondary};
        box-shadow: ${({ theme }) => theme.tooltip.boxShadow};
        border-radius: 6px 6px 0 0;
      }

      ${DropDownListContainer} {
        height: auto;
        transform: scaleY(1);
        opacity: 1;
        // border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
        border-top-width: 0;
        border-radius: 0 0 6px 6px;
        box-shadow: ${({ theme }) => theme.tooltip.boxShadow};
      }
    `}

  svg {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
`

export const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background: ${({ theme }) => (theme.isDark ? '#364340' : '#eaf2fa')};
  z-index: ${({ theme }) => theme.zIndices.dropdown};
`

export const ListItem = styled.li`
  list-style: none;
  padding: 8px 16px;
  &:hover {
    /* background: ${({ theme }) => theme.colors.inputSecondary}; */
    background: linear-gradient(270deg, rgba(140, 57, 255, 0.15) 5.49%, rgb(33, 139, 255, 0.15) 100%);
  }
`
