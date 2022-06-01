import React, { ChangeEvent } from 'react'
import { Radio, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { ProposalState } from 'state/types'
import { StyledFilters, FilterLabel } from './styled'

interface FiltersProps {
  filterState: ProposalState
  onFilterChange: (filterState: ProposalState) => void
  isLoading: boolean
}

const options = [
  { value: ProposalState.ACTIVE, label: 'Vote Now' },
  { value: ProposalState.PENDING, label: 'Soon' },
  { value: ProposalState.CLOSED, label: 'Closed' },
]

const Filters: React.FC<FiltersProps> = ({ filterState, onFilterChange, isLoading }) => {
  const { t } = useTranslation()

  return (
    <StyledFilters>
      {options.map(({ value, label }) => {
        const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
          const { value: radioValue } = evt.currentTarget
          onFilterChange(radioValue as ProposalState)
        }

        return (
          <FilterLabel key={label}>
            <Radio
              scale="sm"
              value={value}
              checked={filterState === value}
              onChange={handleChange}
              disabled={isLoading}
            />
            <Text ml="8px">{t(label)}</Text>
          </FilterLabel>
        )
      })}
    </StyledFilters>
  )
}

export default Filters
