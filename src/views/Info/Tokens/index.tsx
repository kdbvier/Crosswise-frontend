import React, { useState, useMemo, useEffect } from 'react'
import { Text, Heading, Card, Flex, Box, Input } from '@crosswise/uikit'
import { IconWatchlist } from 'components/SvgIcons'
import TokenTable from 'views/Info/components/InfoTables/TokensTable'
import { CrosswisePlaceholderIcon } from 'views/OrderBook/Components/LimitOrderTable/styled'
import { useAllTokenData, useTokenDatas } from 'state/info/hooks'
import { useWatchlistTokens } from 'state/user/hooks'
import { useTranslation } from 'contexts/Localization'
import TopTokenMovers from 'views/Info/components/TopTokenMovers'
import { StyledCard, CardHeader, CardBody } from '../shared'

const TokensOverview: React.FC = () => {
  const { t } = useTranslation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [searchValue, setSearchValue] = useState('')
  const allTokens = useAllTokenData()

  const formattedTokens = useMemo(() => {
    return Object.values(allTokens)
      .map((token) => token.data)
      .filter((token) => token)
  }, [allTokens])

  const [savedTokens] = useWatchlistTokens()
  const watchListTokens = useTokenDatas(savedTokens)

  return (
    <>
      <Card>
        <Box p="1rem 0rem">
          <Flex mx="32px" mb="20px" alignItems="center">
            <Text fontSize="25px" fontWeight={500} mr="10px">
              {t('Your Watchlist')}
            </Text>
            <IconWatchlist />
          </Flex>
          {savedTokens.length > 0 ? (
            <TokenTable tokenDatas={watchListTokens} />
          ) : (
            <Flex justifyContent="center" alignItems="center" flexDirection="column">
              <CrosswisePlaceholderIcon />
              <Text px="24px" py="16px" textAlign="center">
                {t('It looks like you haven’t added any Tokens to your Watchlist')}
              </Text>
            </Flex>
          )}
        </Box>
      </Card>
      <TopTokenMovers />
      <StyledCard mt="32px">
        <CardHeader>
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="16px" fontWeight="700" marginRight="20px">
              {t('All Tokens')}
            </Text>
            <Box width="100%">
              <Input
                type="search"
                scale="lg"
                placeholder="Search"
                mx="auto"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </Box>
          </Flex>
        </CardHeader>
        <CardBody>
          <TokenTable tokenDatas={formattedTokens} />
        </CardBody>
      </StyledCard>
    </>
  )
}

export default TokensOverview
