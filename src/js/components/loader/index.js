import React, { PropTypes } from 'react';

import styles from './loader.scss';

console.log(styles);

const propTypes = {
  active: PropTypes.bool
};

const defaultProps = {
  active: false
};

const Loader = ({ active }) => {
  return (
    <div className={active ? 'loader-wrapper' : 'hidden'}>
      <div className="loader" />
    </div>
    // <div>This is loader</div>
  );
};

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;
