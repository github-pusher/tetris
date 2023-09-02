import React from 'react';
import immutable from 'immutable';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import Wrapper from './Wrapper';
import keybinding from '../../game/keybinding';
import { store } from '../../app/store';

class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    this.c = React.createRef();
  }
  
  componentDidMount() {
    const touchEventCatch = {};
    const mouseDownEventCatch = {};

    Object.keys(keybinding).forEach((key) => {
      this[`dom_${key}`].dom.addEventListener('mousedown', () => {
        if (touchEventCatch[key] === true) {
          return;
        }
        keybinding[key].down(store);
        mouseDownEventCatch[key] = true;
      }, true);

      this[`dom_${key}`].dom.addEventListener('mouseup', () => {
        if (touchEventCatch[key] === true) {
          touchEventCatch[key] = false;
          return;
        }
        keybinding[key].up(store);
        mouseDownEventCatch[key] = false;
      }, true);

      this[`dom_${key}`].dom.addEventListener('mouseout', () => {
        if (mouseDownEventCatch[key] === true) {
          keybinding[key].up(store);
        }
      }, true);

      this[`dom_${key}`].dom.addEventListener('touchstart', () => {
        touchEventCatch[key] = true;
        keybinding[key].down(store);
      }, true);

      this[`dom_${key}`].dom.addEventListener('touchend', () => {
        keybinding[key].up(store);
      }, true);
    });
  }
  
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !immutable.is(nextProps.keyboard, this.props.keyboard) || nextProps.filling !== this.props.filling;
  }
  
  render() {
    return (
      <Wrapper style={{ marginTop: 20 + this.props.filling }}>
        <Button
          color="red"
          size="small"
          top={0}
          left={178}
          title="RESET"
          active={this.props.keyboard.key_reset}
          ref={(c) => { this.dom_a = c; }}
        />
        <Button
          color="green"
          size="small"
          top={0}
          left={268}
          title="PAUSE"
          active={this.props.keyboard.key_pause}
          ref={(c) => { this.dom_s = c; }}
        />
        <Button
          color="yellow"
          size="small"
          top={0}
          left={358}
          title="SOUND"
          active={this.props.keyboard.key_sound}
          ref={(c) => { this.dom_d = c; }}
        />
        <Button
          color="yellow"
          size="medium"
          top={100}
          left={16}
          title="LEFT"
          arrow="translate(56px, -12px) rotate(270deg)"
          active={this.props.keyboard.key_left}
          ref={(c) => { this.dom_left = c; }}
        />
        <Button
          color="yellow"
          size="medium"
          top={100}
          left={176}
          title="RIGHT"
          arrow="translate(-56px, -12px) rotate(90deg)"
          active={this.props.keyboard.key_right}
          ref={(c) => { this.dom_right = c; }}
        />
        <Button
          color="yellow"
          size="medium"
          top={200}
          left={96}
          title="DOWN"
          arrow="translate(0px, -84px) rotate(180deg)"
          active={this.props.keyboard.key_down}
          ref={(c) => { this.dom_down = c; }}
        />
        <Button
          color="yellow"
          size="big"
          top={160}
          left={364}
          title="DROP"
          active={this.props.keyboard.key_drop}
          ref={(c) => { this.dom_space = c; }}
        />
        <Button
          color="yellow"
          size="medium"
          top={100}
          left={484}
          title="ROTATE"
          active={this.props.keyboard.key_rotate}
          ref={(c) => { this.dom_rotate = c; }}
        />
      </Wrapper>
    );
  }
}

Keyboard.propTypes = {
  keyboard: PropTypes.object.isRequired,
  filling: PropTypes.number.isRequired,
};

export default Keyboard;
