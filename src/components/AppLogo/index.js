import React from 'react';
import PropTypes from 'prop-types';

import StyledAppLogo from './StyledAppLogo';

export default class AppLogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'none',
    };
  }

  UNSAFE_componentWillMount() {
    this.onChange(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if (
      (
        [this.props.current, nextProps.current].indexOf(false) !== -1 &&
        (this.props.current !== nextProps.current)
      ) ||
      (this.props.reset !== nextProps.reset)
    ) {
      this.onChange(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const props = this.props;
    return nextProps.current !== props.current || nextProps.reset !== this.props.reset || !props.current;
  }

  onChange({ current, reset }) {
    if (current || reset) {
      this.setState({
        display: 'none',
      });
    } else {
      this.setState({
        display: 'block',
      });
    }
  }

  render() {
    if (this.props.current) {
      return null;
    }

    return (
      <StyledAppLogo style={{ display: this.state.display }} />
    );
  }
}

AppLogo.propTypes = {
  current: PropTypes.bool,
  reset: PropTypes.bool.isRequired,
};
