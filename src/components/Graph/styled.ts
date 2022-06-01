import styled, { css } from 'styled-components'

export const LinearChartCursor = styled.div`
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(180deg, #04f8ad 0%, #3f81ef 50%, #8750f4 100%);

  &:before {
    content: ' ';
    position: absolute;
    left: 2px;
    right: 2px;
    top: 2px;
    bottom: 2px;
    border-radius: 50%;
    background-color: #10171b;
  }
`

export const LinearChartContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
  padding-left: 20px;
  padding-bottom: 20px;

  &:before {
    content: ' ';
    position: absolute;
    left: 84px;
    right: 0px;
    top: 0px;
    bottom: 55px;
    background: transparent;
    border-left: 1px solid #818ea3;
    border-bottom: 1px solid #818ea3;
    border-bottom-left-radius: 20px;
  }

  .recharts-cartesian-grid-horizontal {
    line:first-child {
      display: none;
    }
  }
`
export const ChartContentContainer = styled.div`
  position: relative;
  width: 180px;
  height: 90px;
  background: ${({ theme }) => theme.colors.homeCardBackground};
  border: 1px solid rgba(224, 224, 255, 0.24);
  box-shadow: -3px 1px 14px 0px #fafffe0d;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  align-items: center;
  box-shadow: 1px 4px 44px 1px #0000004d;
`
export const ChartValueContainer = styled.div`
  position: absolute;
  width: 180px;
  height: 65px;
  bottom: 0;
  background: ${({ theme }) => theme.colors.homeCardBackground};
  border: 1px solid rgba(224, 224, 255, 0.24);
  box-shadow: -3px 1px 14px 0px #fafffe0d;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
`
