import React from 'react';
import styles from './Header.module.css';

export default () => (
  <header>
    <ul className={styles.navList}>
      <li>
        <a href="/">Moives</a>
      </li>
      <li>
        <a href="/tv">TV</a>
      </li>
      <li>
        <a href="/search">Search</a>
      </li>
    </ul>
  </header>
);
