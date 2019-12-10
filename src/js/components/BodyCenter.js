import React from 'react'
import PropTypes from 'prop-types'

export default class BodyCenter extends React.Component {
  render () {
    return (
      <div className='body-center'>
        {this.props.children}
      </div>
    )
  }
}
