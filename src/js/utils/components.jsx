import React from 'react'
import styled from 'styled-components'
import classNames from 'classnames'

export const simpleDiv = (baseClassName) => {
  return function SimpleDiv ({className, children, ...rest}) {
    const headerClasses = classNames(baseClassName, className)
    return (
      <div
        className={headerClasses}
        {...rest}
      >
        {children}
      </div>
    )
  }
}

export const compositeDiv = (baseClassName, Child) => {
  const Parent = simpleDiv(baseClassName)
  return function CompositeDiv ({children, ...rest}) {
    return (
      <Parent
        {...rest}
      >
        <Child>
          {children}
        </Child>
      </Parent>
    )
  }
}

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`

export const NullComponent = () => null
