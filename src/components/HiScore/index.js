import React from 'react';
import PropTypes from 'prop-types';

import StyledHiScore from './StyledHiScore';
import Number from './Number';

export default class HiScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      number: this.props.max,
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
  
  onChange({ current, reset, max }) {
    if (current || reset) {
      this.setState({
        label: 'HI-SCORE',
        display: 'none',
      });
    } else {
      this.setState({
        display: 'block',
      });
      if (max > this.state.number) {
        this.setState({
          label: 'NEW HI-SCORE',
          number: max,
        });
      }
    }
  }
  
  render() {
    if (this.props.current) {
      return null;
    }
    
    return (
      <div style={{ display: this.state.display }}>
        <StyledHiScore>
          <p>{this.state.label}</p>
        </StyledHiScore>
        <Number number={this.state.number} />
      </div>
    );
  }
}

HiScore.propTypes = {
  current: PropTypes.bool,
  reset: PropTypes.bool.isRequired,
  max: PropTypes.number.isRequired,
};
