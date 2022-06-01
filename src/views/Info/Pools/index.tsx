import React, { useState, useMemo } from 'react'
import { Text, Heading, Card, Flex, Box, Input } from '@crosswise/uikit'
import { IconWatchlist } from 'components/SvgIcons'
import PoolTable from 'views/Info/components/InfoTables/PoolsTable'
import { CrosswisePlaceholderIcon } from 'views/OrderBook/Components/LimitOrderTable/styled'
import { useAllPoolData, usePoolDatas } from 'state/info/hooks'
import { useWatchlistPools } from 'state/user/hooks'
import { useTranslation } from 'contexts/Localization'
import { StyledCard, CardHeader, CardBody } from '../shared'

const PoolsOverview: React.FC = () => {
  const { t } = useTranslation()

  const [searchValue, setSearchValue] = useState('')
  // get all the pool datas that exist
  const allPoolData = useAllPoolData()
  const poolDatas = useMemo(() => {
    return Object.values(allPoolData)
      .map((pool) => pool.data)
      .filter(
        (pool) =>
          pool &&
          (searchValue.length === 0 ||
            `${pool.token0.name}/${pool.token1.name}`.toLowerCase().includes(searchValue.toLowerCase())),
      )
  }, [allPoolData, searchValue])

  const [savedPools] = useWatchlistPools()
  const watchlistPools = usePoolDatas(savedPools)

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
          {watchlistPools.length > 0 ? (
            <PoolTable poolDatas={watchlistPools} />
          ) : (
            <Flex justifyContent="center" alignItems="center" flexDirection="column">
              <CrosswisePlaceholderIcon />
              <Text px="24px" py="16px" textAlign="center">
                {t('It looks like you haven’t added any Pools to your Watchlist')}
              </Text>
            </Flex>
          )}
        </Box>
      </Card>
      <StyledCard mt="32px">
        <CardHeader>
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="16px" fontWeight="700" marginRight="20px">
              {t('All Pools')}
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
          <PoolTable poolDatas={poolDatas} />
        </CardBody>
      </StyledCard>
    </>
  )
}

export default PoolsOverview
