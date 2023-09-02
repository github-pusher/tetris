import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import ColorToggle from '../containers/ColorToggle';
import Matrix from '../containers/Matrix';
import Keyboard from '../containers/Keyboard';
import Decoration from '../components/Decoration';
import HiScore from '../components/HiScore';
import Point from '../components/Point';
import Number from '../components/Number';
import Next from '../components/Next';
import Pause from '../components/Pause';
import Sound from '../components/Sound';
import Guide from '../components/Guide';
import QrCode from '../components/QrCode';
import Logo from '../components/Logo';

import { gameRecord, SPEEDS } from '../unit/constants';
import states from '../game/states';

import GlobalStyle from '../global-styles';

const AppWrapper = styled.div`
  width: 640px;
  padding-top: 42px;
  box-shadow: 0 0 10px #30343a inset;
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -480px 0 0 -320px;
  background: #000;
`;

const Rect = styled.div`
  width: 480px;
  padding: 45px 0 35px;
  border: #fff solid;
  border-width: 0 10px 10px;
  margin: 0 auto;
  position: relative;
`;

const Screen = styled.div`
  width: 390px;
  height: 478px;
  border: solid 5px;
  border-color: #1b1b1b #30343a #30343a #1b1b1b;
  margin: 0 auto;
  position: relative;
`;

const State = styled.div`
  width: 108px;
  position: absolute;
  top: 0;
  right: 15px;
  
  p {
    font-size: 24px;
    line-height: 30px;
    height: 48px;
    padding: 10px 0 0;
    white-space: nowrap;
    clear: both;
  }
`;

const StateBottom = styled.div`
  position: absolute;
  top: 426px;
  left: 0;
`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    }
  }
  
  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this), true);
    
    if (gameRecord) {
      if (gameRecord.matrix.current && !gameRecord.matrix.pause) {
        const speedRun = this.props.speedRun;
        let timeout = SPEEDS[speedRun - 1] / 2;
        timeout = speedRun < SPEEDS[SPEEDS.length - 1] ? SPEEDS[SPEEDS.length - 1] : speedRun;
        states.auto(timeout);
      }
      if (!gameRecord.matrix.current) {
        states.startOver();
      }
    } else {
      states.startOver();
    }
  }
  
  resize() {
    this.setState({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
  }
  
  render() {
    let filling = 0;
    
    const size = (() => {
      const width = this.state.width;
      const height = this.state.height;
      const ratio = height / width;
      let scale;
      let css = {};
      
      if (ratio < 1.5) {
        scale = height / 960;
      } else {
        scale = width / 640;
        filling = (height - (960 * scale)) / scale / 3;
        css = {
          paddingTop: Math.floor(filling) + 42,
          paddingBottom: Math.floor(filling),
          marginTop: Math.floor(-480 - (filling * 1.5)),
        };
      }
      
      css['transform'] = `scale(${scale})`;
      
      return css;
    })();
    
    return (
      <AppWrapper style={size}>
        <ColorToggle toggle={this.props.colorToggle} />
        <Rect>
          <Decoration />
          <Screen>
            <Matrix
              matrix={this.props.matrix}
              current={this.props.current}
              reset={this.props.reset}
              colorToggle={this.props.colorToggle}
            />
            <HiScore current={!!this.props.current} reset={this.props.reset} max={this.props.max} />
            <State>
              <Point current={!!this.props.current} max={this.props.max} points={this.props.points} />
              <p>LINES</p>
              <Number number={this.props.current ? this.props.clearLines : this.props.startLines} />
              <p>LEVEL</p>
              <Number number={this.props.current ? this.props.speedRun : this.props.speedStart} length={1} />
              <p>NEXT</p>
              <Next type={this.props.next} colorToggle={this.props.colorToggle} />
              <StateBottom>
                <Pause pause={this.props.pause} />
                <Sound sound={this.props.sound} />
              </StateBottom>
            </State>
          </Screen>
        </Rect>
        <Keyboard
          keyboard={this.props.keyboard}
          filling={filling}
        />
        <Guide />
        <QrCode />
        <Logo />
        <GlobalStyle />
      </AppWrapper>
    );
  }
}

App.propTypes = {
  matrix: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  current: PropTypes.object,
  reset: PropTypes.bool.isRequired,
  max: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  speedStart: PropTypes.number.isRequired,
  speedRun: PropTypes.number.isRequired,
  startLines: PropTypes.number.isRequired,
  clearLines: PropTypes.number.isRequired,
  next: PropTypes.string.isRequired,
  pause: PropTypes.bool,
  sound: PropTypes.bool,
  keyboard: PropTypes.object.isRequired,
  colorToggle: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  matrix: state.matrix.value,
  current: state.matrix.current,
  reset: state.matrix.reset,
  max: state.matrix.max,
  points: state.matrix.points,
  speedStart: state.matrix.speedStart,
  speedRun: state.matrix.speedRun,
  startLines: state.matrix.startLines,
  clearLines: state.matrix.clearLines,
  next: state.matrix.next,
  pause: state.matrix.pause,
  sound: state.matrix.sound,
  keyboard: state.keyboard,
  colorToggle: state.colorToggle.value,
});

export default connect(mapStateToProps)(App);
