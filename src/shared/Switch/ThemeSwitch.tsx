import React from 'react';
import moonSvg from '@/assets/moon.svg';
import sunSvg from '@/assets/sun.svg';
import styles from './ThemeSwitch.module.scss';
import { useStore } from 'effector-react';
import { $darkMode, ToggleDarkMode } from '../../utils/themes';

const ThemeSwitch: React.FC = () => {
  const darkMode = useStore($darkMode);

  const handleToggleDarkMode = () => {
    ToggleDarkMode();
  };

  return (
    <button
      className={`${styles.themeSwitch} ${darkMode ? styles.dark : styles.light}`}
      onClick={handleToggleDarkMode}
    >
      <div className={styles.iconContainer}>
      <img src={sunSvg} alt="Sun" className={`${styles.icon} ${styles.sun}`} />
        <img src={moonSvg} alt="Moon" className={`${styles.icon} ${styles.moon}`} />
        
        <div className={`${styles.circle} ${darkMode ? styles.dark : ''}`}></div>
      </div>
    </button>
  );
};

export default ThemeSwitch;
