import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Easing, Modal, Dimensions, Animated } from 'react-native'
const { width, height } = Dimensions.get('window')
const reactMixin = require('react-mixin')
import TimerMixin from 'react-timer-mixin'

class CircleTransition extends Component {
  constructor (props) {
    super(props)
    const {
      scaleShrink,
      scaleExpand,
      expand
    } = this.props
    const initialScale = expand ? scaleShrink : scaleExpand
    this.state = {
      visible: false,
      scale: new Animated.Value(initialScale)
    }
  }

  start () {
    const { expand } = this.props
    this.setState({ visible: true });
    this.animate(expand)
  }

  animate (expand) {
    const {
      scaleShrink,
      scaleExpand,
      easing
    } = this.props
    let toValue = expand ? scaleExpand : scaleShrink
    Animated.timing(this.state.scale, {
      toValue: toValue,
      duration: this.props.duration,
      easing: easing
    }).start(() => {
      this.hideCircle()
    })
  }

  hideCircle () {
    const { transitionBuffer } = this.props
    // the circle disappears only when the transition is completed...
    this.setTimeout(() => {
      this.setState({
        scale: new Animated.Value(0),
        visible: false
      })
    }, transitionBuffer)
  }


  getLeftPosition (position) {
    const {size, customLeftMargin} = this.props
    const halfSize = size / 2
    const halfWidth = width / 2
    let marginHorizontalTopLeft = -halfSize
    switch (position) {
      case 'center':
      case 'top':
      case 'bottom':
        return marginHorizontalTopLeft + halfWidth
      case 'topRight':
      case 'bottomRight':
      case 'right':
        return marginHorizontalTopLeft + width
      case 'custom':
        return marginHorizontalTopLeft + customLeftMargin
      default:
        return marginHorizontalTopLeft
    }
  }

  getTopPosition (position) {
    const {size, customTopMargin} = this.props
    const halfSize = size / 2
    const halfHeight = height / 2
    let marginVerticalTopLeft = -halfSize
    switch (position) {
      case 'center':
      case 'left':
      case 'right':
        return marginVerticalTopLeft + halfHeight
      case 'bottomLeft':
      case 'bottomRight':
      case 'bottom':
        return marginVerticalTopLeft + height
      case 'custom':
        return marginVerticalTopLeft + customTopMargin
      default:
        return marginVerticalTopLeft
    }
  }

  render () {
    const {scale, visible} = this.state
    const { size, color, position } = this.props
    let topPosition = this.getTopPosition(position)
    let leftPosition = this.getLeftPosition(position)
    return (
      <Modal
        animationType='none'
        transparent
        visible={visible}
        onRequestClose={() => {}}>
        <Animated.View style={{
          position: 'absolute',
          backgroundColor: color,
          top: topPosition,
          left: leftPosition,
          width: size,
          height: size,
          borderRadius: size / 2,
          transform: [{
            scale: scale
          }]
        }} />
      </Modal>
    )
  }
}

reactMixin(CircleTransition.prototype, TimerMixin)

CircleTransition.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  scaleShrink: PropTypes.number,
  scaleExpand: PropTypes.number,
  duration: PropTypes.number,
  transitionBuffer: PropTypes.number,
  position: PropTypes.oneOf([
    'topLeft',
    'topRight',
    'bottomLeft',
    'bottomRight',
    'center',
    'left',
    'right',
    'top',
    'bottom',
    'custom'
  ]),
  customLeftMargin: PropTypes.number,
  customTopMargin: PropTypes.number,
  expand: PropTypes.bool,
  easing: PropTypes.func,
  sizeBeforeExpanding: PropTypes.number
}

CircleTransition.defaultProps = {
  color: 'orange',
  size: Math.min(width, height) - 1,
  scaleShrink: 0,
  scaleExpand: 4,
  duration: 800,
  transitionBuffer: 5,
  position: 'topLeft',
  expand: true,
  customLeftMargin: 0,
  customTopMargin: 0,
  easing: Easing.linear
}

export default CircleTransition
