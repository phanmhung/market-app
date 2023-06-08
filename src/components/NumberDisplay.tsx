// NumberDisplay.tsx

import dropdownSvg from '@/assets/ArrowDropDownFilled.svg';
import styles from '@/styles/NumberDisplay.module.scss';
import React, { useState } from 'react';
interface NumberDisplayProps {
    value:number;
  onChange: (value: number) => void;
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(10);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleValueSelect = (value: string) => {
    // string to number
    
    setSelectedValue(Number(value));
    onChange(Number(value));
    setIsOpen(false);
  };

  return (
    <div className={styles.numberDisplay}>
      <div className={styles.selectedValue} onClick={handleToggle}>
        <span>{selectedValue || 'Select value'}</span>
        <img src={dropdownSvg} className={isOpen ? styles.iconOpen : styles.iconClosed} />
      </div>
      {isOpen && (
        <ul className={styles.dropdown}>
          {[10, 20, 50].map((value) => (
            <li key={value} onClick={() => handleValueSelect(String(value))}>
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NumberDisplay;
