import React, { PropTypes } from 'react';

import styles from './loader.scss';

const propTypes = {
  active: PropTypes.bool
};

const defaultProps = {
  active: false
};

const Loader = ({ active }) => {
  return (
    <div className={ active ? styles['loader-wrapper'] : 'hidden' }>
      <div className={ styles.loader } />
    </div>
  );
};

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;
