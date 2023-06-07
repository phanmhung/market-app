import { createEffect, createEvent, createStore } from 'effector';
import { Product } from '../common/types';

export const fetchProducts = createEffect<void, Product[]>({
  handler: async () => {
    const response = await fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price,thumbnail,category');
    const data = await response.json();
    return data.products;
  },
});

export const fetchCategories = createEffect<void, string[]>({
  handler: async () => {
    const response = await fetch('https://dummyjson.com/products/categories');
    const data = await response.json();
    return data;
  },
});

export const $products = createStore<Product[]>([])
  .on(fetchProducts.doneData, (_, products) => products);

export const $categories = createStore<string[]>([])
  .on(fetchCategories.doneData, (_, categories) => categories);

export const setSearchQuery = createEvent<string>();
export const setSelectedCategory = createEvent<string>();
export const setDisplayCount = createEvent<number>();

export const $filteredProducts = $products
  .map((products) => {
    // Apply filtering logic based on search query, selected category, and display count
    // Modify this logic according to your requirements
    const searchQuery:string = ''; // Replace with $searchQuery from SearchBox component
    const selectedCategory = ''; // Replace with $selectedCategory from CategorySelect component
    const displayCount = 10; // Replace with $displayCount from NumberDisplay component

    let filteredProducts = products;

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory);
    }

    filteredProducts = filteredProducts.slice(0, displayCount);

    return filteredProducts;
  });

// Fetch products and categories when component mounts
export const initialize = createEvent<void>();
initialize.watch(() => {
  fetchProducts();
  fetchCategories();
});

// Initialize the store when the initialize event occurs
$products.reset(initialize);
$categories.reset(initialize);