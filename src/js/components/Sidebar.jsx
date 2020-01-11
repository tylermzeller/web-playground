import {BodyLeft as BodyLeftMarkup} from './structure/Body'
import {SidebarChannel, themeColor1, themeColor4} from './configure'
import styled from 'styled-components'
import React, {useState, useEffect} from 'react'
import {FlexCol, FlexRow} from '../utils/components'
import {LeftArrowIconMarkup, RightArrowIconMarkup} from '../utils/icons'

// TODO decouple events from component
const SIDEBAR_TARGET = 'sidebar'
const SIDEBAR_MINIMIZED_WIDTH = 35

export const BodyLeft = styled(BodyLeftMarkup)`
  width: ${props => props.width || 300}px;
  min-width: ${props => props.width || 300}px;
  margin-left: ${props => props.open ? 0 : -(props.width || 300) + SIDEBAR_MINIMIZED_WIDTH}px;
  background-color: ${() => themeColor4};
  color: ${() => themeColor1};

  @media (max-width: 900px) {
  }
`

const LeftSidebarWrapper = styled(FlexCol)`
`

const LeftSidebarHeader = styled(FlexRow)`
  height: 50px;
  font-size: ${SIDEBAR_MINIMIZED_WIDTH}px;
  align-items: center;
  
  & > i {
    margin-left: auto;
    cursor: pointer;
  }
`

const LeftSidebarBody = styled.div`
  flex: 1;
`

export const LeftSidebar = (props) => {
  const [open, setOpen] = useState(true)
  useEffect(() => {
    SidebarChannel.subscribe(SIDEBAR_TARGET, ({detail}) => {
      const toOpen = detail.open
      if (toOpen === undefined) {
        setOpen(o => !o)
      } else {
        setOpen(toOpen)
      }
    })

    return () => {
      SidebarChannel.unsubscribe(SIDEBAR_TARGET)
    }
  }, [])
  return (
    <BodyLeft
      {...props}
      open={open}
      onClick={() => SidebarChannel.publish({})}
    >
      <LeftSidebarWrapper>
        <LeftSidebarHeader>
          {open ? <LeftArrowIconMarkup /> : <RightArrowIconMarkup />}
        </LeftSidebarHeader>
        <LeftSidebarBody/>
      </LeftSidebarWrapper>
    </BodyLeft>
  )
}