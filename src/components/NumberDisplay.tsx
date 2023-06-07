// NumberDisplay.tsx

import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import styles from '@/styles/NumberDisplay.module.scss';

interface NumberDisplayProps {
    value:number;
  onChange: (value: number) => void;
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleValueSelect = (value: string) => {
    setSelectedValue(value);
    onChange(Number(value));
    setIsOpen(false);
  };

  return (
    <div className={styles.numberDisplay}>
      <div className={styles.selectedValue} onClick={handleToggle}>
        <span>{selectedValue || 'Select value'}</span>
        <FaChevronDown className={isOpen ? styles.iconOpen : styles.iconClosed} />
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
