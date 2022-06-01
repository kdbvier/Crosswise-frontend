import React, { useEffect, Dispatch, SetStateAction } from 'react'
import { format } from 'date-fns'
import { ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from 'recharts'
import useTheme from 'hooks/useTheme'
import { formatAmount } from 'views/Info/utils/formatInfoNumbers'
import { LineChartLoader } from 'views/Info/components/ChartLoaders'

export type LineChartProps = {
  data: any[]
  setHoverValue: Dispatch<SetStateAction<number | undefined>> // used for value on hover
  setHoverDate: Dispatch<SetStateAction<string | undefined>> // used for label of value
} & React.HTMLAttributes<HTMLDivElement>

// Calls setHoverValue and setHoverDate when part of chart is hovered
// Note: this NEEDs to be wrapped inside component and useEffect, if you plug it as is it will create big render problems (try and see console)
const HoverUpdater = ({ payload, setHoverValue, setHoverDate }) => {
  useEffect(() => {
    setHoverValue(payload.value)
    setHoverDate(format(payload.time, 'MMM d, yyyy'))
  }, [payload.value, payload.time, setHoverValue, setHoverDate])

  return null
}

const CustomizedActiveDot: React.FC<{ cx?: number; cy?: number; r?: number }> = ({ cx, cy, r }) => {
  return (
    <>
      <circle cx={cx} cy={cy} r={9} fill="url(#colorUv2)" />
      <circle cx={cx} cy={cy} r={7} fill="#10171B" />
    </>
  )
}

/**
 * Note: remember that it needs to be mounted inside the container with fixed height
 */
const LineChart = ({ data, setHoverValue, setHoverDate }: LineChartProps) => {
  const { theme } = useTheme()
  if (!data || data.length === 0) {
    return <LineChartLoader />
  }
  return (
    <ResponsiveContainer>
      <AreaChart
        data={data}
        width={300}
        height={308}
        margin={{
          top: 5,
          right: 15,
          left: 0,
          bottom: 5,
        }}
        onMouseLeave={() => {
          if (setHoverDate) setHoverDate(undefined)
          if (setHoverValue) setHoverValue(undefined)
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={theme.colors.greenPalette.main} />
            <stop offset="50.52%" stopColor={theme.colors.bluePalette.main} />
            <stop offset="100%" stopColor="#5100B9" />
          </linearGradient>
          <linearGradient id="colorUv2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.colors.greenPalette.main} />
            <stop offset="50.52%" stopColor={theme.colors.bluePalette.main} />
            <stop offset="100%" stopColor="#5100B9" />
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="11%" stopColor={theme.colors.bluePalette.main} />
            <stop offset="94%" stopColor={theme.colors.purplePalette.main} stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={theme.colors.primaryGray} opacity="0.1" vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          axisLine={false}
          tickLine={false}
          tick={{ fill: theme.colors.primaryGray }}
          tickFormatter={(time) => format(time, 'dd')}
          minTickGap={10}
        />
        <YAxis
          dataKey="value"
          tickCount={6}
          scale="linear"
          axisLine={false}
          tickLine={false}
          fontSize="12px"
          tickFormatter={(val) => `$${formatAmount(val)}`}
          orientation="right"
          tick={{ dx: 10, fontSize: 12, fontWeight: 400, fill: theme.colors.primaryGray }}
        />
        <Tooltip
          cursor={{ stroke: theme.colors.secondary }}
          contentStyle={{ display: 'none' }}
          formatter={(tooltipValue, name, props) => (
            <HoverUpdater payload={props.payload} setHoverValue={setHoverValue} setHoverDate={setHoverDate} />
          )}
        />
        {/* <Line
          type="linear"
          dataKey="value"
          stroke="url(#colorUv)"
          strokeWidth={2}
          dot={false}
          activeDot={<CustomizedActiveDot />}
        /> */}
        <Area
          dataKey="value"
          type="monotone"
          stroke="url(#colorUv)"
          fill="url(#gradient)"
          strokeWidth={1}
          activeDot={<CustomizedActiveDot />}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default LineChart
