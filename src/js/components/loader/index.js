import React, { PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import styles from './loader.scss';

const propTypes = {
  active: PropTypes.bool
};

const defaultProps = {
  active: false
};

const Loader = ({ active }) => {
  return (
    <div className={active ? 'loader-wrapper' : 'hidden'}>
      <div className="loader">
        <CircularProgress size={150} thickness={10} />
      </div>
    </div>
  );
};

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;
