import React from 'react'
import { Box } from '@crosswise/uikit'
import CurvedDivider from './CurvedDivider'
import { PageSectionProps } from './interfaces'
import { BackgroundColor, ChildrenWrapper } from './styled'

const PageSection: React.FC<PageSectionProps> = ({
  children,
  background,
  svgFill,
  index = 1,
  dividerComponent,
  dividerPosition = 'bottom',
  hasCurvedDivider = true,
  concaveDivider = false,
  clipFill,
  dividerFill,
  containerProps,
  innerProps,
  ...props
}) => {
  const getPadding = () => {
    // No curved divider
    if (!hasCurvedDivider) {
      return '48px 0'
    }
    // Bottom curved divider
    // Less bottom padding, as the divider is present there
    if (dividerPosition === 'bottom') {
      return '48px 0 14px'
    }
    // Top curved divider
    // Less top padding, as the divider is present there
    if (dividerPosition === 'top') {
      return '14px 0 48px'
    }
    return '48px 0'
  }

  return (
    <Box {...containerProps}>
      {hasCurvedDivider && dividerPosition === 'top' && (
        <CurvedDivider
          svgFill={svgFill}
          index={index}
          concave={concaveDivider}
          dividerPosition={dividerPosition}
          dividerComponent={dividerComponent}
          clipFill={clipFill}
          dividerFill={dividerFill}
        />
      )}
      <BackgroundColor background={background} index={index} getPadding={getPadding} {...props}>
        <ChildrenWrapper {...innerProps}>{children}</ChildrenWrapper>
      </BackgroundColor>
      {hasCurvedDivider && dividerPosition === 'bottom' && (
        <CurvedDivider
          svgFill={svgFill}
          index={index}
          concave={concaveDivider}
          dividerPosition={dividerPosition}
          dividerComponent={dividerComponent}
          clipFill={clipFill}
          dividerFill={dividerFill}
        />
      )}
    </Box>
  )
}

export default PageSection
