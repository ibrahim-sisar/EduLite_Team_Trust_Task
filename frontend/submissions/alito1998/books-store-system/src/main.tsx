import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import MainLayout from "./layouts/MainLayout.tsx";

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <MainLayout />
    </StrictMode>
  </Provider>
)
