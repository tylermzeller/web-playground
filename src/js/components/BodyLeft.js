import React from 'react'

export default class BodyLeft extends React.Component {
  render () {
    return (
      <div className='body-left'>
        {this.props.children}
      </div>
    )
  }
}
