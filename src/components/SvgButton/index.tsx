import React from 'react'
import { Button } from './styled'

interface SvgButtonProps {
  onClick?: any
  className?: any
}

const SvgButton: React.FC<SvgButtonProps> = (props) => {
  const { onClick, children, className } = props
  return (
    <Button className={className} onClick={onClick}>
      {children}
    </Button>
  )
}
export default SvgButton
