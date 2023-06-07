import React, { useEffect, useState } from 'react';


import styles from '@/styles/MainPage.module.scss';
import { useStore } from 'effector-react';
import { $categories, $filteredProducts, $products, fetchCategories, fetchProducts, setDisplayCount, setSearchQuery, setSelectedCategory } from '../utils/products';
import Header from './Header';
import SearchBox from './SearchBox';
import CategorySelect from './CategorySelect';
import NumberDisplay from './NumberDisplay';

interface MainPageProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const MainPage: React.FC<MainPageProps> = ({ darkMode, toggleDarkMode }) => {
  const products = useStore($products);
  console.log("🚀 ~ file: MainPage.tsx:19 ~ products:", products)
  const categories = useStore($categories);
  const filteredProducts = useStore($filteredProducts);
  console.log("🚀 ~ file: MainPage.tsx:21 ~ filteredProducts:", filteredProducts)
  console.log("🚀 ~ file: MainPage.tsx:21 ~ ilteredProducts :", filteredProducts )
  
  

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
      <Header title="Market" darkMode={darkMode} onDarkModeToggle={toggleDarkMode} />
      <div className={styles.mainContent}>
        <div className={styles.searchBox}>
          <SearchBox value={searchQuery} onChange={handleSearchChange} />
        </div>
        <div className={styles.categorySelect}>
          <CategorySelect categories={categories} value={selectedCategory} onSelect={handleCategorySelect} />
        </div>
        <div className={styles.numberDisplay}>
          <NumberDisplay value={displayCount} onChange={handleDisplayCountChange} />
        </div>
        {/* Render products here */}
        
        {filteredProducts.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <img src={product.thumbnail} alt={product.title} className={styles.productImage}/>
            <h3 className={styles.productTitle}>{product.title}</h3>
            <p className={styles.productPrice}>$ {product.price}</p>
          </div>
        ))}
      
      </div>
    </div>
  );
};

export default MainPage;