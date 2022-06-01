import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { Input } from '@crosswise/uikit'
import { DatePickerProps } from './interfaces'

import 'react-datepicker/dist/react-datepicker.css'

const DatePicker: React.FC<DatePickerProps> = ({ inputProps = {}, ...props }) => {
  return (
    <ReactDatePicker customInput={<Input {...inputProps} />} portalId="reactDatePicker" dateFormat="PPP" {...props} />
  )
}

export default DatePicker
