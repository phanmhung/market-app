import React, { useEffect, useState } from 'react';

import styles from '@/styles/MainPage.module.scss';
import { useStore } from 'effector-react';
import {
  $categories,
  $filteredProducts,
  fetchCategories,
  fetchProducts,
  setDisplayCount,
  setSearchQuery,
  setSelectedCategory
} from '../utils/products';
import CategorySelect from './CategorySelect';
import Header from './Header';
import NumberDisplay from './NumberDisplay';
import SearchBox from './SearchBox';

interface MainPageProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const MainPage: React.FC<MainPageProps> = ({ darkMode, toggleDarkMode }) => {
  const categories = useStore($categories);
  const filteredProducts = useStore($filteredProducts);

  const [searchQuery, setSearchQueryState] = useState('');
  const [selectedCategory, setSelectedCategoryState] = useState('');
  const [displayCount, setDisplayCountState] = useState<number>(10);

  const handleSearchChange = (value: string) => {
    setSearchQueryState(value);
    setSearchQuery(value);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategoryState(category);
    setSelectedCategory(category);
  };

  const handleDisplayCountChange = (value: number) => {
    setDisplayCountState(value);
    setDisplayCount(value);

  };

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div className={darkMode ? styles.darkContainer : styles.lightContainer}>
      <Header
        title="Market"
        darkMode={darkMode}
      />
      <div className={styles.mainContent}>
        <div className={styles.searchBox}>
          <SearchBox value={searchQuery} onChange={handleSearchChange} />
        </div>
        <div className={styles.categorySelect}>
          <CategorySelect
            categories={categories}
            value={selectedCategory}
            onSelect={handleCategorySelect}
          />
        </div>
        <div className={styles.numberDisplay}>
          <NumberDisplay
            value={displayCount}
            onChange={handleDisplayCountChange}
          />
        </div>
        {/* Render products here */}

        {filteredProducts.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <div className={styles.productImageWrapper}>
              <img
                src={product.thumbnail}
                alt={product.title}
                className={styles.productImage}
              />
            </div>
            <h3 className={styles.productTitle}>{product.title}</h3>
            <p className={styles.productPrice}>$ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
