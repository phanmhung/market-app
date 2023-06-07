// CategorySelect.tsx

import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import styles from '@/styles/CategorySelect.module.scss';

interface CategorySelectProps {
  value: string;
  categories: string[];
  onSelect: (category: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ categories, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    onSelect(category);
    setIsOpen(false);
  };

  return (
    <div className={styles.categorySelect}>
      <div className={styles.selectedCategory} onClick={handleToggle}>
        <span>{selectedCategory || 'Select a category'}</span>
        <FaChevronDown className={isOpen ? styles.iconOpen : styles.iconClosed} />
      </div>
      {isOpen && (
        <ul className={styles.dropdown}>
          {categories.map((category, index) => (
            <li key={index} onClick={() => handleCategorySelect(category)}>
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategorySelect;
