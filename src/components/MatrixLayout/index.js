import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import B from '../../components/B';
import StyledMatrix from './StyledMatrix';
import Wrapper from './Wrapper';

function MatrixLayout({ matrix }) {
    
  return (
    <StyledMatrix>
      <Wrapper>
        {
          matrix.map((p, k1) => (<p key={k1}>
            {
              p.map((e, k2) => <B
                className={classnames({
                  fill: e === 1,
                  clear: e === 2,
                  lineClear: e === 'lineClear',
                  turquoise: e === 'turquoise',
                  turquoiseClear: e === 'turquoiseClear',
                  blue: e === 'blue',
                  blueClear: e === 'blueClear',
                  orange: e === 'orange',
                  orangeClear: e === 'orangeClear',
                  yellow: e === 'yellow',
                  yellowClear: e === 'yellowClear',
                  green: e === 'green',
                  greenClear: e === 'greenClear',
                  purple: e === 'purple',
                  purpleClear: e === 'purpleClear',
                  red: e === 'red',
                  redClear: e === 'redClear',
                })}
                key={k2}
              />)
            }
          </p>))
        }
      </Wrapper>
    </StyledMatrix>
  );
}

MatrixLayout.propTypes = {
  matrix: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default MatrixLayout;
