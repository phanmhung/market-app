// SearchBox.tsx

import React from 'react';
import styles from '@/styles/SearchBox.module.scss';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="Search..."
        className={styles.input}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBox;
