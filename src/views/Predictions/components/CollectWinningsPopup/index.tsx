import React, { useEffect, useRef, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Button, CloseIcon, IconButton, TrophyGoldIcon } from '@crosswise/uikit'
import { CSSTransition } from 'react-transition-group'
import { useTranslation } from 'contexts/Localization'
import { getBetHistory } from 'state/predictions/helpers'
import { useGetPredictionsStatus, useIsHistoryPaneOpen } from 'state/predictions/hooks'
import { useAppDispatch } from 'state'
import { setHistoryPaneState } from 'state/predictions'
import { Wrapper, Popup } from './styled'

const CollectWinningsPopup = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const ref = useRef(null)
  const timer = useRef(null)
  const { account } = useWeb3React()
  const predictionStatus = useGetPredictionsStatus()
  const isHistoryPaneOpen = useIsHistoryPaneOpen()
  const dispatch = useAppDispatch()

  const handleOpenHistory = () => {
    dispatch(setHistoryPaneState(true))
  }

  const handleClick = () => {
    setIsOpen(false)
    clearInterval(timer.current)
  }

  // Check user's history for unclaimed winners
  useEffect(() => {
    let isCancelled = false
    if (account) {
      timer.current = setInterval(async () => {
        const bets = await getBetHistory({ user: account.toLowerCase(), claimed: false })

        if (!isCancelled) {
          // Filter out bets that were not winners
          const winnerBets = bets.filter((bet) => {
            return bet.position === bet.round.position
          })

          if (!isHistoryPaneOpen) {
            setIsOpen(winnerBets.length > 0)
          }
        }
      }, 30000)
    }

    return () => {
      clearInterval(timer.current)
      isCancelled = true
    }
  }, [account, timer, predictionStatus, setIsOpen, isHistoryPaneOpen])

  // Any time the history pane is open make sure the popup closes
  useEffect(() => {
    if (isHistoryPaneOpen) {
      setIsOpen(false)
    }
  }, [isHistoryPaneOpen, setIsOpen])

  return (
    <CSSTransition in={isOpen} unmountOnExit nodeRef={ref} timeout={1000} classNames="popup">
      <Wrapper ref={ref}>
        <Popup>
          <TrophyGoldIcon width="64px" style={{ flex: 'none' }} mr="8px" />
          <Button style={{ flex: 1 }} onClick={handleOpenHistory}>
            {t('Collect Winnings')}
          </Button>
          <IconButton variant="text" onClick={handleClick}>
            <CloseIcon color="primary" width="24px" />
          </IconButton>
        </Popup>
      </Wrapper>
    </CSSTransition>
  )
}

export default CollectWinningsPopup
