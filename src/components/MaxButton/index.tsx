import React, { useState } from 'react'
import { Dropdown, DropdownItem } from '@crosswise/uikit'

export const AmountOptions: DropdownItem[] = [
  {
    value: 1,
    label: 'Max',
  },
  {
    value: 0.75,
    label: '75%',
  },
  {
    value: 0.5,
    label: '50%',
  },
  {
    value: 0.25,
    label: '25%',
  },
  {
    value: 0.1,
    label: '10%',
  },
]

const MaxButton = ({ onChange }) => {
  const [currentAmountOption, setCurrentAmountOption] = useState<DropdownItem>(AmountOptions[0])

  const handleAmount = (option: DropdownItem) => {
    setCurrentAmountOption(option)
    if (onChange) onChange(option.value)
  }

  return (
    <Dropdown
      list={AmountOptions}
      placement="bottom-start"
      scale="xs"
      current={currentAmountOption}
      onClickItem={handleAmount}
    />
  )
}

export default MaxButton
