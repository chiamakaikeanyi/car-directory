import React from 'react';
import PropTypes from 'prop-types';
import styles from './emptyState.module.scss';

export default function EmptyState({ text }) {
  return (
    <section className={styles.wrapper}>
      <p>{text}</p>
    </section>
  );
}

EmptyState.propTypes = { text: PropTypes.string.isRequired };
