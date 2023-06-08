// SearchBox.tsx

import React from 'react';
import styles from '@/styles/SearchBox.module.scss';
import searchSvg from "@/assets/search.svg";
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
        placeholder="Search"
        className={styles.input}
        onChange={handleInputChange}
      />
      <img src={searchSvg} className={styles.searchIcon} />
    </div>
  );
};

export default SearchBox;
