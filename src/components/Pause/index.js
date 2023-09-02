import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import StyledPause from './StyledPause';

export default class Pause extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPause: false,
    };
  }
  
  componentDidMount() {
    this.setShake(this.props.pause)
  }
  
  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    this.setShake(nextProps.pause);
  }
  
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.pause) {
      return true;
    }
    return nextProps.pause !== this.props.pause;
  }
  
  setShake(bool) {
    if (bool && !Pause.timeout) {
      Pause.timeout = setInterval(() => {
        this.setState({
          showPause: !this.state.showPause,
        });
      }, 650);
    }
    
    if(!bool && Pause.timeout) {
      clearInterval(Pause.timeout);
      this.setState({
        showPause: false,
      });
      Pause.timeout = null;
    }
  }
  
  render() {
    return (
      <StyledPause className={classnames({ active: this.state.showPause })} />
    );
  }
};

Pause.statics = {
  timeout: null,
}

Pause.defaultProps = {
  data: false,
}

Pause.propTypes = {
  pause: PropTypes.bool,
};
