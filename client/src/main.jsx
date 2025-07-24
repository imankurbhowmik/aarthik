import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import {App} from './App.jsx'
import { rehydrate } from './store/authSlice.js'

const token = localStorage.getItem("token");
let userData = null;
try {
  const raw = localStorage.getItem("userData");
  if (raw && raw !== "undefined") {
    userData = JSON.parse(raw);
  }
} catch (err) {
  localStorage.removeItem("userData");
}


store.dispatch(rehydrate({ token, userData }));



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={App}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
)
