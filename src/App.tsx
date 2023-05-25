import "./scss/app.scss";

import React, { Suspense } from "react";
import Home from "./pages/Home";
import { Routes, Route } from 'react-router-dom'
import MainLayout from "./layouts/MainLayout";

// юзаем динамический импорт + прикручиваем lazy загрузку
// chunk дает название по дэфолту, но мы можем дать свое с помощью webpackChunkName.
const Basket = React.lazy(() => import(/*webpackChunkName: "Basket"*/'./pages/Basket'))
const NotFound = React.lazy(() => import(/*webpackChunkName: "NotFound"*/'./pages/NotFound'))
const FullPizza = React.lazy(() => import(/*webpackChunkName: "FullPizza"*/'./pages/FullPizza'))

// React.lazy не умеет рендерить компонент на стороне сервера.
// для этого юзается библиотеки react-loadable или loadable-components. 

function App() {

  // разбили роуты на отдельные файлы.
  // теперь только когда мы перейдем на определенный роут, только тогда 
  // будет грузиться его контент
  // (это влияет на User eXperience, на результат поиска нашего сайта и делаем меньше вес нашего bundle-а)

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="basket"
          element={
            // fallback указываем, что отображать, пока идет загрузка.
            <Suspense fallback={<div>Идет загрузка корзины...</div>}>
              <Basket />
            </Suspense >}
        />
        <Route path="pizza/:id"
          element={
            <Suspense fallback={<div>Идет загрузка...</div>}>
              <FullPizza />
            </Suspense >}
        />
        <Route path="*"
          element={
            <Suspense fallback={<div>Идет загрузка...</div>}>
              <NotFound />
            </Suspense >
          }
        />
      </Route>
    </Routes>
  );
}

export default App;


