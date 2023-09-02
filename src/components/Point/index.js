import React from 'react';
import PropTypes from 'prop-types';

import Number from '../../components/Number';

export default class Point extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      number: 0,
    };
  }
  
  UNSAFE_componentWillMount() {
    this.onChange(this.props);
  }
  
  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    this.onChange(nextProps);
  }
  
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const props = this.props;
    return nextProps.current !== props.current || nextProps.max !== props.max || nextProps.points !== props.points || !props.current;
  }
  
  onChange({ current, max, points }) {
    if (current) {
      this.setState({
        label: 'SCORE',
        number: points,
      });
    } else {
      this.setState({
        label: 'HI-SCORE',
        number: max,
      });
    }
  }
  
  render() {
    return (
      <div>
        <p>{this.state.label}</p>
        <Number number={this.state.number} />
      </div>
    );
  }
};

Point.propTypes = {
  current: PropTypes.bool.isRequired,
  max: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
};
