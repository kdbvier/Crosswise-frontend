import styled from 'styled-components'

export const TableContainer = styled.div`
  width: 100%;
  position: relative;
`

export const StyledTable = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
`

export const TableHeader = styled.thead`
  th {
    text-align: left;
    color: #fff;
    font-weight: 500;
    font-size: 14px;
  }
`

export const TableBody = styled.tbody`
  & tr {
    td {
      vertical-align: middle;
      text-overflow: ellipsis;
      overflow: hidden;
      padding-top: 30px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(224, 224, 255, 0.6);
    }
  }
`
