// components/Header.tsx

import React from 'react';
import styles from '@/styles/Header.module.scss';

interface HeaderProps {
  title: string;
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onDarkModeToggle }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>{title}</h1>
        <button className={styles.darkModeButton} onClick={onDarkModeToggle}>
          Dark Mode
        </button>
      </div>
    </header>
  );
};

export default Header;
