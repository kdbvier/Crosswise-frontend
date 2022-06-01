import React from 'react'
import { Heading, Card, CardBody } from '@crosswise/uikit'
import { Inner, NumberWrapper, TitleWrapper, ChildrenWrapper } from './styled'

interface HowToCardProps {
  number?: number
  title?: string
}
const HowToJoin: React.FC<HowToCardProps> = ({ number, title, children }) => {
  return (
    <Card mb="16px">
      <CardBody>
        <Inner>
          <NumberWrapper>
            <Heading color="textSubtle">{number}</Heading>
          </NumberWrapper>
          <TitleWrapper>
            <Heading color="secondary">{title}</Heading>
          </TitleWrapper>
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </Inner>
      </CardBody>
    </Card>
  )
}

export default HowToJoin
