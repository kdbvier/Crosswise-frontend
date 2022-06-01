import React from 'react'
import { Card, CardBody, Heading } from '@crosswise/uikit'
import { Wrapper, CardWrapper, BunnyDecoration } from './styled'

interface NotificationProps {
  title: string
}

const Notification: React.FC<NotificationProps> = ({ title, children }) => {
  return (
    <Wrapper>
      <CardWrapper>
        <BunnyDecoration>
          <img src="/images/decorations/hiccup-bunny.png" alt="bunny decoration" height="121px" width="130px" />
        </BunnyDecoration>
        <Card>
          <CardBody>
            <Heading mb="24px">{title}</Heading>
            {children}
          </CardBody>
        </Card>
      </CardWrapper>
    </Wrapper>
  )
}

export default Notification
