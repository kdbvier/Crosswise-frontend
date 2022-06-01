import styled from 'styled-components'
import { Flex, Button, Text, CheckmarkIcon } from '@crosswise/uikit'
import { IconSwapVert, IconPencil } from 'components/SvgIcons'

export const RoiModalHeader = styled(Flex)`
  color: ${({ theme }) => theme.colors.bluePalette.main};
  padding: 8px 20px 14px 20px;
  border-bottom: 1px solid #c4c4c41a;
`

export const RoiModalNoPadContainer = styled.div`
  margin: 0px -25px -25px -25px;
`
export const RoiModalContainer = styled.div`
  padding: 0px 25px 25px 25px;
`

export const SubTitle = styled.div`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primaryGray};
`

export const RoiButton = styled(Button)`
  font-size: 12px;
  line-height: 15px;
  padding: 10px 10px;
  margin-right: 20px;
  &:last-child {
    margin-right: 0px;
  }
`

export const BalanceText = styled(Text)`
  font-size: 10px;
  font-weight: 600;
  margin-bottom: 15px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`

export const Panel = styled(Flex)`
  padding: 12px;
  box-shadow: inset 0px 1px 9px rgba(0, 0, 0, ${({ theme }) => (theme.isDark ? '0.85' : '0.15')});
  border-radius: 6px;
  background: rgba(234, 242, 250, 0.1);
`

export const MainText = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.primaryGray};
`

export const SubText = styled(Text)`
  font-size: 10px;
  font-weight: 600;
  line-height: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primaryGray};
`

export const TransparentInput = styled.input`
  background: transparent;
  border-radius: 0px;
  box-shadow: none;
  padding-left: 0px;
  padding-right: 0px;
  border: none;
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primaryGray};

  &:focus-visible {
    outline: none;
  }
`

export const PopupBox = styled.div`
  position: absolute;
  left: 0px;
  top: 120px;
  background: ${({ theme }) => theme.colors.bluePalette.light};
  box-shadow: 1px 4px 44px rgba(0, 0, 0, 0.3);
  border: 1px solid #dbe2eb;
  border-radius: 10px;
  padding: 30px 18px;
  font-size: 13px;
  line-height: 21px;
  letter-spacing: 0.035em;
  color: ${({ theme }) => theme.colors.bluePalette.darkBG};
  width: 344px;
  z-index: 10;

  ${({ theme }) => theme.mediaQueries.xl} {
    left: calc(100% + 20px);
    top: 0px;
  }
`

export const StyledLink = styled.a`
  font-size: 13px;
  line-height: 33px;
  letter-spacing: 0.035em;
  font-weight: 600;
  display: flex;
  align-items: center;
`

export const StyledSwapVertIcon = styled(IconSwapVert)`
  fill: ${({ theme }) => theme.colors.bluePalette.main};
`

export const StyledPencilIcon = styled(IconPencil)`
  fill: ${({ theme }) => theme.colors.bluePalette.main};
`

export const StyledCheckmarkIcon = styled(CheckmarkIcon)`
  fill: ${({ theme }) => theme.colors.bluePalette.main};
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(4, auto);
  padding: 0 15px;
  margin-bottom: 12px;
`
export const GridItem = styled.div<{ bold?: boolean }>`
  font-weight: ${({ bold }) => (bold ? 'bold' : '400')};
`

export const BulletList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;

  li {
    position: relative;
    margin: 0;
    padding: 0;
    padding-left: 10px;
  }

  li::before {
    content: '•';
    position: absolute;
    top: 0px;
    left: 0px;
  }

  li::marker {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textSubtle};
  }
`
