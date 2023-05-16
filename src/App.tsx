import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './scss/app.scss';
import NotFound from './pages/NotFound';
import MainLayout from './components/MainLayout';

const Cart = React.lazy(() => import('./pages/Cart'));
const FullPizza = React.lazy(() => import('./pages/FullPizza'));



function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="pizza/:pizzaId" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
