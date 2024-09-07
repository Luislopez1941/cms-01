import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom';
import Administrator from '../../components/sections/Administrator/Administrator';
import Categories from '../../components/sections/categories/Categories';
import Products from '../../components/sections/products/Products';
import { PrivateRoutes } from '../../models/routes';
import Header from '../../components/header/Header';
import './RootPage.css'

const RootPage: React.FC = () => {
  return (
    <div className='root-page'>
      <Sidebar />
      <div className='container'>
        <Header />
        <main className='main'>
          <Routes>
            <Route path={`/${PrivateRoutes.ADMINISTRATOR}`} element={<Administrator />} />
            <Route path={`/${PrivateRoutes.CATEGORIES}`} element={<Categories />} />
            <Route path={`/${PrivateRoutes.PRODUCTS}`} element={<Products />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default RootPage
