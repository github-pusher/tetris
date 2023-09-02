import React from 'react';
import classnames from 'classnames';

import B from '../../components/B';
import H1 from './H1';
import TopBorder from './TopBorder';
import Side from './Side';

function Decoration() {
  return (
    <div>
      <H1>TETRIS</H1>
      <TopBorder>
        <span className={classnames(['float-left', 'mr'])} />
        <span className={classnames(['float-right', 'ml'])} />
      </TopBorder>
      <Side>
        <em />
        <B className="decor" />
        <div className="clear-both" />
        <B className="decor" />
        <B className="decor" />
        <div className="clear-both" />
        <B className="decor" />
        <p />
        <B className="decor" />
        <div className="clear-both" />
        <B className="decor" />
        <B className="decor" />
        <div className="clear-both" />
        <B className="decor" />
        <p />
        <B className="decor" />
        <B className="decor" />
        <B className="decor" />
        <B className="decor" />
        <p />
        <B className="decor" />
        <div className="clear-both" />
        <B className="decor" />
        <B className="decor" />
        <div className="clear-both" />
        <B className="decor" />
        <div className="clear-both" />
        <B className="decor" />
        <B className="decor" />
        <p />
        <em />
        <B className="decor" />
        <div className="clear-both" />
        <B className="decor" />
        <B className="decor" />
        <div className="clear-both" />
        <em />
        <B className="decor" />
        <p />
        <B className="decor" />
        <B className="decor" />
        <div className="clear-both" />
        <em />
        <B className="decor" />
        <div className="clear-both" />
        <em />
        <B className="decor" />
      </Side>
      <Side className={"right"}>
        <B className="decor" />
        <B className="decor" />
        <B className="decor" />
        <B className="decor" />
        <p />
        <em />
        <B className="decor" />
        <div className="clear-both" />
        <B className="decor" />
        <B className="decor" />
        <div className="clear-both" />
        <em />
        <B className="decor" />
        <div className="clear-both" />
        <B className="decor" />
        <B className="decor" />
        <p />
        <em />
        <B className="decor" />
        <div className="clear-both" />
        <B className="decor" />
        <B className="decor" />
        <div className="clear-both" />
        <em />
        <B className="decor" />
        <p />
        <B className="decor" />
        <div className="clear-both" />
        <B className="decor" />
        <B className="decor" />
        <div className="clear-both" />
        <em />
        <B className="decor" />
        <p />
        <B className="decor" />
        <B className="decor" />
        <div className="clear-both" />
        <B className="decor" />
        <div className="clear-both" />
        <B className="decor" />
        <p />
        <B className="decor" />
        <div className="clear-both" />
        <B className="decor" />
        <B className="decor" />
        <div className="clear-both" />
        <B className="decor" />
      </Side>
    </div>
  );
}

export default Decoration;
