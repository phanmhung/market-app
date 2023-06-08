import { createEvent, createStore } from 'effector';

export const ToggleDarkMode = createEvent<void>();
export const $darkMode = createStore<boolean>(false)
  .on(ToggleDarkMode, (state) => !state);