import React from 'react'
import PropTypes from 'prop-types'
import BodyLeft from './BodyLeft'
import BodyRight from './BodyRight'
import BodyCenter from './BodyCenter'

export default class AppBody extends React.Component {
  render () {
    return (
      <div className='app-body'>
        <BodyLeft>
          {this.props.left}
        </BodyLeft>
        <BodyCenter>
          {this.props.center}
        </BodyCenter>
        <BodyRight>
          {this.props.right}
        </BodyRight>
      </div>
    )
  }
}
 
AppBody.propTypes = {
  left: PropTypes.elementType,
  center: PropTypes.elementType,
  right: PropTypes.elementType
}
