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
    <div class={active ? 'loader-wrapper' : 'hidden'}>
        <CircularProgress size={150} thickness={10} />
    </div>
  );
};

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;
