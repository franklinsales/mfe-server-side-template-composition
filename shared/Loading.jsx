import React from 'react';
import styles from './Loading.module.css';

export default function Loading({ size = 'medium' }) {
  return (
    <div className={`${styles.container} ${styles[size]}`}>
      <div className={styles.spinner}></div>
      <p>Carregando...</p>
    </div>
  );
}