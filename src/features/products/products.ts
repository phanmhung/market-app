// products.ts

import { createEffect, createStore } from 'effector';

// Define the API endpoints
const API_BASE_URL = 'https://dummyjson.com/products';

const fetchProductsApi = async (limit: number, skip: number, select: string) => {
  const url = new URL(API_BASE_URL);
  url.searchParams.append('limit', limit.toString());
  url.searchParams.append('skip', skip.toString());
  url.searchParams.append('select', select);

  const response = await fetch(url.toString());
  const data = await response.json();
  return data;
};

const searchProductsApi = async (query: string) => {
  const url = new URL(`${API_BASE_URL}/search`);
  url.searchParams.append('q', query);

  const response = await fetch(url.toString());
  const data = await response.json();
  return data;
};

const fetchCategoriesApi = async () => {
  const url = new URL(`${API_BASE_URL}/categories`);

  const response = await fetch(url.toString());
  const data = await response.json();
  return data;
};

// Create the effects
export const fetchProductsFx = createEffect<{ limit: number; skip: number; select: string }, Product[]>();
export const searchProductsFx = createEffect<string, Product[]>();
export const fetchCategoriesFx = createEffect<void, Category[]>();

// Define the stores
export const productsStore = createStore<Product[]>([]);
export const categoriesStore = createStore<Category[]>([]);

// Connect effects to API calls
fetchProductsFx.use(async ({ limit, skip, select }) => {
  const products = await fetchProductsApi(limit, skip, select);
  return products;
});

searchProductsFx.use(async (query) => {
  const products = await searchProductsApi(query);
  return products;
});

fetchCategoriesFx.use(async () => {
  const categories = await fetchCategoriesApi();
  return categories;
});

// Update the stores with fetched data
productsStore.on(fetchProductsFx.doneData, (_, products) => products);
categoriesStore.on(fetchCategoriesFx.doneData, (_, categories) => categories);

// Export the necessary entities
export default {
  effects: {
    fetchProductsFx,
    searchProductsFx,
    fetchCategoriesFx,
  },
  stores: {
    productsStore,
    categoriesStore,
  },
};
