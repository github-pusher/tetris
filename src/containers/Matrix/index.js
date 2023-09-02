import React from 'react';
import PropTypes from 'prop-types';
import immutable, { List } from 'immutable';

import MatrixLayout from '../../components/MatrixLayout';
import { isClear } from '../../unit/';
import { FILL_LINE, COLOR_FILL_LINE, BLANK_LINE } from '../../unit/constants';
import states from '../../game/states';

const timeout = setTimeout;

export default class Matrix extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clearLines: false,
      animateColor: props.colorToggle ? 'lineClear' : 2,
      isOver: false,
      overState: null,
    };
  }
  
  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    const clears = isClear(nextProps.matrix);
    const overs = nextProps.reset;
    
    this.setState({
      clearLines: clears,
      isOver: overs,
    });
    
    if (clears && !this.state.clearLines) {
      this.clearAnimate(clears);
    }
    
    if (!clears && overs && !this.state.isOver) {
      this.over(nextProps);
    }
  }
  
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const props = this.props;
    
    return !(
      immutable.is(nextProps.matrix, props.matrix) &&
      immutable.is(
        (nextProps.current && nextProps.current.shape),
        (props.current && props.current.shape)
      ) &&
      immutable.is(
        (nextProps.current && nextProps.current.xy),
        (props.current && props.current.xy)
      ) &&
      immutable.is(
        (nextProps.colorToggle),
        (props.colorToggle)
      )
    ) || this.state.clearLines
    || this.state.isOver;
  }
  
  getResult(props = this.props) {
    let matrix = props.matrix;
    const clearLines = this.state.clearLines;
    const current = props.current;
    const shape = current && current.shape;
    const xy = current && current.xy;
    const fillColor = current && current.color;
    const clearColor = current && current.clearColor;
    
    if (clearLines) {
      const animateColor = this.state.animateColor;
      
      clearLines.forEach((index) => {
        matrix = matrix.set(index, List([
          animateColor,
          animateColor,
          animateColor,
          animateColor,
          animateColor,
          animateColor,
          animateColor,
          animateColor,
          animateColor,
          animateColor,
        ]));
      });
    } else if (shape) {
      shape.forEach((m, k1) => (
        m.forEach((n, k2) => {
          if (n && xy.get(0) + k1 >= 0) {
            let line = matrix.get(xy.get(0) + k1);
            let color;
            if (props.colorToggle) {
              if (line.get(xy.get(1) + k2) === 0 && !clearLines) {
                color = fillColor;
              } else {
                color = clearColor;
              }
            } else {
              if (line.get(xy.get(1) + k2) === 1 && !clearLines) {
                color = 2;
              } else {
                color = 1;
              }
            }
            line = line.set(xy.get(1) + k2, color);
            matrix = matrix.set(xy.get(0) + k1, line);
          }
        })
      ));
    }
    
    return matrix;
  }
  
  clearAnimate() {
    const anima = (callback) => {
      timeout(() => {
        this.setState({
          animateColor: 0,
        });
        timeout(() => {
          this.setState({
            animateColor: this.props.colorToggle ? 'lineClear' : 2,
          });
          if (typeof callback === 'function') {
            callback();
          }
        }, 100);
      }, 100);
    };
    
    anima(() => {
      anima(() => {
        anima(() => {
          timeout(() => {
            states.clearLines(this.props.matrix, this.state.clearLines);
          }, 100);
        });
      });
    });
  }
  
  over(nextProps) {
    let overState = this.getResult(nextProps);
    
    this.setState({
      overState,
    });

    const prevLine = (index) => {
      if (index <= 19) {
        overState = overState.set(19 - index, List(this.props.colorToggle ? COLOR_FILL_LINE : FILL_LINE));
      } else if (index >= 20 && index <= 39) {
        overState = overState.set(index - 20, List(BLANK_LINE));
      } else {
        states.endOver();
        return;
      }
      this.setState({
        overState,
      });
    };

    for (let i = 0; i <= 40; i++) {
      timeout(prevLine.bind(null, i), 40 * (i + 1));
    }
  }
  
  render() {
    let matrix;
    
    if (this.state.isOver) {
      matrix = this.state.overState;
    } else {
      matrix = this.getResult();
    }
    
    return (
      <MatrixLayout matrix={matrix} />
    );
  }
}

Matrix.propTypes = {
  matrix: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  current: PropTypes.object,
  reset: PropTypes.bool.isRequired,
  colorToggle: PropTypes.bool.isRequired,
};
