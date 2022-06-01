import React from 'react'
// import ExpandButtonBg from './icons/ExpandButtonBg'
import { ExpandButtonText, ExpandButtonWrapper, TopPart } from './styled'

interface Props {
  title: any
  onClick?: () => void
}

interface ChevronProps {
  className?: string
}

// const ExpandButtonBg = () => {
//   return (
//     <StyledSvg width="100%" height="100%">
//       <svg viewBox="38 40 344 47">
//         <g>
//           <path
//             fillRule="evenodd"
//             clipRule="evenodd"
//             d="M37 41V68C37 79.0457 45.9543 88 57 88H363C374.046 88 383 79.0457 383 68V41C383 52.0457 374.046 61 363 61H57C45.9543 61 37 52.0457 37 41Z"
//             fill="url(#paint0_linear_1627_714)"
//           />
//         </g>
//         <defs>
//           <linearGradient
//             id="paint0_linear_1627_714"
//             x1="19.4968"
//             y1="73.9244"
//             x2="373.865"
//             y2="193.867"
//             gradientUnits="userSpaceOnUse"
//           >
//             <stop stopColor="#3F81EF" />
//             <stop offset="1" stopColor="#8750F4" />
//           </linearGradient>
//         </defs>
//       </svg>
//     </StyledSvg>
//   )
// }

export const ChevronDownIcon: React.FC<ChevronProps> = ({ className }) => (
  <svg className={className} width="10" height="10" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.00008 2.50356L0.637361 0.0623772C0.597288 0.0209994 0.551171 0.000440806 0.499073 0.000440809C0.446955 0.000440811 0.400838 0.0211301 0.360786 0.0623772L0.0601625 0.372993C0.0201102 0.414371 -1.13333e-07 0.462037 -1.11402e-07 0.515771C-1.09465e-07 0.56968 0.0201102 0.617257 0.0601625 0.658722L2.86178 3.55317C2.90185 3.59457 2.94797 3.61523 3.00006 3.61523C3.05218 3.61523 3.09828 3.59457 3.13835 3.55317L5.93996 0.658722C5.9801 0.617322 6 0.569832 6 0.515923C6 0.462014 5.98006 0.414545 5.93996 0.373146L5.63953 0.0625509C5.59946 0.0211732 5.55332 0.00052803 5.50118 0.000528033C5.44912 0.000528036 5.40303 0.0211512 5.36295 0.062551L3.00008 2.50356Z"
      fill="white"
    />
    <path
      d="M3.00008 4.88824L0.637361 2.44729C0.597288 2.40589 0.551171 2.38527 0.499073 2.38527C0.446955 2.38527 0.400838 2.40587 0.360786 2.44729L0.0601625 2.75774C0.0201102 2.79914 -1.03374e-07 2.84678 -1.01611e-07 2.90054C-9.98441e-08 2.95444 0.0201102 3.00209 0.0601625 3.04347L2.86178 5.93793C2.90185 5.97933 2.94797 6 3.00006 6C3.05218 6 3.09828 5.97933 3.13835 5.93793L5.93996 3.04349C5.9801 3.00211 6 2.95451 6 2.90056C6 2.8468 5.98006 2.79916 5.93996 2.75778L5.63953 2.44732C5.59946 2.40592 5.55332 2.38529 5.50118 2.38529C5.44912 2.38529 5.40303 2.40589 5.36295 2.44732L3.00008 4.88824Z"
      fill="white"
    />
  </svg>
)

const ExpandButton: React.FC<Props> = ({ title, onClick }) => {
  return (
    <ExpandButtonWrapper onClick={onClick}>
      {/* <ExpandButtonBg /> */}
      <TopPart />
      <ExpandButtonText>{title}</ExpandButtonText>
    </ExpandButtonWrapper>
  )
}

export default ExpandButton
