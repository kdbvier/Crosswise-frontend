import React from 'react'
import { CurveProps } from './interfaces'
import { ConcaveContainer, ConvexContainer } from './styled'

export const ConvexTop: React.FC<CurveProps> = ({ clipFill }) => (
  <ConvexContainer clipFill={clipFill} clipPath="#topConvexCurve">
    <svg width="0" height="0">
      <defs>
        <clipPath id="topConvexCurve" clipPathUnits="objectBoundingBox">
          <path d="M 0,1 L 0,0 L 1,0 L 1,1 C 0.75 0, .25 0, 0 1 Z" />
        </clipPath>
      </defs>
    </svg>
  </ConvexContainer>
)

export const ConvexBottom: React.FC<CurveProps> = ({ clipFill }) => (
  <ConvexContainer clipFill={clipFill} clipPath="#bottomConvexCurve">
    <svg width="0" height="0">
      <defs>
        <clipPath id="bottomConvexCurve" clipPathUnits="objectBoundingBox">
          <path d="M 0,0 L 0,1 L 1,1 L 1,0 C .75 1, .25 1, 0 0 Z" />
        </clipPath>
      </defs>
    </svg>
  </ConvexContainer>
)

export const ConcaveTop: React.FC<CurveProps> = ({ clipFill }) => (
  <ConcaveContainer clipFill={clipFill} clipPath="#topConcaveCurve">
    <svg width="0" height="0">
      <defs>
        <clipPath id="topConcaveCurve" clipPathUnits="objectBoundingBox">
          <path d="M 0,0 L 0,1 L 1,1 L 1,0 C .75 1, .25 1, 0 0 Z" />
        </clipPath>
      </defs>
    </svg>
  </ConcaveContainer>
)

export const ConcaveBottom: React.FC<CurveProps> = ({ clipFill }) => (
  <ConcaveContainer clipFill={clipFill} clipPath="#bottomConcaveCurve">
    <svg width="0" height="0">
      <defs>
        <clipPath id="bottomConcaveCurve" clipPathUnits="objectBoundingBox">
          <path d="M 0,1 L 0,0 L 1,0 L 1,1 C .75 0.1, .25 0.1, 0 1 Z" />
        </clipPath>
      </defs>
    </svg>
  </ConcaveContainer>
)
