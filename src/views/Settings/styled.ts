import { Text } from '@crosswise/uikit'
import styled, { css } from 'styled-components'

export const SettingsHeader = styled.div`
  padding-top: 72px;
  padding-bottom: 32px;

  max-width: 1400px;
  margin: auto;
  @media only screen and (min-width: 370px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`

export const SettingHeaderLayout = styled.div`
  max-width: 1400px;
  margin: auto;
  position: relative;
`

export const SettingsHeadCard = styled.div<{ isDarkTheme: boolean }>`
  margin-bottom: 30px;
  padding: 40px;
  border-radius: 12px;
  position: relative;
  ${(props) =>
    props.isDarkTheme &&
    css`
    -webkit-backdrop-filter: blur(40px);
    backdrop-filter: blur(40px);
    box-shadow: 8px 8px 24px 0 rgba(9, 13, 20, 0.4), -4px -4px 8px 0 rgba(224, 224, 255, 0.04), 0 1px 1px 0 rgba(9, 13, 20, 0.4);
    border: solid 1px rgba(245, 247, 250, 0.06);
    background-image: linear-gradient(102deg, rgba(245, 247, 250, 0.12), rgba(245, 247, 250, 0.06) 52%, rgba(245, 247, 250, 0) 100%);c
    `}

  ${(props) =>
    !props.isDarkTheme &&
    css`
      box-shadow: 8px 8px 24px 0 rgba(9, 13, 20, 0.06), -4px -4px 8px 0 rgba(255, 255, 255, 0.4),
        0 1px 1px 0 rgba(9, 13, 20, 0.06);
      background-image: linear-gradient(102deg, #fff, #fafbfc 52%, #f5f7fa 100%);
    `}
`
export const HeaderTopBar = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

export const LabelWrapper = styled.div`
  display: flex;
  align-items: baseline;

  > ${Text} {
    font-size: 16px;
    padding-right: 8px;
    color: ${({ theme }) => theme.colors.textDisabled};
  }
`

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

export const Planet1 = styled.div`
  position: absolute;
  z-index: -1;
  top: 35px;
  left: -50px;
`

export const Planet2 = styled.div`
  position: absolute;
  z-index: -1;
  bottom: -120px;
  right: -130px;
`
