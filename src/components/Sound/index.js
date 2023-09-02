import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import StyledSound from './StyledSound';

export default class Sound extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.sound !== this.props.sound;
  }
  
  render() {
    return (
      <StyledSound>
        <i className={classnames({ active: !this.props.sound })} />
      </StyledSound>
    );
  }
};

StyledSound.propTypes = {
  sound: PropTypes.bool,
};
