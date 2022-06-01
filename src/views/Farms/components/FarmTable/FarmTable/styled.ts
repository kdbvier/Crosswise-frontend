import styled from 'styled-components'

export const Container = styled.div`
  filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;
  /* opacity: 0.9; */

  border-radius: 16px;
  margin: 16px 0px;

  /* -webkit-backdrop-filter: blur(40px);
  backdrop-filter: blur(40px); */
  /* box-shadow: 1px 4px 44px 1px rgb(0 0 0 / 30%); */
  /* box-shadow: 8px 8px 24px 0 rgba(9, 13, 20, 0.4), -4px -4px 8px 0 rgba(224, 224, 255, 0.04),
    0 1px 1px 0 rgba(9, 13, 20, 0.4); */
  /* border: solid 1px rgba(245, 247, 250, 0.06); */
  /* background: linear-gradient(
    110deg,
    rgba(245, 247, 250, 0.12),
    rgba(245, 247, 250, 0.06) 52%,
    rgba(245, 247, 250, 0) 100%
  ); */
  /* border: ${({ theme }) => (theme.isDark ? '1px solid rgba(224, 224, 255, 0.22)' : 'none')}; */
  /* background: ${({ theme }) => (theme.isDark ? '#091713' : '#FFF')}; */
  /* background: ${({ theme }) =>
    theme.isDark
      ? 'linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 45.83%, rgba(255, 255, 255, 0) 100%), #25272C;'
      : '#FFF'}; */

  border: none;
  background: transparent;
`

export const TableWrapper = styled.div`
  overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`

/* export const StyledTable = styled.table` */
export const StyledTable = styled.div`
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`

/* export const TableBody = styled.tbody` */
export const TableBody = styled.div`
  & tr {
    td {
      font-size: 16px;
      vertical-align: middle;
    }
  }
`

export const TableContainer = styled.div`
  position: relative;
`

export const ScrollButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
`
