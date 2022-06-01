import React, { useCallback, useEffect, useMemo, useState, lazy } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperClass } from 'swiper'
import { useTranslation } from 'contexts/Localization'
import TokenInfo from './TokenInfo'
import { StyledCard } from '../../shared'
import { CardBody, TabView, TabViewItemWrapper, TabViewItem, TokenView, StyledPagination, StyledBullet } from './styled'
import { TokenPriceDataType } from './types'

const fakeData: TokenPriceDataType[] = [
  {
    token: 'CryptoPlanes',
    address: '0x25E9d05365c867E59C1904E7463Af9F312296f9E',
    changePercent: 250.5,
  },
  {
    token: 'BEAGLE INU',
    address: '0x27DF46ddd86D9b7afe3ED550941638172eB2e623',
    changePercent: 150.5,
  },
  {
    token: 'HayFever',
    address: '0x1796ae0b0fa4862485106a0de9b654eFE301D0b2',
    changePercent: 50.5,
  },
  {
    token: 'CryptoPlanes1',
    address: '0x25E9d05365c867E59C1904E7463Af9F312296f9E',
    changePercent: 250.5,
  },
  {
    token: 'BEAGLE INU1',
    address: '0x27DF46ddd86D9b7afe3ED550941638172eB2e623',
    changePercent: 150.5,
  },
  {
    token: 'HayFever1',
    address: '0x1796ae0b0fa4862485106a0de9b654eFE301D0b2',
    changePercent: 50.5,
  },
  {
    token: 'CryptoPlanes2',
    address: '0x25E9d05365c867E59C1904E7463Af9F312296f9E',
    changePercent: 250.5,
  },
  {
    token: 'BEAGLE INU2',
    address: '0x27DF46ddd86D9b7afe3ED550941638172eB2e623',
    changePercent: 0,
  },
  {
    token: 'HayFever2',
    address: '0x1796ae0b0fa4862485106a0de9b654eFE301D0b2',
    changePercent: -50.5,
  },
]

const fakeData02: TokenPriceDataType[] = [
  {
    token: 'BEAGLE INU',
    address: '0x27DF46ddd86D9b7afe3ED550941638172eB2e623',
    changePercent: 150.5,
  },
  {
    token: 'HayFever',
    address: '0x1796ae0b0fa4862485106a0de9b654eFE301D0b2',
    changePercent: 50.5,
  },
  {
    token: 'CryptoPlanes1',
    address: '0x25E9d05365c867E59C1904E7463Af9F312296f9E',
    changePercent: 250.5,
  },
  {
    token: 'BEAGLE INU1',
    address: '0x27DF46ddd86D9b7afe3ED550941638172eB2e623',
    changePercent: 150.5,
  },
  {
    token: 'BEAGLE INU2',
    address: '0x27DF46ddd86D9b7afe3ED550941638172eB2e623',
    changePercent: 0,
  },
  {
    token: 'HayFever2',
    address: '0x1796ae0b0fa4862485106a0de9b654eFE301D0b2',
    changePercent: -50.5,
  },
]

interface TokenViewContainer {
  isMobile: boolean
  tokenData: TokenPriceDataType[]
}

const TokenViewContainer = ({ isMobile, tokenData }: TokenViewContainer) => (
  <TokenView isMobile={isMobile}>
    {tokenData.map((token, index) => (
      <TokenInfo
        key={`token-${token.token}`}
        token={token.token}
        address={token.address}
        rank={index + 1}
        percent={token.changePercent}
      />
    ))}
  </TokenView>
)

export default function TokenCard() {
  const { t } = useTranslation()

  const viewOpt = [
    {
      label: t('Top Tokens'),
      value: 'token',
      data: fakeData,
    },
    {
      label: t('Top Pools'),
      value: 'pool',
      data: fakeData02,
    },
  ]

  const [swiper, setSwiper] = useState<SwiperClass>()
  const [currentView, setCurrentView] = useState<string>(viewOpt[0].value)
  const [currentTokenData, setCurrentTokenData] = useState<TokenPriceDataType[]>(viewOpt[0].data)

  const handleSlideChange = (_swiper: SwiperClass) => {
    handleChangeView(_swiper.activeIndex)
  }

  const handleChangeView = (idx: number) => {
    setCurrentView(viewOpt[idx].value)
    setCurrentTokenData(viewOpt[idx].data)
    if (swiper) {
      swiper.slideTo(idx, 500)
    }
  }

  return (
    <>
      <StyledCard>
        <CardBody>
          <Swiper
            breakpoints={{
              800: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
            }}
            slidesPerView={1}
            spaceBetween={0}
            slidesPerGroup={1}
            onSlideChange={handleSlideChange}
            onInit={setSwiper}
          >
            {viewOpt.map((item, idx) => (
              <SwiperSlide key={`tabview-item-${item.value}`}>
                <TabViewItemWrapper>
                  <TabViewItem active={currentView === item.value} onClick={() => handleChangeView(idx)}>
                    {item.label}
                  </TabViewItem>
                </TabViewItemWrapper>
                <TokenViewContainer tokenData={item.data} isMobile />
              </SwiperSlide>
            ))}
          </Swiper>
          <TokenViewContainer tokenData={currentTokenData} isMobile={false} />
        </CardBody>
      </StyledCard>
      <StyledPagination>
        {viewOpt.map((item, idx) => (
          <StyledBullet
            key={`token-pagination-${item.value}`}
            active={currentView === item.value}
            onClick={() => handleChangeView(idx)}
          />
        ))}
      </StyledPagination>
    </>
  )
}
