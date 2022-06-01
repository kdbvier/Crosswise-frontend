import React, { useEffect, useRef } from 'react'
import Split from 'split-grid'
import { ArrowDownIcon, ChartIcon } from '@crosswise/uikit'
import debounce from 'lodash/debounce'
import delay from 'lodash/delay'
import { useAppDispatch } from 'state'
import { useGetPredictionsStatus, useIsChartPaneOpen, useIsHistoryPaneOpen } from 'state/predictions/hooks'
import { setChartPaneState } from 'state/predictions'
import { PredictionStatus } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import TradingView from '../components/TradingView'
import { ErrorNotification, PauseNotification } from '../components/Notification'
import History from '../History'
import Positions from '../Positions'
import { SplitWrapper, ExpandChartButton, ChartPane, HistoryPane, StyledDesktop, PositionPane, Gutter } from './styled'

// The value to set the chart when the user clicks the chart tab at the bottom
const GRID_TEMPLATE_ROW = '1.2fr 12px .8fr'

const Desktop: React.FC = () => {
  const splitWrapperRef = useRef<HTMLDivElement>()
  const chartRef = useRef<HTMLDivElement>()
  const gutterRef = useRef<HTMLDivElement>()
  const isHistoryPaneOpen = useIsHistoryPaneOpen()
  const isChartPaneOpen = useIsChartPaneOpen()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const status = useGetPredictionsStatus()

  const toggleChartPane = () => {
    const newChartPaneState = !isChartPaneOpen

    if (newChartPaneState) {
      splitWrapperRef.current.style.transition = 'grid-template-rows 150ms'
      splitWrapperRef.current.style.gridTemplateRows = GRID_TEMPLATE_ROW

      // Purely comedic: We only want to animate if we are clicking the open chart button
      // If we keep the transition on the resizing becomes very choppy
      delay(() => {
        splitWrapperRef.current.style.transition = ''
      }, 150)
    }

    dispatch(setChartPaneState(newChartPaneState))
  }

  useEffect(() => {
    const threshold = 100
    const handleDrag = debounce(() => {
      const { height } = chartRef.current.getBoundingClientRect()

      // If the height of the chart pane goes below the "snapOffset" threshold mark the chart pane as closed
      dispatch(setChartPaneState(height > threshold))
    }, 50)

    const split = Split({
      dragInterval: 1,
      snapOffset: threshold,
      onDrag: handleDrag,
      rowGutters: [
        {
          track: 1,
          element: gutterRef.current,
        },
      ],
    })

    return () => {
      split.destroy()
    }
  }, [gutterRef, chartRef, dispatch])

  return (
    <>
      {!isChartPaneOpen && (
        <ExpandChartButton
          variant="tertiary"
          scale="sm"
          startIcon={isChartPaneOpen ? <ArrowDownIcon /> : <ChartIcon />}
          onClick={toggleChartPane}
        >
          {isChartPaneOpen ? t('Close') : t('Charts')}
        </ExpandChartButton>
      )}
      <StyledDesktop>
        <SplitWrapper ref={splitWrapperRef}>
          <PositionPane>
            {status === PredictionStatus.ERROR && <ErrorNotification />}
            {status === PredictionStatus.PAUSED && <PauseNotification />}
            {status === PredictionStatus.LIVE && <Positions />}
          </PositionPane>
          <Gutter ref={gutterRef} />
          <ChartPane ref={chartRef}>
            <TradingView />
          </ChartPane>
        </SplitWrapper>
        <HistoryPane isHistoryPaneOpen={isHistoryPaneOpen}>
          <History />
        </HistoryPane>
      </StyledDesktop>
    </>
  )
}

export default Desktop
