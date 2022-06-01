import React from 'react'

export interface FarmOptionProps {
  pid: number
  isAuto: boolean
  isVest: boolean
}

interface FarmOptionPropsWithLoading extends FarmOptionProps {
  userDataReady: boolean
}

const FarmOption: React.FunctionComponent<FarmOptionPropsWithLoading> = ({ isAuto, isVest, userDataReady }) => {
  if (userDataReady) {
    return (
      <>
        <h6>ENABLE</h6>
        <span>IsAuto</span>
        {isAuto}
        <span>IsVest</span>
        {isVest}
      </>
    )
  }
  return (
    <>
      <span>Disabled</span>
    </>
  )
}

export default FarmOption
