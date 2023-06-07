import { createEffect, createEvent, createStore, combine } from 'effector';
import { Product } from '../common/types';

export const fetchProducts = createEffect<void, Product[]>({
  handler: async () => {
    const response = await fetch('https://dummyjson.com/products?select=title,price,thumbnail,category');
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

// Create stores for search query, selected category, and display count
export const $searchQuery = createStore<string>('')
  .on(setSearchQuery, (_, searchQuery) => searchQuery);

export const $selectedCategory = createStore<string>('')
  .on(setSelectedCategory, (_, selectedCategory) => selectedCategory);

export const $displayCount = createStore<number>(10)
  .on(setDisplayCount, (_, displayCount) => displayCount);

// Combine the relevant stores to create a derived store for filtered products
export const $filteredProducts = combine(
  $products,
  $searchQuery,
  $selectedCategory,
  $displayCount,
  (products, searchQuery, selectedCategory, displayCount) => {
    // Apply filtering logic based on search query, selected category, and display count
    // Modify this logic according to your requirements

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
  }
);

// Fetch products and categories when component mounts
export const initialize = createEvent<void>();
initialize.watch(() => {
  fetchProducts();
  fetchCategories();
});

// Initialize the stores when the initialize event occurs
$searchQuery.reset(initialize);
$selectedCategory.reset(initialize);
$displayCount.reset(initialize);
$products.reset(initialize);
$categories.reset(initialize);
