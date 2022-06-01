import React, { useEffect, Dispatch, SetStateAction } from 'react'
import { Text } from '@crosswise/uikit'
import { format } from 'date-fns'
import { formatAmount } from 'views/Info/utils/formatInfoNumbers'
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts'
import { useTheme } from 'styled-components'
import { LinearChartContainer, LinearChartCursor, ChartContentContainer, ChartValueContainer } from './styled'

export interface LinearChartData {
  time: number
  value: number
}

const CustomizedActiveDot: React.FC<{ cx?: number; cy?: number; r?: number }> = ({ cx, cy, r }) => {
  return (
    <>
      <circle cx={cx} cy={cy} r={9} fill="url(#colorUv2)" />
      <circle cx={cx} cy={cy} r={7} fill="#10171B" />
    </>
  )
}

interface LinearChartProps {
  data: LinearChartData[]
  setHoverValue?: Dispatch<SetStateAction<number | undefined>> // used for value on hover
  setHoverDate?: Dispatch<SetStateAction<string | undefined>> // used for label of value
}
// Calls setHoverValue and setHoverDate when part of chart is hovered
// Note: this NEEDs to be wrapped inside component and useEffect, if you plug it as is it will create big render problems (try and see console)
const HoverUpdater = ({ payload, setHoverValue, setHoverDate }) => {
  useEffect(() => {
    if (setHoverValue) setHoverValue(payload.value)
    if (setHoverDate) setHoverDate(format(new Date(payload.fullTime), 'MMM d, yyyy HH:mm'))
  }, [payload, setHoverValue, setHoverDate])

  return null
}

const LinearChart = ({ data, setHoverValue, setHoverDate }: LinearChartProps) => {
  const theme = useTheme()
  const CustomTooltip = ({ active, payload, label }: any) => {
    const date = payload || false
    const fullDate = date[0] && format(new Date(date[0]?.payload.fullTime), 'MMM d, yyyy HH:mm')
    if (active) {
      return (
        <ChartContentContainer>
          <Text fontSize="11px" fontWeight={600} color="primaryText">
            {fullDate}
          </Text>
          <ChartValueContainer>
            <Text fontSize="11px" fontWeight={600} color="primaryText">
              PRICE:&nbsp;
              <span style={{ fontSize: '16px', fontWeight: 700 }}>$ {date[0]?.value}</span>
            </Text>
            <Text fontSize="11px" fontWeight={600} color="primaryText">
              VOL:&nbsp;
              <span style={{ fontSize: '16px', fontWeight: 700 }}>$ {date[0]?.payload.volume}</span>
            </Text>
          </ChartValueContainer>
        </ChartContentContainer>
      )
    }
    return null
  }

  const formatYAxis = (value: any, index: number): string => {
    const base = Math.floor(Math.log(Math.abs(value)) / Math.log(1000))
    const suffix = 'kmb'[base - 1]
    return suffix ? String(value / 1000 ** base).substring(0, 3) + suffix : value
  }

  return (
    <LinearChartContainer>
      <ResponsiveContainer>
        <LineChart
          data={data}
          onMouseLeave={() => {
            if (setHoverDate) setHoverDate(undefined)
            if (setHoverValue) setHoverValue(undefined)
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#04F8AD" />
              <stop offset="50.52%" stopColor="#3F81EF" />
              <stop offset="100%" stopColor="#5100B9" />
            </linearGradient>
            <linearGradient id="colorUv2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#04F8AD" />
              <stop offset="50.52%" stopColor="#3F81EF" />
              <stop offset="100%" stopColor="#5100B9" />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={theme.colors.primaryGray} opacity="0.1" vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tick={{
              fill: theme.colors.primaryGray,
              fontSize: 12,
              fontWeight: 700,
            }}
            axisLine={false}
            tickLine={false}
            interval={24}
            tickMargin={20}
          />
          <YAxis
            tickCount={7}
            tick={{
              fill: theme.colors.primaryGray,
              fontSize: 12,
              fontWeight: 400,
            }}
            tickFormatter={formatYAxis}
            axisLine={false}
            tickLine={false}
            tickMargin={20}
          />

          <Tooltip
            cursor={false}
            contentStyle={{ width: 200 }}
            // formatter={(tooltipValue, name, props) => (
            //   <HoverUpdater payload={props.payload} setHoverValue={setHoverValue} setHoverDate={setHoverDate} />
            // )}
            content={<CustomTooltip />}
          />
          <Line
            type="linear"
            dataKey="value"
            stroke="url(#colorUv)"
            strokeWidth={2}
            dot={false}
            activeDot={<CustomizedActiveDot />}
          />
        </LineChart>
      </ResponsiveContainer>
    </LinearChartContainer>
  )
}

export default LinearChart
