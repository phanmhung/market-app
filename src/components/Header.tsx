// components/Header.tsx

import styles from '@/styles/Header.module.scss';
import React from 'react';
import ThemeSwitch from '../shared/Switch/ThemeSwitch';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title}) => {
  
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>{title}</h1>
       

        <ThemeSwitch />
        
      </div>
    </header>
  );
};

export default Header;
